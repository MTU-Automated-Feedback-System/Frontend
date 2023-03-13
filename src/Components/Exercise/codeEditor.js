import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay h-full shadow-4xl overflow-hidden rounded-md">
      <Editor
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// default editor"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditor;
