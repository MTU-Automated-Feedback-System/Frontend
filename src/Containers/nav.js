import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import chess from "../Assets/chess.png";
import { Dialog, Transition } from "@headlessui/react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <nav className="h-15 z-nav-1 relative flex w-full shrink-0 flex-row items-center p-3 text-gray-600">
        <Link
          className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
          to={"/"}
          rel="noopener noreferrer"
        >
          <img
            src={chess}
            className="h-10 w-10 rounded-md"
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
          >
            Submissions
          </NavLink>
        </div>
        <button
          type="button"
          onClick={openModal}
          className="mt-4 inline-flex items-center rounded-lg border-0 bg-gray-100 py-1 px-3 text-base font-medium hover:bg-gray-200 focus:outline-none md:mt-0"
        >
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="pl-7 text-lg font-medium leading-6 text-gray-900"
                  >
                    Sign in on AFS
                  </Dialog.Title>

                  <form
                    class="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
                    action="#"
                  >
                    <div className="pt-6">
                      <label
                        for="email"
                        class="mb-2 block text-sm font-medium text-gray-900 "
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="mb-2 block text-sm font-medium text-gray-900 "
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500  sm:text-sm"
                        required=""
                      />
                    </div>
                    <div class="flex justify-between">
                      <div class="flex items-start">
                        <div class="flex h-5 items-center">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300  "
                            required=""
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label
                            for="remember"
                            class="font-medium text-gray-900 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        class="text-sm text-blue-700 hover:underline "
                      >
                        Lost Password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Login to your account
                    </button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?{" "}
                      <a
                        href="#"
                        class="text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Create account
                      </a>
                    </div>
                  </form>
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
