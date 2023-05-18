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
import NewExercise from "./newExercise";
import { useAuth } from "../../Contexts/authContext";
import computer from "../../Assets/computer.gif";
import { Buffer } from "buffer";


const apiUrl = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const auth = useAuth();
  const rerender = useReducer(() => ({}), {})[1];
  const [data, setData] = useState(false);
  const columns = useMemo(() => columnsExercise, []);
  const [isOpen, setIsOpen] = useState(false);

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

  const createExample = (example) => {
    let ex = {};
    ex = { ...ex, [example.title]: example.content };
    return ex;
  };

  const formatExamples = (exa) => {
    let formattedExamples = [];
    exa.forEach((ex) =>
      formattedExamples.push(createExample(ex))
    );
    return formattedExamples;
  };

  const formatTestCases = (testCases) => {
    let formattedTestCases = [];
    testCases.forEach((testCase) => {
      formattedTestCases.push({
        expected_result:
          testCase.type === "result"
            ? Buffer.from(testCase.expected_result.trim()).toString("base64")
            : Buffer.from(testCase.expected_result).toString("base64"),
        threshold: testCase.threshold,
        input: testCase.input,
        type: testCase.type,
      });
    });
    return formattedTestCases;
  };

  const handleSubmit = () => {
    console.log(examples);
    const formData = {
      exercise_id: `${data.length + 1}`,
      description: {
        title: title,
        description: description,
        examples: formatExamples(examples),
      },
      default_code: Buffer.from(code).toString("base64"),
      expected_elements: requirements,
      main_name: mainName,
      test_cases: formatTestCases(testCases),
    };
    console.log(formData);
    const options = {
      method: "POST",
      url: apiUrl + "/exercise",
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function () {
        getData();
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        console.log("error", error);
        console.log("status", status);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data ? (
        <>
          <div className="flex h-full w-full px-1">
            {data && <Table columns={columns} data={data} />}
          </div>
          <button
            type="button"
            onClick={openModal}
            disabled={auth.authStatus !== "signedIn"}
            className={
              "ml-3 mr-2 inline-flex w-fit rounded-md border-2 border-blue-200 bg-blue-50 px-4 py-2 font-medium text-blue-700 transition duration-200 hover:bg-blue-100 hover:shadow " +
              (auth.authStatus !== "signedIn"
                ? "cursor-not-allowed opacity-50"
                : "")
            }
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
            <Dialog as="div" className=" relative z-10" onClose={() => {}}>
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
                <div className="flex min-h-full  items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-[40rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        New Exercise
                      </Dialog.Title>
                      <NewExercise
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        examples={examples}
                        setExamples={setExamples}
                        exampleIndex={exampleIndex}
                        setExampleIndex={setExampleIndex}
                        requirements={requirements}
                        setRequirements={setRequirements}
                        requirementsIndex={requirementsIndex}
                        setRequirementsIndex={setRequirementsIndex}
                        currExample={currExample}
                        setCurrentExample={setCurrentExample}
                        mainName={mainName}
                        setMainName={setMainName}
                        code={code}
                        setCode={setCode}
                        testCases={testCases}
                        setTestCases={setTestCases}
                        testCaseIndex={testCaseIndex}
                        setTestCaseIndex={setTestCaseIndex}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                      />
                      <button
                        className="mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          handleSubmit();
                          closeModal();
                        }}
                      >
                        Submit
                      </button>
                      <button
                        className="mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      ) : (
        <div className="flex h-full  w-full flex-col">
          <div className="flex-grow"></div>
          <h1 className=" mb-4 text-center text-3xl font-normal">
            <span className="text-gray-700 underline decoration-orange-300">
              Website is taking a break
            </span>{" "}
            🍵
          </h1>

          <div className="mb-4 text-center text-xl font-normal">
            Reach me at{" "}
            <span
              className="cursor-pointer font-semibold underline decoration-blue-300	"
              onClick={(e) => {
                window.location.href = "mailto:romain.clemencon@mycit.ie";
                e.preventDefault();
              }}
            >
              romain.clemencon@mycit.ie
            </span>{" "}
            for a demo.
          </div>
          <div className="overflow-hidden px-5">
            <img
              src={computer}
              className="m-auto mb-4 rounded-lg border shadow-lg"
              alt="A computer loading"
              loading="lazy"
            />
          </div>
          <p className=" mb-4 text-center italic">
            Credit to Amanda Cassingham-Bardwell{" "}
            <a href="https://dribbble.com/shots/4051871-Blue-Screen">
              @dribbble
            </a>
          </p>
          <div className="flex-grow"></div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
