import React from "react";
import { classnames } from "../../Utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <div className="pr-2">
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-6 py-2 hover:shadow transition duration-200 bg-white"
        )}
      ></textarea>
    </div>
  );
};

export default CustomInput;