import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Cart.css";
import "./Current_order.css";

const Current_order = () => {
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

      {/* balance */}
      <div className="account-balance">Current Balance: </div>

      <div className="cart-items">
        <h2 className="cart-items-header">Cart Items</h2>

        {/* {cartItems.length === 0 && (
          <div className="cart-items-empty">No items are added.</div>
        )} */}

        <div>
          will add here all products to show
          {/* {cartItems.map((item) => (
            <div key={item.id} className="cart-items-list">
              <img
                className="cart-items-image"
                src={item.image}
                alt={item.title}
              />
              <div className="cart-items-name">{item.title}</div>
              <div className="cart-items-funtion">
                <button
                  className="cart-items-add"
                  onClick={() => handleAddProduct(item)}
                >
                  +
                </button>
                <button
                  className="cart-items-remove"
                  onClick={() => handleRemoveProduct(item)}
                >
                  -
                </button>
              </div>
              <div className="cart-items-price">
                {item.quantity} * ${item.price}
              </div>
            </div>
          ))} */}
          <div>
            <button className="status">status</button>
          </div>
        </div>

        <div className="cart-items-total-price-name">
          Total price
          {/* <div className="cart-items-total-price ">${totalPrice}</div> */}
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center"></div>
    </div>
  );
};

export default Current_order;
