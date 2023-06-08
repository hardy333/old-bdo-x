import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <>
      <section className="home">
        <h1>pages</h1>

        <div className="home-links-container">
          <div className="home-links">
            <small>Sign in pages</small>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/prices">Prices</Link>

            <small className="mt-3">Non table pages</small>
            <Link to="/main-dashboard">Main Dashboard</Link>
            <Link to="/invoices1">Invoces v1</Link>
            <Link to="/invoices2">Invoces v2</Link>
            <Link to="/profile">profile</Link>
            <Link to="/employees">Employees</Link>
            <Link to="/vendors">vendors</Link>

            <small className="mt-3">Old Tables</small>
            <Link to="/dashboard">dashboard table old</Link>
            <Link to="/all-orders">all orders table </Link>
          </div>
          <div className="home-links">
            <small>New Tables</small>
            <hr />
            <Link to="/ag-table">ag table</Link>
            <hr />
            <br />
            <small>Orders</small>
            <hr />
            <Link to="/all-orders-parent">All Orders</Link>
            <Link to="/order-details">Order Details</Link>
            <hr />

            <br />
            <small>
              Vendor all Orders(ერთი კონკრეტული ვენდორისთვის ყველა შეკვეთა ??)
            </small>
            <hr />
            <Link to="/vendor-all-orders">vendor all orders</Link>
            <hr />

            <br />
            <small>Reports</small>
            <hr />
            <Link to="/reports">service level reports</Link>
            <Link to="/reports-child">service level reports details</Link>
            <hr />
            <br />
            <small>Single tables</small>
            <hr />
            <Link to="/new-catalogue">New Catalogue with backend data</Link>
            <Link to="/invoices-table">Invoices Table</Link>
            <Link to="/logs">Logs/Settings Table</Link>
            <Link to="/catalogue">Catalogue Table</Link>
            <Link to="/stable-table">Stable Table</Link>
            <hr />
          </div>
          <div className="home-links">
            <small>Geo tables</small>
            <Link to="/catalogue-geo">Catalogue geo</Link>
            <Link to="/catalogue-geo-resize">Catalogue geo with resize </Link>
            <br />
            <small>Catalogue tables</small>
            <Link to="/catalogue">Catalogue 3</Link>
            <Link to="/catalogue-5-level">Catalogue 5</Link>

            <br />
            <small>SLA tables</small>
            <Link to="/reports">SLA All</Link>
            <Link to="/sla-by-vendors">SLA By Vendor</Link>
            <Link to="/sla-graphics">SLA Grapcis</Link>
            <Link to="/sla-category">SLA category</Link>
            <br />
            <small>Discounts</small>
            <Link to="/discounts-table">Discounts Table</Link>
            <Link to="/discounts-cards">discounts Cards</Link>
            <br />
            <small>Calendar</small>
            <Link to="/vendors-calendar">Vendors Calendar</Link>
          </div>
          <div className="home-links">
            <small>Invoices</small>
            <Link to="/invoices-table">Invoices Table</Link>
            <Link to="/invoice-details">Invoice Details</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
