import React from "react";
import "./bank.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Bank = () => {
  const navigate = useNavigate();
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
                <i class="fas fa-shopping-cart" />
              </Link>
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
        <input type="text" name="email" placeholder="Account No"></input>
      </div>
      <div className="data1">
        <input type="text" name="email" placeholder="Secret key"></input>
      </div>
      <div className="data2">
        <div className="button">Authorize Autopay</div>
      </div>
    </div>
  );
};

export default Bank;
