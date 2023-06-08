import React from "react";

const WithCellProps = (Component, ...props) => {
  console.log("Whit props: ", props);

  return <Component {...props} />;
};

export default WithCellProps;
