import React from "react";

const CustomColumnFilter = ({ value, onChange }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Filter..."
    />
  );
};

export default CustomColumnFilter;
