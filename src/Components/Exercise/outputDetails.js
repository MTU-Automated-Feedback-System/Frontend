import React, { useState } from "react";
import { Buffer } from "buffer";
import { useAuth } from "../../Contexts/authContext";

const stdOut = (output) => {};
const expectedOutput = (output) => {};

const OutputDetails = ({
  outputDetails,
  status,
  testCases,
  handleCompile,
  processing,
}) => {
  const [caseIndex, setCaseIndex] = useState(0);
  const auth = useAuth();

  return (
    <>
      <div className="flex flex-row gap-x-4">
        <div className="w-4/6 flex-grow">
          {status === "error" ? (
            <div className="text-xl font-medium text-amber-600">
              {outputDetails?.error_type}
            </div>
          ) : (
            <div
              className={
                "text-xl font-medium " +
                (outputDetails?.cases == 0
                  ? "text-green-700"
                  : "text-amber-700")
              }
            >
              {outputDetails?.cases == 0
                ? "Success"
                : "Cases " +
                  (outputDetails?.test_cases.length - outputDetails?.cases) +
                  " / " +
                  outputDetails?.test_cases.length}
            </div>
          )}
          {status === "compiled" && (
            <>
              <div className="mt-2 flex flex-row gap-x-4">
                {testCases.map((expected_result, index) => (
                  <button
                    className="flex-shrink-0 rounded-md bg-blue-200 px-3 py-1 font-medium text-blue-700
              transition duration-200 hover:bg-blue-100 "
                    onClick={() => setCaseIndex(index)}
                  >
                    Case {index + 1}
                  </button>
                ))}
              </div>
              <button
                className={
                  "mt-3 flex-shrink-0 rounded-md border-2 border-red-300 bg-orange-100 px-3 py-1 font-medium text-amber-700 transition duration-200 hover:bg-orange-200 " +
                  (!outputDetails ||
                  outputDetails?.compiled_status === "error" ||
                  auth.authStatus !== "signedIn"
                    ? "cursor-not-allowed opacity-50"
                    : "")
                }
                disabled={auth.authStatus !== "signedIn"}
                onClick={() => {
                  handleCompile("feedback", caseIndex);
                }}
              >
                {processing ? "Processing" : "Case Specific Feedback"}
              </button>
              {testCases[caseIndex].type !== "stdout" && (
                <div className="mt-2 text-sm font-semibold"></div>
              )}

              <div className="mt-2 text-sm font-semibold">Output</div>

              <div className="mt-1 overflow-auto rounded-md bg-[#2a4555e1] text-sm font-normal text-white">
                <pre className="px-2 py-1 text-sm font-normal text-white">
                  {Buffer.from(
                    outputDetails?.test_cases[caseIndex].output,
                    "base64"
                  ).toString("utf-8")}
                </pre>
              </div>

              <div className="mt-2 text-sm font-semibold">Expected</div>

              <div className="mt-1 rounded-md bg-[#2a4555e1] text-sm font-normal text-white">
                <pre className="px-2 py-1 text-sm font-normal text-white ">
                  {Buffer.from(
                    testCases[caseIndex].expected_result,
                    "base64"
                  ).toString("utf-8")}
                </pre>
              </div>
            </>
          )}

          <div className="mt-2 text-sm font-semibold">Terminal Output</div>

          <div className="mt-1 rounded-md bg-[#2a4555e1] text-sm font-normal text-white">
            <pre className="px-2 py-1 text-sm font-normal text-white ">
              {outputDetails &&
                Buffer.from(outputDetails?.compiled_output, "base64").toString(
                  "utf-8"
                )}
            </pre>
          </div>
        </div>

        {status !== "error" && (
          <div className="flex w-2/6 flex-col">
            <div className="sticky top-0">
              <div className="text-lg font-semibold text-orange-600 ">
                Feedback:{" "}
                <span className="text-sm font-semibold text-orange-700">
                  {outputDetails?.feedback?.type === "case"
                    ? "Case " + (parseInt(outputDetails?.feedback?.case) + 1)
                    : outputDetails?.feedback?.type[0].toUpperCase() +
                      outputDetails?.feedback?.type.slice(1)}
                </span>
              </div>

              <div className="max-h-full break-words rounded-md bg-orange-200 px-2 py-1 text-sm font-medium text-amber-800 transition duration-200">
                {outputDetails?.feedback?.message}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OutputDetails;
