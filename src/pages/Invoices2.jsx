import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import searchSvg from "../assets/employees/search.svg";
import InvoiceCard2 from "../components/InvoiceCard2";
import SearchSvg from "../components/svgs/SearchSvg";
import FourDotsSvg from "../components/FourDotsSvg";
import ListSvg from "../components/svgs/ListSvg";
import { useNavigate } from "react-router-dom";

const Invoices2 = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="invoices-header">
        <h1>Invoices</h1>

        <div className="invoices-settings">
          <div className="input-wrapper">
            <input type="text" className="input" />
            <SearchSvg />
          </div>
          <button>
            <FourDotsSvg />
          </button>
          <button
            onClick={() => {
              navigate("/invoices-table");
            }}
          >
            <ListSvg fill="#D0C7E8" />
          </button>
        </div>
      </header>

      <div className="invoices-card-container">
        <InvoiceCard2 paidStatus="To be paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
      </div>
      <div className="employee-pag-container">
        <button>&larr;</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>&rarr;</button>

        <div className="employees-page-info">
          <p>1-5 of 5</p>
        </div>
      </div>
    </>
  );
};

export default Invoices2;
