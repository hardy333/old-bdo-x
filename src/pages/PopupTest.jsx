import React, { useState } from "react";
import "../styles/popup-page.css";
import CustomPopup from "../components/CustomPopup";

const PopupTest = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  return (
    <>
      <div className="popup-gape" style={{ paddingLeft: "50px" }}>
        <button style={{ position: "relative" }}>
          button
          <CustomPopup items={items} cName="hello" />
        </button>
      </div>
    </>
  );
};

export default PopupTest;
