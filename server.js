import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Person from "./models/person.js";

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/Peoples-List");

app.post("/register", async (req, res) => {
  try {
    const alreadyUser = await Person.findOne({ username: req.body.username });
    if (alreadyUser) {
      res.status(409).send("user already exists");
    } else {
      const newPerson = new Person(req.body);
      newPerson.save();
      res.status(200).send("user registered successfully");
    }
  } catch (error) {
    res.send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await Person.findOne({ username: req.body.username });

    if (user) {
      if (user.password == req.body.password) {
        res.status(200).send("user logged in successfully");
      } else {
        res.status(420).send("invalid password");
      }
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.send(error);
  }
});

app.post("/addTask", async (req, res) => {
  try {
    const user = await Person.findOne({ username: req.body.username });
    if (user) {
      user.Tasks.push(req.body.task);
      await user.save();
      res.status(200).send("task added successfully");
    }
  } catch (error) {
    res.send("server error");
  }
});

app.post("/getTasks", async (req, res) => {
  try {
    const user = await Person.findOne({ username: req.body.username });
    res.send(user.Tasks);
  } catch (error) {
    res.send("server error");
  }
});

app.post("/deleteTask", async (req, res) => {
  try {
    const user = await Person.findOne({ username: req.body.username });
    if (user) {
      user.Tasks = user.Tasks.filter((task) => task != req.body.task);
      await user.save();
      res.status(200).send("successful");
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.send("server error");
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
