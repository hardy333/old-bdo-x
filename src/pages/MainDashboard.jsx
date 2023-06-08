import React from "react";
import "../styles/main-dashboard.css";
import ApexChart1 from "../components/ApexChart1";
import ApexChart2 from "../components/ApexChart2";

const MainDashboard = () => {
  return (
    <>
      <section className="main-dashboard">
        <header className="main-dashboard-header">
          <div>
            <h2>Delivered Orders</h2>
            <h3>124,765.88 $</h3>
          </div>
          <div>
            <h2>Delivered Orders</h2>
            <h3>65,540.50 $</h3>
          </div>
        </header>

        <div className="main-dashboard-stats">
          <div className="left">
            <div className="stat-card">
              <h3>Shops</h3>
              <h2>324</h2>
            </div>
            <div className="stat-card">
              <h3>Suppliers</h3>
              <h2>246</h2>
            </div>
            <div className="stat-card">
              <h3>Open Orders</h3>
              <h2>523</h2>
            </div>
          </div>
          <div className="right">
            <div className="top chart-card">
              <ApexChart1 />
            </div>
            <div className="bottom chart-card">
              <ApexChart2 />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainDashboard;
