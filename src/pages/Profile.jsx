import React from "react";
import "../styles/profile.css";
import user from "../assets/user.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";
import UserSvg from "../components/svgs/UserSvg";

const Profile = () => {
  const location = useLocation();
  const { pathname } = location;

  const slashIndex = pathname.lastIndexOf("/");
  const param = pathname.slice(slashIndex);

  return (
    <>
      <section className="profile">
        <header className="profile-header">
          <h1>პროფილი</h1>
        </header>
        <section className="profile-content-container">
          <div className="profile-card">
            <header className="profile-card-header">
              <div className="profile-card-img-container">
                {/* <img src={user} alt="user" /> */}
                <UserSvg />
              </div>
            </header>
            <div className="profile-form-container">
              {/* Left */}
              <div className="left">
                <Link
                  className={classNames({
                    active: param === "/profile",
                  })}
                  to="/profile"
                >
                  პირადი ინფო
                </Link>
                <Link
                  to="change-password"
                  className={classNames({
                    active: param === "/change-password",
                  })}
                >
                  პაროლის შეცვლა
                </Link>
              </div>
              {/* Right */}
              <div className="right">
                <Outlet />
              </div>
            </div>
          </div>
          {/* Illustration */}
          {/* <div className="illustration-container">
            {param === "/profile" ? (
              <img loading="eager" src={illustration1} alt="" />
            ) : (
              <img loading="eager" src={illustration2} alt="" />
            )}
          </div> */}
        </section>
      </section>
    </>
  );
};

export default Profile;
