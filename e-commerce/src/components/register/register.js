import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //const navigate = useNavigate();

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
      {/* <div className="button" onClick={() => navigate.push("/login")}>
        Login
      </div> */}
    </div>
  );
};

export default Register;
