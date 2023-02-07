import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import axios from "axios";
import { classnames } from "../../Utils/general";
import { languageOptions } from "../../Constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Buffer } from "buffer";
import { defineTheme } from "../../Lib/defineTheme";
import useKeyPress from "../../Hooks/useKeyPress";
import Footer from "../Footer";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguageDropdown from "./LanguageDropdown";

const javascriptDefault = `// some comment`;

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

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
      language_id: language.id,
      // encode source code in base64
      source_code: Buffer.from(code).toString("base64"),
      stdin: Buffer.from(customInput).toString("base64"),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_API_URL + "/assignment",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
      },
      data: formData,
    };
    console.log(options);
    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const id = response.data.id;
        checkStatus(id);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (id) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_API_URL + "/assignment/" + id,
      params: { base64_encoded: "true", fields: "*" },
    };
    try {
      let response = await axios.request(options);
      // let statusId = response.data.status?.id;
      setProcessing(false);
      // setOutputDetails(response.data);
      showSuccessToast(`Compiled Successfully!`);
      console.log("response.data", response.data);
      return;
      // Processed - we have a result
      // if (statusId === 1 || statusId === 2) {
      //   // still processing
      //   setTimeout(() => {
      //     checkStatus(id);
      //   }, 2000);
      //   return;
      // } else {
      //   setProcessing(false);
      //   setOutputDetails(response.data);
      //   showSuccessToast(`Compiled Successfully!`);
      //   console.log("response.data", response.data);
      //   return;
      // }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  const handleThemeChange = (th) => {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  };

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

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

  return (
    <>
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
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguageDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-row items-start space-x-4 px-4 py-4">
        <div className="flex h-full w-full flex-col items-end justify-start">
          <CodeEditor
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>

        <div className="right-container flex w-[30%] flex-shrink-0 flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
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
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Landing;
