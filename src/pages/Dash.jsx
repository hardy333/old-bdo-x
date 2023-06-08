import React from "react";
import "../styles/main-dashboard.css";
import ApexChart1 from "../components/ApexChart1";
import ApexChart2 from "../components/ApexChart2";
import "../styles/dash.css";
import DashTopChart from "../components/DashTopChart";
import { Link } from "react-router-dom";
import BubbleChat from "../components/BubbleChat";
import ColumnCHart from "../components/ColumnCHart";

const Dash = () => {
  return (
    <>
      <section className="main-dashboard">
        <div className="main-dashboard-stats">
          <div className="stat-card">
            <h3>Shops</h3>
            <h2>324</h2>
          </div>
          <div className="stat-card">
            <h3>
              <Link to="/test">Suppliers</Link>
            </h3>
            <h2>246</h2>
          </div>
          <div className="stat-card">
            <h3>Vendors</h3>
            <h2>523</h2>
          </div>
          <div className="stat-card">
            <h3>Open Orders</h3>
            <h2>246</h2>
          </div>
        </div>

        <div className="main-dashboard-right">
          <header className="main-dashboard-header">
            <div>
              <h2>Pending Orders</h2>
              <h3>124,765.88 GEL</h3>
            </div>
            <div>
              <h2>Orders on the Way</h2>
              <h3>65,540.50 GEL</h3>
            </div>
          </header>
          <div className="main-dashboard-charts">
            <div className="top-chart-container">
              <DashTopChart />
            </div>
            <div className="bottom-chart-container">
              <section className="left-chart">
                <h2>Service level: Top 5 Vendors</h2>
                <ColumnCHart />
              </section>
              <section className="right-chart">{/* <BubbleChat /> */}</section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dash;
