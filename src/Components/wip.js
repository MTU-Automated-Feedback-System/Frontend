import React, { Component } from "react";
import monkey from "../Assets/monkey.gif";

const Wip = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-grow" />
      <h1 className="mb-4 text-3xl font-normal text-center text-gray-700 underline decoration-orange-300">
        Work In Progress
      </h1>
      <div className="px-5 overflow-hidden">
        <img
          src={monkey}
          className="m-auto mb-4 border rounded-lg shadow-lg"
          alt="Monkey typing on typewriter"
          loading="lazy"
        />
      </div>
      <p className="mb-4 italic text-center ">
        Credit to Amanda Cassingham-Bardwell{" "}
        <a href="https://dribbble.com/shots/4055310-Monkey-on-Typewriter">
          @dribbble
        </a>
      </p>
      <div className="flex-grow" />
    </div>
  );
};

export default Wip;
