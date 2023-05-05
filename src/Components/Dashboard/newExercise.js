import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import NewEditor from "./editor";

const NewExercise = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [cases, setCases] = useState([{ title: "", content: "" }]);
  const [caseIndex, setCaseIndex] = useState(0);
  const [currExample, setCurrentExample] = useState({ title: "", content: "" });

  const addCase = () => {
    const newCases = [...cases];
    newCases[caseIndex].title = currExample.title;
    newCases[caseIndex].content = currExample.content;
    setCases([...cases, { title: "", content: "" }]);
    setCurrentExample({ title: "", content: "" });
    setCaseIndex(cases.length);
  };

  const changeIndex = (index) => {
    const newCases = [...cases];
    newCases[caseIndex].title = currExample.title;
    newCases[caseIndex].content = currExample.content;
    setCases(newCases);
    setCaseIndex(index);
    setCurrentExample(cases[index]);
  };

  const deleteCase = (index) => {
    const newCases = [...cases];
    newCases.splice(index, 1);

    if (index === caseIndex) {
      setCurrentExample(cases[caseIndex + 1]);

      if (index === cases.length - 1) setCaseIndex(index - 1);
    }

    setCases(newCases);
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
          <div className="mb-1 pl-1 text-base font-medium">Description</div>
          <NewEditor
            editorValue={description}
            editorSetValue={setDescription}
          />
        </div>

        <div className="group relative z-0 mb-6 w-full">
          <div className="mb-1 pl-1 text-base font-medium">
            Examples{" "}
            <span className="text-blue-700 ">&darr; {caseIndex + 1} </span>
          </div>

          <div className="mt-2 flex flex-row">
            <button
              className="mb-2 mr-2 flex-shrink-0 rounded-md bg-green-200 px-2 py-1
              font-semibold text-green-700 transition duration-200 hover:bg-green-100"
              onClick={() => addCase()}
            >
              +
            </button>
            <div>
              {cases.map((expected_result, index) => (
                <>
                  <button
                    className="mb-2 flex-shrink-0 rounded-l-md bg-blue-200 px-2 py-1 font-medium
              text-blue-700 transition duration-200 hover:bg-blue-100"
                    onClick={() => changeIndex(index)}
                  >
                    Example {index + 1}
                  </button>
                  <button
                    className={
                      "mb-2 mr-2 flex-shrink-0 rounded-r-md bg-orange-200 px-2 py-1 font-medium text-orange-700 transition duration-200 hover:bg-orange-100 " +
                      (cases.length === 1
                        ? "cursor-not-allowed opacity-50"
                        : "")
                    }
                    onClick={() => deleteCase(index)}
                    disabled={cases.length === 1}
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
              Example {caseIndex + 1} Name
            </label>
          </div>
          <NewEditor
            editorValue={currExample.content}
            editorSetValue={updateExample}
          />
        </div>
      </div>
    </>
  );
};

export default NewExercise;
