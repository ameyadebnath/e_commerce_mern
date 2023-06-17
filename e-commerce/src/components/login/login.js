import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = ({mUser,setMUser,handleCartClearance}) => {
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
      console.log(res.data);
      handleCartClearance();
      if(res.data.user===undefined) {
        toast.warning(res.data.message);
        return;
      }
      toast.success(res.data.message);
      console.log(typeof setMUser)
      setMUser(res.data.user);
      if(res.data.user.bankid.length!==0){
        navigate('/');
      }else{
        //navigate to bank info providing page
        navigate('/bank');
      }
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
          <h1 className="header1">Login</h1>
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
      </div>
    </>
  );
};

export default Login;
