// LanguageDropdown.js

import React from "react";
import Select from "react-select";
import { customStyles } from "../../Constants/customStyles";
import { languageOptions } from "../../Constants/languageOptions";

const LanguageDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguageDropdown;