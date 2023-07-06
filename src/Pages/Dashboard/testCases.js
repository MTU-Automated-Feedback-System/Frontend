import { Tab } from "@headlessui/react";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TestCases = ({
  testCases,
  setTestCases,
  testCaseIndex,
  setTestCaseIndex,
  selectedIndex,
  setSelectedIndex,
}) => {
  let [categories] = useState({
    stdout: "stdout",
    result: "result",
  });
  const addTestCase = () => {
    setTestCases([
      ...testCases,
      {
        expected_result: "",
        threshold: 75,
        input: "",
        type: testCases[testCaseIndex].type,
      },
    ]);
    setTestCaseIndex(testCases.length);
  };

  const deleteTestCase = (index) => {
    const newTestCases = [...testCases];
    newTestCases.splice(index, 1);

    if (index === testCaseIndex) {
      if (index === testCases.length - 1) {
        setTestCaseIndex(index - 1);
      }
    }

    if (index !== testCaseIndex) {
      if (testCaseIndex === testCases.length - 1) {
        setTestCaseIndex(testCaseIndex - 1);
      }
    }
    setTestCases(newTestCases);
  };

  return (
    <div className="relative z-0 w-full mb-6 group">
      <div className="pl-1 mb-1 text-base font-medium text-gray-800">
        Test Cases{" "}
        <span className="text-blue-700 ">&darr; {testCaseIndex + 1} </span>
      </div>

      <div className="flex flex-row mt-2">
        <button
          className="flex-shrink-0 px-2 py-1 mb-2 mr-2 font-semibold text-green-700 transition duration-200 bg-green-200 rounded-md hover:bg-green-100"
          onClick={() => addTestCase()}
        >
          +
        </button>
        <div>
          {testCases.map((e, index) => (
            <>
              <button
                className={
                  "mb-2 flex-shrink-0 rounded-l-md px-2 py-1 font-medium text-blue-700 transition duration-200 hover:bg-blue-100" +
                  (index === testCaseIndex ? " bg-blue-100" : " bg-blue-200")
                }
                onClick={() => setTestCaseIndex(index)}
              >
                Case {index + 1}
              </button>
              <button
                className={
                  "mb-2 mr-2 flex-shrink-0 rounded-r-md bg-orange-200 px-2 py-1 font-medium text-orange-700 transition duration-200 hover:bg-orange-100 " +
                  (testCases.length === 1
                    ? "cursor-not-allowed opacity-50 "
                    : "")
                }
                disabled={testCases.length === 1}
                onClick={() => deleteTestCase(index)}
              >
                X
              </button>
            </>
          ))}
        </div>
      </div>

      <Tab.Group
        selectedIndex={testCases[testCaseIndex].type === "stdout" ? 0 : 1}
        onChange={setSelectedIndex}
      >
        <Tab.List className="flex h-10 space-x-1 rounded-md bg-blue-500/20 p-1.5 ">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-blue-500"
                )
              }
              onClick={() => {
                const newTestCases = [...testCases];
                newTestCases[testCaseIndex].type = category;
                setTestCases(newTestCases);
              }}
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="h-full p-1 mt-2 space-x-1 overflow-y-auto font-medium rounded-md bg-blue-600/10">
          <div className="relative z-0 w-full px-2 mt-2 mb-3 group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
              placeholder=" "
              value={testCases[testCaseIndex].input}
              onChange={(e) => {
                const newTestCases = [...testCases];
                newTestCases[testCaseIndex].input = e.target.value;
                setTestCases(newTestCases);
              }}
            />
            <label
              for="floating_email"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600  peer-focus:dark:text-blue-500"
            >
              Input
            </label>
          </div>
          <Tab.Panel>
            <label
              for="message"
              className="block mb-2 ml-1 text-sm font-medium text-gray-600"
            >
              Expected result
            </label>
            <textarea
              id="message"
              rows="4"
              className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter your expected output from the program"
              value={testCases[testCaseIndex].expected_result}
              onChange={(e) => {
                const newTestCases = [...testCases];
                newTestCases[testCaseIndex].expected_result = e.target.value;
                setTestCases(newTestCases);
              }}
            />
          </Tab.Panel>

          <Tab.Panel>
            <div className="relative z-0 w-full px-2 mt-2 mb-3 group">
              <input
                type="text"
                name="floating_email"
                id="floating_email"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
                placeholder=" "
                value={testCases[testCaseIndex].expected_result}
                onChange={(e) => {
                  const newTestCases = [...testCases];
                  newTestCases[testCaseIndex].expected_result = e.target.value;
                  setTestCases(newTestCases);
                }}
              />
              <label
                for="floating_email"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600  peer-focus:dark:text-blue-500"
              >
                Expected result
              </label>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TestCases;
