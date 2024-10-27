import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Tasks: {
    type: Array,
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
