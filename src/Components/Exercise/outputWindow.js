import React from "react";

import OutputDetails from "./outputDetails";

const OutputWindow = ({ outputDetails, testCases, handleCompile, processing }) => {
  const getOutput = () => {
    let status = outputDetails?.submission?.Item?.compiled_status;

    return (
      <>
        {status === "processing" ? (
          <div className="mt-10 text-center text-lg font-medium text-blue-400">
            "Compiling your code ..."
          </div>
        ) : (
          <div className="p-2">
            <OutputDetails
              outputDetails={outputDetails}
              status={status}
              testCases={testCases}
              handleCompile={handleCompile}
              processing={processing}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {outputDetails ? (
        <>{getOutput()}</>
      ) : (
        <div className="mt-10 text-center text-lg font-medium">
          Run your code when you're ready.
        </div>
      )}
    </>
  );
};

export default OutputWindow;
