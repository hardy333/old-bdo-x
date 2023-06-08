import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "../styles/vendors-date-range.css";

const VendorsDateRange = ({ changeRowData }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  return (
    <div className="vendors-date-range">
      <DateRange
        editableDateInputs={true}
        onChange={(item) => {
          setState([item.selection]);
          changeRowData();
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
        dragSelectionEnabled={false}
        minimumNights={0}
      />
    </div>
  );
};

export default VendorsDateRange;
