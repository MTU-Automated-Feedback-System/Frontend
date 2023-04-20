import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { classnames } from "../../Utils/general";
import { languageOptions } from "../../Constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { defineTheme } from "../../Lib/defineTheme";
import CodeEditor from "./codeEditor";
import useKeyPress from "../../Hooks/useKeyPress";
import OutputWindow from "./outputWindow";
import CustomInput from "./customInput";
import OutputDetails from "./outputDetails";
import Description from "./description";
import { Tab } from "@headlessui/react";

const apiUrl = process.env.REACT_APP_API_URL_TEST;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const showSuccessToast = (msg) => {
  toast.success(msg || `Compiled Successfully!`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const showErrorToast = (msg, timer) => {
  toast.error(msg || `Something went wrong! Please try again.`, {
    position: "top-right",
    autoClose: timer ? timer : 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const Exercise = () => {
  const { id } = useParams();
  // const [data, setData] = useState();
  const [code, setCode] = useState();
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [loading, setLoading] = useState(true);
  const [exercise, setExercise] = useState(false);

  const [submissions, setSubmissions] = useState();
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  let [categories] = useState({
    Output: "output",
    Feedback: "feedback",
    Testcase: "testcases",
  });

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      exercise_id: exercise?.exercise_id, // Future set dynamically to the assigment
      student_id: "guest", // Same as exercise id
      language_id: language.id,
      // encode source code in base64
      source_code: Buffer.from(code).toString("base64"),
      stdin: Buffer.from(customInput).toString("base64"),
    };
    const options = {
      method: "POST",
      url: apiUrl + "/submission",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };
    axios
      .request(options)
      .then(function (response) {
        const id = response.data.id;
        checkStatus(id);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        if (status === 429) {
          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
      });
  };

  const checkStatus = async (submissionId) => {
    const options = {
      method: "GET",
      url: apiUrl + "/submission/i/",
      params: {
        submission_id: submissionId,
        exercise_id: id, // Future set dynamically to the assigment
      },
    };
    try {
      let response = await axios.request(options);
      let status = response.data.submission?.Item?.compiled_status;
      // Processed - we have a result
      if (status === "processing") {
        // still processing
        setTimeout(() => {
          checkStatus(id);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      setProcessing(false);
      showErrorToast();
    }
  };

  useEffect(() => {
    const getExercise = async () => {
      try {
        const response = await axios.get(apiUrl + "/exercise/" + id);
        setExercise(response.data[0]);
        const defaultCode = Buffer.from(
          response.data[0].default_code,
          "base64"
        ).toString("utf-8");
        onChange("code", defaultCode);

        setLoading(false);
      } catch (err) {
        setExercise(null);
      }
    };
    getExercise();
  }, []);

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  return (
    <div className="flex w-full flex-grow overflow-y-hidden px-1">
      <div className="flex h-full w-1/4 flex-col px-2">
        <Description exercise={exercise} submissions={submissions} />
      </div>
      <div className="flex w-3/4 flex-col pr-2">
        <div className="h-3/5">
          <CodeEditor
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme?.value}
          />
        </div>

        <div className="flex h-2/5 flex-col">
          <Tab.Group>
            <div className="flex flex-row mt-2">
              <Tab.List className="flex w-1/2 h-10 space-x-1 rounded-xl bg-blue-900/20 p-1 mr-1">
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-1.5 text-sm font-medium leading-5 text-blue-700",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <div className="w-1/2 ml-1">
                <button
                  onClick={handleCompile}
                  disabled={!code}
                  className={classnames(
                    "flex-shrink-0 rounded-md border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 px-4 py-2 transition",
                    "duration-200 hover:shadow font-medium text-blue-700 mr-2",
                    !code ? "opacity-50" : ""
                  )}
                >
                  {processing ? "Processing" : "Run"}
                </button>
                <button
                  onClick={handleCompile}
                  disabled={!code}
                  className={classnames(
                    "flex-shrink-0 rounded-md border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 px-4 py-2 transition",
                    "duration-200 hover:shadow font-medium text-blue-700",
                    !code ? "opacity-50" : ""
                  )}
                >
                  {processing ? "Processing..." : "Feedback"}
                </button>
              </div>
            </div>

            <Tab.Panels className="mt-2 h-full space-x-1 rounded-xl bg-blue-800/10 p-1 overflow-y-auto">
              <Tab.Panel>
                <OutputWindow outputDetails={outputDetails} />
              </Tab.Panel>
              <Tab.Panel></Tab.Panel>
              <Tab.Panel></Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* <div className="">
            <h1 className="mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-bold text-transparent">
              Input
            </h1>
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "z-10 mt-4 flex-shrink-0 rounded-md border-2 border-black bg-white px-4 py-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition duration-200 hover:shadow",
                !code ? "opacity-50" : ""
              )}
            >
              
            </button>
            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </div> */}
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};
export default Exercise;
