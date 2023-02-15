import React from "react";

const Header = () => {
  return (
    <header class="body-font text-gray-600">
      <div class="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <a
          className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="h-10 w-10 rounded-full bg-indigo-500 p-2 text-white"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl">Tailblocks</span>
        </a>
        <nav class="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto">
          <a
            class="mr-5 hover:text-gray-900"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            First Link
          </a>
          <a
            class="mr-5 hover:text-gray-900"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            Second Link
          </a>
          <a
            class="mr-5 hover:text-gray-900"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            Third Link
          </a>
          <a
            class="mr-5 hover:text-gray-900"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fourth Link
          </a>
        </nav>
        <button class="mt-4 inline-flex items-center rounded border-0 bg-gray-100 py-1 px-3 text-base hover:bg-gray-200 focus:outline-none md:mt-0">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="ml-1 h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
