import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = ({
  user,
  setUser,
  cartItems,
  setCartItems,
  handleAddProduct,
  handleRemoveProduct,
  handleCartClearance,
}) => {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    // Function to fetch the user's account balance
    const fetchAccountBalance = async () => {
      try {
        const response = await axios.post(
          "http://localhost:9003/getUserAmount",
          {
            bankId: user.bankid, // Replace with the actual user bank ID
          }
        );
        const { amount, success } = response.data;
        if (success) {
          setBalance(amount);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccountBalance(); // Call the function when the component mounts

    // Cleanup function
    return () => {
      // Any cleanup logic if needed
    };
  }, []);

  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  var makeOrderRequest = () => {
    console.log(cartItems);
    console.log(user._id);
    axios
      .post("http://localhost:9002/placeOrder", {
        orders: cartItems,
        userId: user._id,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success === 1) toast.success(response.data.message);
        else toast.warning(response.data.message);
        // Process the response data
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });
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
      <div className="account-balance">Current Balance: ${balance}</div>

      <div className="cart-items">
        <h2 className="cart-items-header">Cart Items</h2>
        <div className="clear-cart">
          {cartItems.length >= 1 && (
            <button className="clear-cart-button" onClick={handleCartClearance}>
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 && (
          <div className="cart-items-empty">No items are added.</div>
        )}

        <div>
          {cartItems.map((item) => (
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
          ))}
        </div>

        <div className="cart-items-total-price-name">
          Total price
          <div className="cart-items-total-price ">${totalPrice}</div>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <button className="submit" onClick={makeOrderRequest}>
          {" "}
          Auto-Pay{" "}
        </button>
      </div>
    </div>
  );
};

export default Cart;
