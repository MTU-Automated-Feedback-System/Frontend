import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

import NewEditor from "./editor";
import Examples from "./examples";
import Requirements from "./requirements";
import TestCases from "./testCases";

const NewExercise = ({
  title,
  setTitle,
  description,
  setDescription,
  examples,
  setExamples,
  exampleIndex,
  setExampleIndex,
  requirements,
  setRequirements,
  requirementsIndex,
  setRequirementsIndex,
  currExample,
  setCurrentExample,
  mainName,
  setMainName,
  code,
  setCode,
  testCases,
  setTestCases,
  testCaseIndex,
  setTestCaseIndex,
  selectedIndex,
  setSelectedIndex,
}) => {
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

        <hr className="exercise-sep" />

        <Examples
          examples={examples}
          setExamples={setExamples}
          exampleIndex={exampleIndex}
          setExampleIndex={setExampleIndex}
          currExample={currExample}
          setCurrentExample={setCurrentExample}
        />

        <hr className="exercise-sep" />
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

        <hr className="exercise-sep" />

        <Requirements
          requirements={requirements}
          setRequirements={setRequirements}
          requirementsIndex={requirementsIndex}
          setRequirementsIndex={setRequirementsIndex}
        />

        <hr className="exercise-sep" />

        <TestCases
          testCases={testCases}
          setTestCases={setTestCases}
          testCaseIndex={testCaseIndex}
          setTestCaseIndex={setTestCaseIndex}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />

        <hr className="exercise-sep" />

        <div className="group relative z-0 mb-4 mt-3 w-full">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
            placeholder=" "
          />
          <label
            for="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
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
