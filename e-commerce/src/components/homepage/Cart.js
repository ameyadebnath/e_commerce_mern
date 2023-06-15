import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems }) => {
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
      <div className="cart-items">
        <div className="cart-items-header">Cart Items</div>

        {cartItems.length === 0 && (
          <div className="cart-items-empty">No items are added.</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
