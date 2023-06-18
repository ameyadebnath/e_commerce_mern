import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { email, password, reEnterPassword } = user;

    if (email && password && password === reEnterPassword) {
      //alert("posted")
      axios
        .post("http://localhost:9002/register", user)
        .then((res) => alert(res.data.message));
    } else {
      alert("invalid input");
    }
  };

  return (
    <>
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
            </ul>
          </div>
        </nav>
      </div>

      <div className="rcapsule">
        <div className="register">
          <h1>Register</h1>
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="Enter Your Email"
            onChange={handleChnage}
          ></input>
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Enter Your Password"
            onChange={handleChnage}
          ></input>
          <input
            type="password"
            name="reEnterPassword"
            value={user.reEnterPassword}
            placeholder="Confirm Password"
            onChange={handleChnage}
          ></input>
          <div className="button" onClick={register}>
            Register
          </div>
          <div>or</div>
          <div className="button" onClick={() => navigate("/login")}>
            Login
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
