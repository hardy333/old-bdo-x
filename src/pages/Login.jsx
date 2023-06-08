import React from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="login">
        <div className="login__container">
          <h1>Welcome Again!</h1>

          <form action="" className="login-form">
            <input className="input" type="email" placeholder="E-mail" />
            <input className="input" type="password" placeholder="Password" />
            <small className="ml-auto ">
              <a href="" className="login-link">
                Forgot password?
              </a>
            </small>
            <button className="btn btn-blue">Log in</button>
            <p className="login-form__login">
              Do not have an account?{" "}
              <Link className="link login-link" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
