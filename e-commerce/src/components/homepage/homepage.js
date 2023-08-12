import React, { useState } from "react";
import "./homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Products";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { BrowserRouter as Router } from "react-router-dom";
import Cart from "./Cart";
import Shipped_order from "./Shipped_order";
import Delivered_order from "./Delivered_order";

const Homepage = ({
  user,
  setUser,
  cartItems,
  setCartItems,
  handleAddProduct,
  handleRemoveProduct,
  handleCartClearance,
}) => {
  //const [cartItems, setCartItems] = useState([]);
  // var cartItems = props.cartItems
  // var setCartItems = props.setCartItems

  return (
    <div>
      <header className="header">
        <div className="headerdiv">
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
                {cartItems.reduce((total, item) => total + item.quantity, 0)};

                {/* {cartItems.length} */}
              </Link>
            </li>
          </ul>

          <ul>
            <li className="items">
              <Link to="/current_order">Current Orders</Link>
            </li>
          </ul>

          <ul>
            <li className="items">
              <Link to="/shipped_order">Shipped Orders</Link>
            </li>
          </ul>

          <ul>
            <li className="items">
              <Link to="/delivered_order">Orders on Delivery</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/login">logout</Link>
            </li>
          </ul>
        </div>
      </header>
      <div>
        <Products
          user={user}
          setUser={setUser}
          cartItems={cartItems}
          setCartItems={setCartItems}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          handleCartClearance={handleCartClearance}
        />
      </div>
    </div>
  );
};

export default Homepage;
