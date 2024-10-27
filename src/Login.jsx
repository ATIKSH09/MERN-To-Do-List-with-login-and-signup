import React from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    username: "",
    password: "",
  });

  //   important funcitons starts here

  const gotoRegister = () => {
    navigate("/register");
  };

  const resetForm = () => {
    setuser({
      username: "",
      password: "",
    });
  };

  const userLogin = async () => {
    if (user.username != "" && user.password != "") {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.status == 200) {
        localStorage.setItem("isLogin", true);
        localStorage.setItem("username", user.username);
        navigate("/");
      } else if (response.status == 404) {
        alert("user not found please register");
        navigate("/register");
      } else if (response.status == 420) {
        alert("invalid password");
      }
    } else {
      alert("please fill all the fields");
    }
  };

  //   important funcitons ends here
  return (
    <div className="flex flex-col text-xl justify-center items-center text-black h-[100svh] w-[100swh]">
      <div className="flex flex-col justify-center items-center gap-4 ">
        <input
          className="border pl-4  border-black rounded-full"
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => setuser({ ...user, username: e.target.value })}
        />
        <input
          className="border pl-4  border-black rounded-full"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
        />
        <button
          onClick={userLogin}
          className="hover:bg-gray-400 px-8 duration-200 text-4xl hover:text-white py-2 rounded-full"
        >
          Login
        </button>
      </div>

      <div>
        <button
          onClick={gotoRegister}
          className="underline hover:text-blue-800"
        >
          dont have an account, register here
        </button>
      </div>
    </div>
  );
}

export default Login;
