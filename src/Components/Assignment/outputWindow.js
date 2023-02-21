import React from "react";
import { Buffer } from "buffer";

// Buffer.from(code).toString("utf-8")
const OutputWindow = ({ outputDetails }) => {
  // const getOutput = () => {
  //   let statusId = outputDetails?.submission?.Item?.status?.id;

  //   if (statusId === 6) {
  //     // compilation error
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-red-500">
  //         {Buffer.from(outputDetails?.submission?.Item?.compiled_output, 'base64').toString("utf-8")}
  //       </pre>
  //     );
  //   } else if (statusId === 3) {
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-green-500">
  //         {Buffer.from(outputDetails.stdout).toString("utf-8") !== null
  //           ? `${Buffer.from(outputDetails.stdout).toString("utf-8")}`
  //           : null}
  //       </pre>
  //     );
  //   } else if (statusId === 5) {
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-red-500">
  //         {`Time Limit Exceeded`}
  //       </pre>
  //     );
  //   } else {
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-red-500">
  //         {Buffer.from(outputDetails?.submission?.Item?.stderr).toString("utf-8")}
  //       </pre>
  //     );
  //   }
  // };
  const getOutput = () => {
    let status = outputDetails?.submission?.Item?.compiled_status;

    return (
      <pre className="px-2 py-1 text-xs font-normal text-red-500">
        {status === "processing"
          ? "Compiling your code ..."
          : Buffer.from(
              outputDetails?.submission?.Item?.compiled_output,
              "base64"
            ).toString("utf-8")}
      </pre>
    );
  };

  return (
    <>
      <h1 className="mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-bold text-transparent">
        Output
      </h1>

      <div className="h-56 w-full overflow-y-auto rounded-md bg-[#1e293b] text-sm font-normal text-white">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;
