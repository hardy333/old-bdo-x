import React from "react";

const CloseModalSvg = ({ fill = "#fff" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_653_746)">
        <path
          d="M2.22485 2.22498L21.7749 21.775"
          stroke={fill}
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M2.22485 21.775L21.7749 2.22498"
          stroke={fill}
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_653_746">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CloseModalSvg;
