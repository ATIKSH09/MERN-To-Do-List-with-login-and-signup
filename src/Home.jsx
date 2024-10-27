import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function Home() {
  // important states starts
  const [task, setTask] = useState("");
  const navigate = useNavigate();
  const [allTasks, setAllTasks] = useState([]);

  // important functions starts

  const resetInp = () => {
    setTask("");
  };

  const getTasks = async () => {
    const everyTasks = await fetch("http://localhost:3000/getTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
      }),
    });
    const data = await everyTasks.json();
    setAllTasks(data);
  };

  const handleLogOut = () => {
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

  const addTask = async () => {
    if (task != "") {
      const send = await fetch("http://localhost:3000/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task,
          username: localStorage.getItem("username"),
        }),
      });
      getTasks();
      resetInp();
    } else {
      alert("Please enter a task");
    }
  };

  const deleteTask = async (toDelete) => {
    console.log(toDelete);
    const send = await fetch("http://localhost:3000/deleteTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: toDelete,
        username: localStorage.getItem("username"),
      }),
    });
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  // important functions ends

  return (
    <div className="flex flex-col gap-20 justify-center items-center">
      <Navbar
        image="https://th.bing.com/th/id/OIP.9QEYHAU3l1x1HyOt27beLgHaHa?rs=1&pid=ImgDetMain"
        title={localStorage.getItem("username").toUpperCase()}
        click={handleLogOut}
      />

      <div className="flex flex-col gap-4 justify-center items-center w-[100%]">
        <label className="text-3xl underline" htmlFor="todoTask">
          Enter the task
        </label>
        <input
          type="text"
          id="todoTask"
          placeholder="enter  here"
          className="border pl-4 w-[70%] text-3xl border-black rounded-full"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-600  text-white text-2xl rounded-full px-8 py-2"
        >
          Add Task
        </button>
      </div>

      <div className="w-full px-12">
        <h1 className=" text-3xl underline font-mono">Pending Tasks </h1>
      </div>

      <ol className="list-decimal w-full px-16 flex flex-col gap-4">
        {allTasks.map((e) => (
          <li className="text-2xl w-full relativ  " key={Math.random()}>
            {e}
            <button
              onClick={() => {
                deleteTask(e);
              }}
              className="absolute right-[3rem] border border-black rounded-full px-4 hover:bg-gray-400 hover:border-white hover:text-white duration-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Home;
