import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";

export function SignIn({ closeModal }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const executeSignIn = async () => {
    try {
      await auth.signInWithEmail(username, password);
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  };

  const executeSignUp = async () => {
    try {
      await auth.signUpWithEmail(username, "", password);
    } catch (error) {
      closeModal();
      alert(error.message);
    }
  };

  return (
    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
      <div className="pt-6">
        <label
          for="email"
          className="mb-2 block text-sm font-medium text-gray-900 "
        >
          Your email
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm "
          placeholder="your email address"
          required=""
        />
      </div>
      <div>
        <label
          for="password"
          className="mb-2 block text-sm font-medium text-gray-900 "
        >
          Your password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          placeholder="••••••••"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500  sm:text-sm"
          required=""
        />
      </div>
      {/* <div className="flex justify-between">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300  "
              required=""
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              for="remember"
              className="font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-blue-700 hover:underline "
        >
          Lost Password?
        </a>
      </div> */}
      <button
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={executeSignIn}
      >
        Login to your account
      </button>
      <button
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={executeSignUp}
      >
        Sign Up
      </button>
      {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?{" "}
                      <Link
                        href="#"
                        className="text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Create account
                      </Link>
                    </div> */}
    </div>
  );
}
