import React from "react";
import gdm from "../assets/icons/gdm.png";
// import ring from "../assets/icons/ringing.png";
// import signOut from "../assets/icons/sign-out.png";

import arrow from "../assets/navbar/arrow.svg";
import ring from "../assets/navbar/ring.svg";
import user from "../assets/navbar/user.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import arrowBack from "../assets/back-arrow.svg";
import DashAdd from "../assets/dash-add.png";
import DashHouse from "../assets/dash-house.png";

import "../styles/dashboard-navbar.css";
import PlusSvg from "./svgs/PlusSvg";
import HouseSvg from "./svgs/service-level-svgs/HouseSvg";

const startingPages = ["/login", "/register"];

const DashboardNavbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isStartingPage = startingPages.includes(pathname);
  const backArrow = (
    <img
      onClick={() => navigate(-1)}
      src={arrowBack}
      alt=""
      style={{
        // height: "17px",
        // width: 25,
        marginRight: 10,
        marginLeft: "0px",
        cursor: "pointer",
        marginRight: "auto",
      }}
    />
  );

  return (
    <header
      className="dashboard-navbar"
      style={{ height: "63px", flexShrink: 0 }}
    >
      {pathname !== "/" ? backArrow : null}

      {isStartingPage ? (
        <>
          <Link to="/login" className="btn abc btn-link btn-blue">
            Login
          </Link>
          <Link to="/register" className="btn btn-outlined btn-blue">
            Register
          </Link>
        </>
      ) : (
        <>
          <div
            className="gdm-container cursor-pointer"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <a href="#">
              <img src={user} alt="" />
            </a>
            <span style={{ fontWeight: 700 }}>რითეილერი</span>
          </div>

          <Link to="/login" className="ring-link" style={{ marginRight: 10 }}>
            <img src={ring} alt="" />
            <div className="ring-box">
              <header>
                <PlusSvg />
                <HouseSvg />
              </header>
              <p>Dear Giorgi,</p>
              <p>
                Your orders to GDM has been approved. See what they have
                reserved for you:
              </p>
              <h2>GDM Orders</h2>
              <footer>
                <p>Order amount:</p>
                <p>413.5 GEL</p>
              </footer>
            </div>
          </Link>
          <Link to="/login">
            <img src={arrow} alt="" />
          </Link>
        </>
      )}
    </header>
  );
};

export default DashboardNavbar;
