import classNames from "classnames";
import React from "react";

const InvoiceCard2 = ({ paidStatus }) => {
  return (
    <div
      className={classNames({
        "invoice-card-2": true,
        success: paidStatus === "Paid",
        danger: paidStatus === "To be paid",
      })}
    >
      <header className="invoice-card-2__header">
        <h2>Starndard</h2>
        <h2>{paidStatus}</h2>
      </header>
      <ul>
        <li>
          <span>Number #</span>
          <span>1376720230126</span>
        </li>
        <li>
          <span>Period</span>
          <span>01.02.23-28.02.23</span>
        </li>
        <li>
          <span>Due Date</span>
          <span>January 31, 2023</span>
        </li>
        {/* <li>
          <span>Amount</span>
          <span>5138 GEL</span>
        </li> */}
      </ul>
    </div>
  );
};

export default InvoiceCard2;
