import React, {
  useEffect,
  useState,
  useMemo,
  useReducer,
  Fragment,
} from "react";
import { columnsExercise } from "./tableModels";
import Table from "./table";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

const apiUrl = process.env.REACT_APP_API_URL_TEST;

const Dashboard = () => {
  const rerender = useReducer(() => ({}), {})[1];
  const [data, setData] = useState(false);
  const columns = useMemo(() => columnsExercise, []);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const getData = async () => {
    try {
      const response = await axios.get(apiUrl + "/exercise/all");
      setData(response.data.exercises);
    } catch (err) {
      console.log("error geting exercises" + err);
      setData(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex h-full w-full px-1">
        {data && <Table columns={columns} data={data} />}
      </div>
      <button
        type="button"
        onClick={openModal}
        className="ml-3 mr-2 inline-flex w-fit rounded-md border-2 border-blue-200 bg-blue-50 px-4 py-2 font-medium text-blue-700 transition duration-200 hover:bg-blue-100 hover:shadow"
      >
        New Exercise
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    New Exercise
                  </Dialog.Title>
                  <form className="overflow-auto">
                    <div class="group relative z-0 mb-6 w-full">
                      <input
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        placeholder=" "
                        required
                      />
                      <label
                        for="floating_email"
                        class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                      >
                        Title
                      </label>
                    </div>
                    <div class="group relative z-0 mb-6 w-full">
                      <input
                        type="password"
                        name="floating_password"
                        id="floating_password"
                        class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        placeholder=" "
                        required
                      />
                      <label
                        for="floating_password"
                        class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                      >
                        Short Description
                      </label>
                    </div>
                    <div class="group relative z-0 mb-6 w-full">
                      <input
                        type="password"
                        name="repeat_password"
                        id="floating_repeat_password"
                        class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        placeholder=" "
                        required
                      />
                      <label
                        for="floating_repeat_password"
                        class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                      >
                        Allowed functions
                      </label>
                    </div>

                    <div class="relative mb-3" data-te-input-wrapper-init>
                      <textarea
                        className="peer-focus:text-primary peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlTextarea1"
                        rows="4"
                        placeholder="Your message"
                      ></textarea>
                      <label
                        for="exampleFormControlTextarea1"
                        className="peer-focus:text-primary  pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                      >
                        Full description
                      </label>
                    </div>
                    <button
                      type="submit"
                      class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                    >
                      Next options
                    </button>
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

export default Dashboard;
