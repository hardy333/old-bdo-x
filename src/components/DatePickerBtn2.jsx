import React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import { Menu } from "@szhsin/react-menu";

const DatePickerBtn2 = ({
  dateState,
  setDateState,
  changeDataA,
  changeDataB,
  changeDemands,
}) => {
  return (
    <Menu
      className="date-menu"
      menuButton={({ open }) => {
        return (
          <button className="btn btn-date" style={{ width: "420px" }}>
            <span style={{ color: "#F55364" }}>
              {format(dateState["selection"].startDate, "MMM dd, yyyy")} -{" "}
              {format(dateState["selection"].endDate, "MMM dd, yyyy")}
            </span>
            --
            <span style={{ color: "#6E0FF5" }}>
              {format(dateState["compare"].startDate, "MMM dd, yyyy")} -{" "}
              {format(dateState["compare"].endDate, "MMM dd, yyyy")}
            </span>
          </button>
        );
      }}
      placement="start"
      transition
    >
      <div className="date-box">
        <p className="red">Choose Perios:</p>
        <p className="blue">Compare: </p>
        <p></p>
      </div>
      <DateRangePicker
        dragSelectionEnabled
        onChange={(item) => {
          setDateState({ ...dateState, ...item });
          changeDemands();
          if (item.compare) {
            changeDataA();
          } else {
            changeDataB();
          }
        }}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={[dateState.selection, dateState.compare]}
        direction="horizontal"
      />
      {/* </MenuItem> */}
    </Menu>
  );
};

export default DatePickerBtn2;
