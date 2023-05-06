import React, { Component } from "react";
import monkey from "../Assets/monkey.gif";

const Wip = () => {
  return (
    <div className="flex flex-col  h-full w-full">
        <div className="flex-grow"></div>
      <h1 className=" text-3xl text-center mb-4 font-normal text-gray-700 underline decoration-orange-300 ">Work In Progress</h1>
      <div className="overflow-hidden px-5">
        <img
          src={monkey}
          className="rounded-lg mb-4 border shadow-lg m-auto"
          alt="Monkey typing on typewriter"
          loading="lazy"
        />
      </div>
      <p className=" mb-4 text-center italic">
        Credit to Amanda Cassingham-Bardwell{" "}
        <a href="https://dribbble.com/shots/4055310-Monkey-on-Typewriter">
          @dribbble
        </a>
      </p>
       <div className="flex-grow"></div>
    </div>
  );
};

export default Wip;
