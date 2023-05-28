import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import chess from "../Assets/chess.png";
import { Dialog, Transition } from "@headlessui/react";
import { SignIn } from "../Components/SignIn/SignIn";
import { useAuth } from "../Contexts/authContext";

const Nav = () => {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <nav className="relative flex flex-row items-center w-full p-2 text-gray-600 h-15 z-nav-1 shrink-0">
        <Link
          className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
          to={"/"}
          rel="noopener noreferrer"
        >
          <img
            src={chess}
            className="w-10 h-10 rounded-md"
            alt="A chess piece."
          />
          <span className="ml-3 text-xl">AFS</span>
        </Link>
        <div className="flex flex-wrap items-center justify-center text-base font-medium md:mr-auto md:ml-4 md:border-l md:border-gray-400 md:py-1 md:pl-4">
          <NavLink className="mr-5 hover:text-gray-900" to="exercise">
            Exercises
          </NavLink>
          <NavLink
            className="mr-5 hover:text-gray-900"
            to="submissions"
            rel="noopener noreferrer"
            oncClick={() => console.log("clicked")}
          >
            Submissions
          </NavLink>
        </div>
        <button
          type="button"
          id="sign-in-button"
          onClick={
            auth.authStatus === "signedIn"
              ? () => auth.signOut()
              : auth.authStatus === "loading"
              ? ""
              : openModal
          }
          className="inline-flex items-center px-3 py-1 mt-4 text-base font-medium bg-gray-100 border-0 rounded-lg hover:bg-gray-200 focus:outline-none md:mt-0"
        >
          {auth.authStatus === "signedIn"
            ? "Sign Out"
            : auth.authStatus === "loading"
            ? "Loading"
            : "Sign in"}
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </nav>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pl-7"
                  >
                    Sign in on AFS
                  </Dialog.Title>

                  <SignIn closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Nav;
