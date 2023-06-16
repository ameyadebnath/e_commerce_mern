import React, { useState } from "react";
import "./homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Products";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { BrowserRouter as Router } from "react-router-dom";
import Cart from "./Cart";

const Homepage = ({ user, setUser, cartItems, setCartItems }) => {
  //const [cartItems, setCartItems] = useState([]);
  // var cartItems = props.cartItems
  // var setCartItems = props.setCartItems
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
                <Cart cartItems={cartItems} />
                <i class="fas fa-shopping-cart" />
              </Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/">logout</Link>
            </li>
          </ul>
        </div>
      </header>
      <div>
        <Products user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
};

export default Homepage;
