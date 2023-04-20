import React from "react";
import { Buffer } from "buffer";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let status = outputDetails?.submission?.Item?.compiled_status;

    return (
      <>
        {status === "processing" ? (
          <div className="mt-10 text-center text-lg font-medium text-blue-400">
            "Compiling your code ..."
          </div>
        ) : (
          <div className="m-1 rounded-md bg-[#1B2B34] text-sm font-normal text-white">
            <pre className="px-2 py-1 text-xs font-normal text-red-500 ">
              {Buffer.from( outputDetails?.submission?.Item?.compiled_output,
              "base64" ).toString("utf-8")}
            </pre>
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
