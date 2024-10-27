import React from "react";

function Navbar(props) {
  return (
    <div className="w-[100%]">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto justify-between flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img className="w-20 h-20 rounded-full" src={props.image} alt="" />
            <span className="ml-3 text-3xl">{props.title}</span>
          </a>

          <button
            onClick={props.click}
            className="bg-blue-600  text-white text-2xl rounded-full px-8 py-2"
          >
            Log Out
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
