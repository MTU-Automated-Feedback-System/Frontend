import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, language, code, theme }) => {
  // const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    // setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay h-full shadow-4xl overflow-hidden rounded-md">
      <Editor
        language={language || "python3"}
        value={code}
        theme={theme || "oceanic-next"}
        defaultValue=""
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditor;
