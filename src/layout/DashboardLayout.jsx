import React from "react";
import DashboardAside from "../components/DashboardAside";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardAsideLight from "../components/DashboardAsideLight";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import messengerImg from "../assets/messenger.svg";

const staticMainPathnames = ["/login", "/register"];

const DashboardLayout = ({ light = false }) => {
  const location = useLocation();
  const pathname = location.pathname;
  let staticMain = false;
  if (staticMainPathnames.includes(pathname)) {
    staticMain = true;
  }

  let classN = "";

  if (pathname === "/") {
    classN = "dashboard--dash";
  }

  return (
    <div className={`dashboard ${classN}`}>
      <button className="btn-messenger">
        <img src={messengerImg} alt="" />
      </button>
      {light ? <DashboardAsideLight left={true} /> : <DashboardAside />}
      <DashboardNavbar />
      <main className={`dashboard-main ${staticMain ? "static" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
