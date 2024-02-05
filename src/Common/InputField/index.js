// InputField.js
import React from "react";

const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
    
  return (
    <div>
      <h4>
        {label}:
        <input
          className="m-1"
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </h4>
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default InputField;
