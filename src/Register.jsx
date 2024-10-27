import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const goto = useNavigate();
  const [newUser, setnewUser] = useState({
    username: "",
    password: "",
  });

  //   important functions starts here

  const gotoLogin = () => {
    goto("/");
  };

  const resetForm = () => {
    setnewUser({
      username: "",
      password: "",
    });
  };

  const registerNewUser = async () => {
    if (newUser.username != "" && newUser.password != "") {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      resetForm();
      if (response.status == 200) {
        alert("successfully registered, please login");
        goto("/");
      } else if (response.status == 409) {
        alert("username already taken");
      }
    } else {
      alert("please fill all the fields");
    }
  };

  //   important functions ends here
  return (
    <div className="flex flex-col text-xl justify-center items-center text-black h-[100svh] w-[100swh]">
      <div className="flex flex-col justify-center items-center gap-4 ">
        <input
          className="border pl-4  border-black rounded-full"
          type="text"
          placeholder="username"
          value={newUser.username}
          onChange={(e) => setnewUser({ ...newUser, username: e.target.value })}
        />
        <input
          className="border pl-4  border-black rounded-full"
          type="password"
          placeholder="password"
          value={newUser.password}
          onChange={(e) => setnewUser({ ...newUser, password: e.target.value })}
        />
        <button
          onClick={registerNewUser}
          className="hover:bg-gray-400 px-8 duration-200 text-4xl hover:text-white py-2 rounded-full"
        >
          Register
        </button>
      </div>

      <div>
        <button onClick={gotoLogin} className="underline hover:text-blue-800">
          already have an account, login here
        </button>
      </div>
    </div>
  );
}

export default Register;
