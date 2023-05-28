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
import Description from "./description";
import { Tab } from "@headlessui/react";
import Feedback from "./feedback";
import { useAuth } from "../../Contexts/authContext";

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
  const auth = useAuth();
  // const [data, setData] = useState();
  const [code, setCode] = useState();
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("oceanic-next");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [loading, setLoading] = useState(true);
  const [exercise, setExercise] = useState(false);
  const [caseIndex, setCaseIndex] = useState(0);
  const [submissions, setSubmissions] = useState([]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  let [categories] = useState({
    Output: "output",
    Feedback: "feedback",
    Testcase: "testcases",
  });

  useEffect(() => {
    if (enterPress && ctrlPress && !processing) {
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

  const handleCompile = (type, case_index = -1) => {
    setProcessing(true);

    const formData =
      type === "run"
        ? {
            exercise_id: exercise?.exercise_id, // Future set dynamically to the assigment
            student_id:
              auth.authStatus === "signedIn" ? auth.attrInfo[3].Value : "guest", // Same as exercise id
            // language_id: language.id, // Future set dynamically to the assigment
            feedback: { type: "basic" },
            source_code: Buffer.from(code).toString("base64"),
            // stdin: Buffer.from(customInput).toString("base64"), // Future allow user to set custom input
          }
        : outputDetails;

    if (type === "feedback") {
      if (case_index === -1) formData.feedback.type = "general";
      else {
        formData.feedback.type = "case";
        formData.feedback.case = case_index;
      }
    }

    formData.submission_type = type;

    const options = {
      method: "POST",
      url: apiUrl + "/submission",
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
        console.log("error", error);
        console.log("status", status);
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
      if (status === undefined || status === "processing") {
        // still processing
        setTimeout(() => {
          checkStatus(submissionId);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data?.submission?.Item);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      setProcessing(false);
      showErrorToast();
    }
  };

  const updateCurrentSubmission = (submissionIndex) => {
    // Change code to the submission code
    setCode(
      Buffer.from(submissions[submissionIndex].source_code, "base64").toString(
        "utf-8"
      )
    );

    // change output details to the submission output details
    setOutputDetails(submissions[submissionIndex]);
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

  useEffect(() => {
    if (outputDetails && submissions.indexOf(outputDetails) == -1)
      setSubmissions((submissions) => [outputDetails, ...submissions]);
  }, [outputDetails]);

  useEffect(() => {
    const getSubmissions = async () => {
      try {
        let path =
          auth.authStatus === "signedIn"
            ? "/submissions/" + auth?.attrInfo[3]?.Value + "/" + id
            : "/submission/all/" + id ;
        const response = await axios.get(apiUrl + path);
        // Loop through submission and sort them by date
        let sortedSub = response.data.submissions.sort(
          (a, b) => new Date(b.date_time) - new Date(a.date_time)
        );

        setSubmissions(sortedSub);
      } catch (err) {
        setSubmissions(null);
      }
    };
    getSubmissions();
  }, [auth.authStatus]);

  return (
    <div className="flex flex-grow w-full px-1 overflow-y-hidden">
      <div className="flex flex-col w-1/4 h-full px-2">
        <Description
          exercise={exercise}
          submissions={submissions}
          updateCurrentSubmission={updateCurrentSubmission}
        />
      </div>
      <div className="flex flex-col w-3/4 pr-2">
        <div className="h-3/5">
          <CodeEditor
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme?.value}
          />
        </div>

        <div className="flex flex-col h-2/5">
          <Tab.Group>
            <div className="flex flex-row mt-2">
              <Tab.List className="flex w-1/2 h-10 p-1 mr-1 space-x-1 rounded-xl bg-blue-900/20">
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-1.5 text-sm font-medium leading-5 text-blue-700",
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
              <div className="w-1/2 ml-1">
                <button
                  onClick={() => handleCompile("run")}
                  disabled={!code}
                  className={classnames(
                    "flex-shrink-0 rounded-md border-2 border-blue-200 bg-blue-50 px-4 py-2 transition hover:bg-blue-100",
                    "mr-2 font-medium text-blue-700 duration-200 hover:shadow",
                    !code ? "cursor-not-allowed opacity-50" : ""
                  )}
                  id="run"
                >
                  {processing ? "Processing" : "Run"}
                </button>
                <button
                  onClick={() => handleCompile("feedback")}
                  disabled={
                    !outputDetails ||
                    outputDetails?.compiled_status === "error" ||
                    auth.authStatus !== "signedIn"
                  }
                  className={classnames(
                    "flex-shrink-0 rounded-md border-2 border-blue-200 bg-blue-50 px-4 py-2 transition hover:bg-blue-100",
                    "font-medium text-blue-700 duration-200 hover:shadow",
                    !outputDetails ||
                      outputDetails?.compiled_status === "error" ||
                      auth.authStatus !== "signedIn"
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  )}
                >
                  {processing ? "Processing" : "General Feedback"}
                </button>
              </div>
            </div>

            <Tab.Panels className="h-full p-1 mt-2 space-x-1 overflow-y-auto rounded-xl bg-blue-800/10">
              <Tab.Panel>
                <OutputWindow
                  outputDetails={outputDetails}
                  testCases={exercise?.test_cases}
                  handleCompile={handleCompile}
                  processing={processing}
                />
              </Tab.Panel>
              <Tab.Panel>
                <Feedback submissions={submissions}></Feedback>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex flex-row mt-4 ml-2 gap-x-4">
                  {exercise &&
                    exercise?.test_cases.map((expected_result, index) => (
                      <button
                        className="flex-shrink-0 px-3 py-1 font-medium text-blue-700 transition duration-200 bg-blue-200 rounded-md hover:bg-blue-100 "
                        onClick={() => setCaseIndex(index)}
                      >
                        Case {index + 1}
                      </button>
                    ))}
                </div>

                {exercise && (
                  <div className="mx-2 mt-3 rounded-md bg-[#2a4555e1] text-sm font-normal text-white">
                    <pre className="px-2 py-1 text-sm font-normal text-white ">
                      {exercise &&
                        Buffer.from(
                          exercise?.test_cases[caseIndex].expected_result,
                          "base64"
                        ).toString("utf-8")}
                    </pre>
                  </div>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
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
