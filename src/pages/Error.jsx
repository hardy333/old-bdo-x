import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <h1 className="text-center">
        Page does not exists.{" "}
        <Link className="text-blue-500" to="/">
          Go to Home
        </Link>
      </h1>
    </>
  );
};

export default Error;
