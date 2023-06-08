import React, { useEffect, useRef, useState } from "react";
import "../styles/expanding-input.css";
import classNames from "classnames";

const ExpandingInput = ({ onFilterTextChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (inputRef.current.value.length > 0) return;
      if (wrapperRef.current.contains(e.target)) return;
      setIsOpen(false);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      className={classNames({
        "expanding-input-wrapper": true,
        open: isOpen,
      })}
      ref={wrapperRef}
    >
      <input
        ref={inputRef}
        className="expanding-input"
        type="text"
        onChange={onFilterTextChange}
      />
      <svg
        onClick={() => {
          setIsOpen(true);
          inputRef.current.focus();
        }}
        className="expanding-input-img"
        id="Layer_3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 55.63 60"
      >
        <defs></defs>
        <path
          className="cls-1"
          d="m27.4,54.79C12.29,54.79,0,42.5,0,27.4S12.29,0,27.4,0s27.4,12.29,27.4,27.4-12.29,27.4-27.4,27.4Zm0-48.53C15.74,6.26,6.26,15.74,6.26,27.4s9.48,21.13,21.13,21.13,21.13-9.48,21.13-21.13S39.05,6.26,27.4,6.26Z"
        />
        <path
          className="cls-1"
          d="m52.5,60c-.8,0-1.6-.31-2.21-.92l-7.89-7.89c-1.22-1.22-1.22-3.21,0-4.43s3.21-1.22,4.43,0l7.89,7.89c1.22,1.22,1.22,3.21,0,4.43-.61.61-1.41.92-2.21.92Z"
        />
      </svg>

      <svg
        className="expanding-input-img-x"
        width="8"
        height="9"
        onClick={() => {
          inputRef.current.value = "";
          onFilterTextChange({ target: inputRef.current });
        }}
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 35.15 35.15"
      >
        <defs></defs>
        <path
          className="cls-1"
          d="m30.34,34.33L.83,4.81c-1.1-1.1-1.1-2.89,0-3.99s2.89-1.1,3.99,0l29.51,29.51c1.1,1.1,1.1,2.89,0,3.99s-2.89,1.1-3.99,0Z"
        />
        <path
          className="cls-1"
          d="m.83,34.33c-1.1-1.1-1.1-2.89,0-3.99L30.34.83c1.1-1.1,2.89-1.1,3.99,0s1.1,2.89,0,3.99L4.81,34.33c-1.1,1.1-2.89,1.1-3.99,0Z"
        />
      </svg>
    </div>
  );
};

export default ExpandingInput;
