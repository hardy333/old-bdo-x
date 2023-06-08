import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import searchSvg from "../assets/employees/search.svg";
import InvoiceCard1 from "../components/InvoiceCard1";
import "../styles/invoices1.css";

const Invoices1 = () => {
  return (
    <>
      <header className="invoices-header">
        <h1>Invoices</h1>

        <div>
          <div className="input-wrapper">
            <input type="text" className="input" />
            <img src={searchSvg} alt="" />
          </div>
        </div>
      </header>

      <div className="invoices-card-container">
        <InvoiceCard1 paidStatus="To be paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
        <InvoiceCard1 paidStatus="Paid" />
      </div>
    </>
  );
};

export default Invoices1;
