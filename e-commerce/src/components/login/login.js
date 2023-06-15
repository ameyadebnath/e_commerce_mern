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
    axios.post("http://localhost:9002/login", user).then((res) => {
      alert(res.data.message);
      console.log(res.data);
    });
  };

  // const login = () => {
  //   var bankid = ""
  //   axios
  //     .post("http://localhost:9003/addbankinfo", { accountno: "1234567890", secretkey: "mysecretpassword"})
  //     .then((res) => {
  //       alert(res.data.message);
  //       console.log(res.data);
  //       if(res.data.user._id!==undefined){
  //         axios
  //         .post("http://localhost:9002/updatebankinfo", { email: user.email, bankid: res.data.user._id})
  //         .then((res) => {
  //           alert(res.data.message);
  //           console.log(res.data);
  //         });
  //       }
  //     });
  // };

  return (
    <div className="login">
      <div className="background-image"></div>
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
      <div className="button" onClick={(e) => navigate("/register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
