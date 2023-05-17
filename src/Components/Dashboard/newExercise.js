import React, { useRef, useState, useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Tab } from "@headlessui/react";

import NewEditor from "./editor";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NewExercise = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");

  const [examples, setExamples] = useState([{ title: "", content: "" }]);
  const [exampleIndex, setExampleIndex] = useState(0);

  const [requirements, setRequirements] = useState([]);
  const [requirementsIndex, setRequirementsIndex] = useState(-1);

  const [currExample, setCurrentExample] = useState({ title: "", content: "" });
  const [mainName, setMainName] = useState("");
  const [code, setCode] = React.useState(`def main_function_name():\n  ...\n`);

  const [testCases, setTestCases] = useState([
    { expected_result: "", threshold: 75, input: "", type: "stdout" },
  ]);
  const [testCaseIndex, setTestCaseIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  let [categories] = useState({
    stdout: "stdout",
    result: "result",
  });

  const addExample = () => {
    const newExamples = [...examples];
    newExamples[exampleIndex].title = currExample.title;
    newExamples[exampleIndex].content = currExample.content;
    setExamples([...examples, { title: "", content: "" }]);
    setCurrentExample({ title: "", content: "" });
    setExampleIndex(examples.length);
  };

  const addRequirement = () => {
    setRequirements([...requirements, { hint: "", name: "", occurences: [] }]);
    setRequirementsIndex(requirements.length);
  };

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { expected_result: "", threshold: 75, input: "", type: "stdout" },
    ]);
    setTestCaseIndex(testCases.length);
  };

  const deleteRequirement = (index) => {
    const newRequirements = [...requirements];
    newRequirements.splice(index, 1);

    if (index === requirementsIndex) {
      if (index === requirements.length - 1) {
        setRequirementsIndex(index - 1);
      }
    }

    if (index !== requirementsIndex) {
      if (requirementsIndex === requirements.length - 1) {
        setRequirementsIndex(requirementsIndex - 1);
      }
    }

    setRequirements(newRequirements);
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
      if (testCaseIndex === testCaseIndex.length - 1) {
        setTestCaseIndex(testCaseIndex - 1);
      }
    }
    setTestCases(newTestCases);
  };

  const changeIndex = (index) => {
    const newExamples = [...examples];
    newExamples[exampleIndex].title = currExample.title;
    newExamples[exampleIndex].content = currExample.content;
    setExamples(newExamples);
    setExampleIndex(index);
    setCurrentExample(examples[index]);
  };

  const deleteExample = (index) => {
    const newExamples = [...examples];
    newExamples.splice(index, 1);

    if (index === exampleIndex) {
      if (index === examples.length - 1) {
        setExampleIndex(index - 1);
        setCurrentExample(examples[index - 1]);
      } else setCurrentExample(examples[exampleIndex + 1]);
    }

    if (index !== exampleIndex) {
      if (exampleIndex === examples.length - 1) {
        setExampleIndex(exampleIndex - 1);
      }
    }
    setExamples(newExamples);
  };

  const updateExample = (example) => {
    setCurrentExample({
      ...currExample,
      content: example,
    });
  };

  return (
    <>
      <div className=" group relative z-0  w-full">
        <div className="group relative z-0 mb-4 mt-3 w-full">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
            placeholder=" "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            for="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Title
          </label>
        </div>

        <div className="group relative z-0 mb-6 w-full">
          <div className="mb-1 pl-1 text-base font-medium text-gray-800">
            Description
          </div>
          <NewEditor
            editorValue={description}
            editorSetValue={setDescription}
          />
        </div>

        <hr class="mx-auto my-4 h-1 w-[28rem] rounded border-0 bg-gray-300 " />

        <div className="group relative z-0 mb-6 w-full">
          <div className="mb-1 pl-1 text-base font-medium text-gray-800">
            Examples{" "}
            <span className="text-blue-700 ">&darr; {exampleIndex + 1} </span>
          </div>

          <div className="mt-2 flex flex-row">
            <button
              className="mb-2 mr-2 flex-shrink-0 rounded-md bg-green-200 px-2 py-1
              font-semibold text-green-700 transition duration-200 hover:bg-green-100"
              onClick={() => addExample()}
            >
              +
            </button>
            <div>
              {examples.map((e, index) => (
                <>
                  <button
                    className={
                      "mb-2 flex-shrink-0 rounded-l-md px-2 py-1 font-medium text-blue-700 transition duration-200 hover:bg-blue-100" +
                      (index === exampleIndex ? " bg-blue-100" : " bg-blue-200")
                    }
                    onClick={() => changeIndex(index)}
                  >
                    Example {index + 1}
                  </button>
                  <button
                    className={
                      "mb-2 mr-2 flex-shrink-0 rounded-r-md bg-orange-200 px-2 py-1 font-medium text-orange-700 transition duration-200 hover:bg-orange-100 " +
                      (examples.length === 1
                        ? "cursor-not-allowed opacity-50 "
                        : "")
                    }
                    onClick={() => deleteExample(index)}
                    disabled={examples.length === 1}
                  >
                    X
                  </button>
                </>
              ))}
            </div>
          </div>

          <div className="group relative z-0 mb-4 mt-3 w-full">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
              placeholder=" "
              value={currExample.title}
              onChange={(e) => {
                setCurrentExample({
                  ...currExample,
                  title: e.target.value,
                });
              }}
            />

            <label
              for="floating_email"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Example {exampleIndex + 1} Name
            </label>
          </div>
          <NewEditor
            editorValue={currExample.content}
            editorSetValue={updateExample}
          />
        </div>
        <hr class="mx-auto my-4 h-1 w-[28rem] rounded border-0 bg-gray-300 " />
        <div className="group relative z-0 mb-3 mt-7 w-full">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
            placeholder=" "
            value={mainName}
            onChange={(e) => setMainName(e.target.value)}
          />
          <label
            for="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Main function name
          </label>
        </div>

        <div className="group relative z-0 mb-6 w-full">
          <div className="mb-1 pl-1 text-base font-medium text-gray-800">
            Default code
          </div>
          <div className="rounded-lg border-2">
            <CodeEditor
              value={code}
              language="python"
              placeholder="Please enter the default code."
              onChange={(evn) => setCode(evn.target.value)}
              padding={12}
              data-color-mode="light"
              style={{
                fontSize: 14,
                backgroundColor: "#bfdbfe70",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
          </div>
        </div>

        <hr class="mx-auto my-4 h-1 w-[28rem] rounded border-0 bg-gray-300 " />

        <div className="group relative z-0 mb-6 w-full">
          <div className="mb-1 pl-1 text-base font-medium text-gray-800">
            Requirements{" "}
            <span className="text-blue-700 ">
              &darr; {requirementsIndex + 1}{" "}
            </span>
          </div>

          <div className="mt-2 flex flex-row">
            <button
              className="mb-2 mr-2 flex-shrink-0 rounded-md bg-green-200 px-2 py-1
              font-semibold text-green-700 transition duration-200 hover:bg-green-100"
              onClick={() => addRequirement()}
            >
              +
            </button>
            <div>
              {requirements.map((e, index) => (
                <>
                  <button
                    className={
                      "mb-2 flex-shrink-0 rounded-l-md px-2 py-1 font-medium text-blue-700 transition duration-200 hover:bg-blue-100" +
                      (index === requirementsIndex
                        ? " bg-blue-100"
                        : " bg-blue-200")
                    }
                    onClick={() => setRequirementsIndex(index)}
                  >
                    Requirement {index + 1}
                  </button>
                  <button
                    className={
                      "mb-2 mr-2 flex-shrink-0 rounded-r-md bg-orange-200 px-2 py-1 font-medium text-orange-700 transition duration-200 hover:bg-orange-100 "
                    }
                    onClick={() => deleteRequirement(index)}
                  >
                    X
                  </button>
                </>
              ))}
            </div>
          </div>

          {requirements.length > 0 && (
            <>
              <div className="group relative z-0 mb-4 mt-3 w-full">
                <input
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  value={requirements[requirementsIndex].name}
                  onChange={(e) => {
                    // set requirement title
                    const newRequirements = [...requirements];
                    newRequirements[requirementsIndex].name = e.target.value;
                    setRequirements(newRequirements);
                  }}
                />

                <label
                  for="floating_email"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Requirement {requirementsIndex + 1} Name
                </label>
              </div>

              <div className="group relative z-0 mb-4 mt-3 w-full">
                <input
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  value={requirements[requirementsIndex].hint}
                  onChange={(e) => {
                    // set requirement hint
                    const newRequirements = [...requirements];
                    newRequirements[requirementsIndex].hint = e.target.value;
                    setRequirements(newRequirements);
                  }}
                />

                <label
                  for="floating_email"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Requirement {requirementsIndex + 1} hint
                </label>
              </div>
            </>
          )}
        </div>

        <hr class="mx-auto my-4 h-1 w-[28rem] rounded border-0 bg-gray-300 " />

        <div className="group relative z-0 mb-6 w-full">
          <div className="mb-1 pl-1 text-base font-medium text-gray-800">
            Test Cases{" "}
            <span className="text-blue-700 ">&darr; {testCaseIndex + 1} </span>
          </div>

          <div className="mt-2 flex flex-row">
            <button
              className="mb-2 mr-2 flex-shrink-0 rounded-md bg-green-200 px-2 py-1
              font-semibold text-green-700 transition duration-200 hover:bg-green-100"
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
                      (index === testCaseIndex
                        ? " bg-blue-100"
                        : " bg-blue-200")
                    }
                    onClick={() => setRequirementsIndex(index)}
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
                    onClick={() => deleteRequirement(index)}
                  >
                    X
                  </button>
                </>
              ))}
            </div>
          </div>

          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
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
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2 h-full space-x-1 overflow-y-auto rounded-md bg-blue-600/10 p-1 font-medium">
              <div className="group relative z-0 mb-3 mt-2 w-full px-2">
                <input
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  class="ml-1 mb-2 block text-sm font-medium text-gray-600"
                >
                  Expected result
                </label>
                <textarea
                  id="message"
                  rows="4"
                  class="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter your expected output from the program"
                />
              </Tab.Panel>

              <Tab.Panel>
                <div className="group relative z-0 mb-3 mt-2 w-full px-2">
                  <input
                    type="text"
                    name="floating_email"
                    id="floating_email"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
                    placeholder=" "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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

        <hr class="mx-auto my-4 h-1 w-[28rem] rounded border-0 bg-gray-300 " />

        <div className="group relative z-0 mb-4 mt-3 w-full">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="peer block w-full appearance-none border-0 border-b-2 border-red-200 bg-transparent px-0 pb-1 pt-2.5 text-base text-red-300 focus:outline-none focus:ring-0  "
            placeholder=" "
            disabled={true}
          />
          <label
            for="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-red-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium "
          >
            Allowed functions
          </label>
        </div>

        <div className="group relative z-0 mb-4 mt-3 w-full">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="peer block w-full appearance-none border-0 border-b-2 border-red-200 bg-transparent px-0 pb-1 pt-2.5 text-base text-red-300 focus:outline-none focus:ring-0  "
            placeholder=" "
            disabled={true}
          />
          <label
            for="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-red-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium "
          >
            Exercise Hints
          </label>
        </div>

        <div className="group relative z-0 mb-4 mt-3 w-full">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="peer block w-full appearance-none border-0 border-b-2 border-red-200 bg-transparent px-0 pb-1 pt-2.5 text-base text-red-300 focus:outline-none focus:ring-0  "
            placeholder=" "
            disabled={true}
          />
          <label
            for="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-red-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium "
          >
            Expected Algorithms
          </label>
        </div>
      </div>
    </>
  );
};

export default NewExercise;
