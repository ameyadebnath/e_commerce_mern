import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Supplier from "../supplier/Supplier";
import { useNavigate } from "react-router-dom";

const Login_supplier = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="all-nav">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/login">
            iGadget
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login as User
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login_supplier">
                  Supplier
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin">
                  Admin
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="lcapsule">
        <div className="login">
          <div className="background-image"></div>
          <h1 className="header1">Login as Supplier</h1>

          <input
            type="text"
            name="email"
            // value={user.email}
            // onChange={handleChnage}
            placeholder="Enter Your Email"
          ></input>
          <input
            className="input2"
            type="password"
            name="password"
            // value={user.password}
            // onChange={handleChnage}
            placeholder="Enter Your Password"
          ></input>
          <div className="space"></div>
          <div className="button" onClick={() => navigate("/Supplier")}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_supplier;
