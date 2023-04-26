import React, { useState } from "react";
import { Buffer } from "buffer";

const stdOut = (output) => {};
const expectedOutput = (output) => {};

const OutputDetails = ({ outputDetails, status, testCases, handleCompile, processing }) => {
  const [caseIndex, setCaseIndex] = useState(0);

  return (
    <>
      {status === "error" ? (
        <div className="text-xl font-medium text-red-600">
          {outputDetails?.submission?.Item?.error_type}
        </div>
      ) : (
        <div className="text-xl font-medium text-green-600">Success</div>
      )}
      <div className="flex flex-row gap-x-4">
        <div className="flex-grow ">
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

              {testCases[caseIndex].type !== "stdout" && (
                <div className="mt-2 text-sm font-semibold"></div>
              )}

              <div className="mt-2 text-sm font-semibold">Output</div>

              <div className="mt-1 rounded-md bg-[#2a4555e1] text-sm font-normal text-white">
                <pre className="px-2 py-1 text-sm font-normal text-white ">
                  {testCases[caseIndex].type === "stdout"
                    ? Buffer.from(
                        outputDetails?.submission?.Item?.test_cases[caseIndex]
                          .output,
                        "base64"
                      ).toString("utf-8")
                    : outputDetails?.submission?.Item?.test_cases[caseIndex]
                        .output}
                </pre>
              </div>

              <div className="mt-2 text-sm font-semibold">Expected</div>

              <div className="mt-1 rounded-md bg-[#2a4555e1] text-sm font-normal text-white">
                <pre className="px-2 py-1 text-sm font-normal text-white ">
                  {testCases[caseIndex].type === "stdout"
                    ? Buffer.from(
                        testCases[caseIndex].expected_result,
                        "base64"
                      ).toString("utf-8")
                    : testCases[caseIndex].expected_result}
                </pre>
              </div>
            </>
          )}

          <div className="mt-2 text-sm font-semibold">Terminal Output</div>

          <div className="mt-1 rounded-md bg-[#2a4555e1] text-sm font-normal text-white">
            <pre className="px-2 py-1 text-sm font-normal text-white ">
              {outputDetails && Buffer.from(
                outputDetails?.submission?.Item?.compiled_output,
                "base64"
              ).toString("utf-8")}
            </pre>
          </div>
        </div>
        <div className="w-1/4">
          <div className="text-lg font-semibold text-orange-600">Feedback</div>
          <button
            className="mt-1 flex-shrink-0 rounded-md border-2 border-red-300 bg-orange-100 px-3 py-1
              font-medium text-red-700 transition duration-200 hover:bg-orange-200"
            onClick={() => {handleCompile("feedback", caseIndex)}}
          >
            {processing ? "Processing" : "Submission feedback"}
          </button>
          <div className="mt-3 max-h-full break-words rounded-md bg-orange-200 px-2 py-1 text-sm font-medium text-red-800 transition duration-200">
            {outputDetails?.submission?.Item?.feedback?.message}
          </div>
        </div>
      </div>
    </>
  );
};

export default OutputDetails;
