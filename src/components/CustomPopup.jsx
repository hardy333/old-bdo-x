import classNames from "classnames";
import React from "react";
import "../styles/custom-popup.css";

const CustomPopup = ({ items, cName }) => {
  return (
    <ul
      className={classNames({
        "custom-popup": true,
        [cName]: true,
      })}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default CustomPopup;
