import React, { useState } from "react";
import "./bank.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Bank = ({user}) => {
  const navigate = useNavigate();
  const [accountNo, setAccountNo] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleAuthorizeAutopay = () => {
    console.log(user)
    axios
      .post("http://localhost:9003/addbankinfo", { accountno: accountNo, secretkey: secretKey})
      .then((res) => {
        toast.info(res.data.message);
        console.log(res.data);
        if(res.data.user._id!==undefined){
          axios
          .post("http://localhost:9002/updatebankinfo", { email: user.email, bankid: res.data.user._id})
          .then((res) => {
            console.log(res.data);
            if(res.data.success===1){
              toast.success(res.data.message);
              navigate('/');
            }else{
              toast.warning(res.data.message);
            }
          });
        }
      });

    // Clear the input fields after processing
    setAccountNo("");
    setSecretKey("");
  };

  return (
    <div>
      <header className="header">
        <div>
          <h1>
            <Link to="/" className="logo">
              iGadget
            </Link>
          </h1>
        </div>
        <div className="header-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/cart" className="cart">
                <i className="fas fa-shopping-cart" />
              </Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/current_order">Current_order</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/login">logout</Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="data">
        <input
          type="text"
          name="email"
          placeholder="Account No"
          value={accountNo}
          onChange={(e) => setAccountNo(e.target.value)}
        />
      </div>
      <div className="data1">
        <input
          type="text"
          name="email"
          placeholder="Secret key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
      </div>
      <div className="data2">
        <div className="button" onClick={handleAuthorizeAutopay}>
          Authorize Autopay
        </div>
      </div>
    </div>
  );
};

export default Bank;