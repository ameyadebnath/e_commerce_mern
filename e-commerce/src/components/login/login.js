import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios
      .post("http://localhost:9002/login", user)
      .then((res) => alert(res.data.message));
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChnage}
        placeholder="Enter Your Email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChnage}
        placeholder="Enter Your Password"
      ></input>
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      {/* <div className="button" onClick={(e) => navigate("/register")}>
        Register
      </div> */}
    </div>
  );
};

export default Login;
