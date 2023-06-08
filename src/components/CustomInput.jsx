import React, { forwardRef, useEffect, useState } from "react";

// Css
import "../styles/filter-input.css";

const CustomInput = forwardRef((props, ref) => {
  const [text, setText] = useState("");

  useEffect(() => {
    onInputBoxChanged(text);
  }, [text]);

  const onInputBoxChanged = (val) => {
    props.parentFilterInstance((instance) => {
      instance.onFloatingFilterChanged("contains", val);
    });
  };

  return (
    <>
      <div className="filter-input-wrapper">
        <input
          className="filter-input"
          style={{ width: "100%" }}
          placeholder={`Filter By ${props.column.colId}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span className="filter-input-img" onClick={() => setText("")}>
          <span>x</span>
        </span>
      </div>
    </>
  );
});

export default CustomInput;
