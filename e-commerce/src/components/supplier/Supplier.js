import React from "react";
import { Link } from "react-router-dom";
import "./Supplier.css";
import { useNavigate } from "react-router-dom";

const Supplier = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <div>
          <h1>
            <Link to="/login" className="logo">
              iGadget
            </Link>
          </h1>
        </div>
        <div className="header-links">
          <ul>
            <li>
              <Link to="/login">logout</Link>
            </li>
          </ul>
        </div>
      </header>

      {/* balance */}
      <div className="account-balance1">Supplier's Balance: </div>

      <div className="pending-cart-items">
        <h2 className="pending-cart-items-header">Pending Orders List</h2>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>will add here all products to show</div>
          <button className="status1">Accept</button>
        </div>
      </div>

      <div className="pending-cart-items">
        <h2 className="pending-cart-items-header">Delivered Orders List</h2>
        <div>will add delivered product list</div>
      </div>
    </div>
  );
};

export default Supplier;
