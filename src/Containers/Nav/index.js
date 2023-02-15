import React from "react";
import { Link, NavLink } from "react-router-dom";
import chess from "../../Assets/chess.png"


const Nav = () => {
  return (
    <header className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <Link
          className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
          to={"/"}
          rel="noopener noreferrer"
        >
          <img src={chess} className="w-10 h-10 rounded-md" alt="A chess piece."/>
          <span className="ml-3 text-xl">AFS</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base font-medium justify-center">
          <NavLink
            className="mr-5 hover:text-gray-900"
            to="assignment"
          >
            Assignment
          </NavLink>
          <NavLink
            className="mr-5 hover:text-gray-900"
            to="submissions"
            rel="noopener noreferrer"
          >
            Submissions
          </NavLink>
        </nav>
        <button className="mt-4 inline-flex items-center rounded-lg border-0 bg-gray-100 py-1 px-3 text-base font-medium hover:bg-gray-200 focus:outline-none md:mt-0">
          Sign in
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="ml-1 h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Nav;
