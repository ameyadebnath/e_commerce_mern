import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Cart.css";
import "./Current_order.css";
import "./Delivered_order";

const Shipped_order = ({
  user,
  setUser,
  cartItems,
  setCartItems,
  handleAddProduct,
  handleRemoveProduct,
  handleCartClearance,
}) => {
  const [balance, setBalance] = useState("");
  const [PendingOrders, setPendingOrders] = useState([{ orderedItems: [] }]);
  const [completedOrders, setCompletedOrders] = useState([
    { orderedItems: [] },
  ]);

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
        } else {
          toast.warning(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.warning("something went wrong");
      }
    };

    const fetchPendingOrders = async () => {
      try {
        const response = await axios.post(
          "http://localhost:9004/getOnDeliveryOrdersByUserId",
          {
            userId: user._id, // Replace with the actual user bank ID
          }
        );
        const { success } = response.data;
        setPendingOrders(response.data.onDeliveryOrders);
        console.log(response.data.onDeliveryOrders);
        if (success) {
          //setBalance(amount);
        } else {
          toast.warning(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.warning("something went wrong");
      }
    };

    const fetchCompletedOrders = async () => {
      try {
        const response = await axios.post(
          "http://localhost:9004/getOnDeliveryOrdersByUserId",
          {
            userId: user._id, // Replace with the actual user bank ID
          }
        );
        const { success } = response.data;
        setCompletedOrders(response.data.onDeliveryOrders);
        console.log(response.data.onDeliveryOrders);
        if (success) {
          //setBalance(amount);
        } else {
          toast.warning(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.warning("something went wrong");
      }
    };

    fetchAccountBalance(); // Call the function when the component mounts
    fetchPendingOrders();
    fetchCompletedOrders();

    // Cleanup function
    return () => {
      // Any cleanup logic if needed
    };
  }, []);

  // Function to fetch the user's account balance
  const fetchAccountBalance = async () => {
    try {
      const response = await axios.post("http://localhost:9003/getUserAmount", {
        bankId: user.bankid, // Replace with the actual user bank ID
      });
      const { amount, success } = response.data;
      if (success) {
        setBalance(amount);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.warning("something went wrong");
    }
  };

  const fetchPendingOrders = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9004/getOnDeliveryOrdersByUserId",
        {
          userId: user._id, // Replace with the actual user bank ID
        }
      );
      const { success } = response.data;
      setCompletedOrders(response.data.onDeliveryOrders);
      console.log(response.data.onDeliveryOrders);
      if (success) {
        //setBalance(amount);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.warning("something went wrong");
    }
  };

  const fetchCompletedOrders = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9004/getOnDeliveryOrdersByUserId",
        {
          userId: user._id, // Replace with the actual user bank ID
        }
      );
      const { success } = response.data;
      setCompletedOrders(response.data.onDeliveryOrders);
      console.log(response.data.onDeliveryOrders);
      if (success) {
        //setBalance(amount);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.warning("something went wrong");
    }
  };

  const acceptOrder = async (orderId) => {
    try {
      const response = await axios.post(
        "http://localhost:9004/completeOrder",
        { orderId: orderId }
      );
      const { success } = response.data;
      console.log(response.data);
      if (success) {
        //setBalance(amount);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.warning("something went wrong");
    }
    fetchAccountBalance(); // Call the function when the component mounts
    fetchPendingOrders();
    fetchCompletedOrders();
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
              <Link to="/shipped_order">Shipped_order</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/delivered_order">Delivered_order</Link>
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
      <div className="container">
        <div className="column">
          <h2 className="cart-items-header1">Shipped_order</h2>
          {completedOrders.map((order) => (
            <div className="cart-items1">
              {/* {cartItems.length === 0 && (
          <div className="cart-items-empty">No items are added.</div>
        )} */}

              <div>
                <div className="my1">
                  <div>Date of Order: {order.dateoforder}</div>
                  <div>Order Packaging Date: {order.dateofaccpted}</div>
                  <div>Transaction_ID: {order._id}</div>
                </div>
                {order.orderedItems.map((item) => (
                  <div>
                    <div key={item.id} className="cart-items-list1">
                      <img
                        className="cart-items-image"
                        src={item.image}
                        alt={item.title}
                      />
                      <div className="cart-items-name">{item.title}</div>

                      <div className="cart-items-price">
                        {item.quantity} * ${item.price}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="price">
                  <div>Total Price: ${order.totalPrice}</div>
                </div>
                <div>
                  <button
                    className="status4"
                    onClick={(e) => {
                      acceptOrder(order._id);
                    }}
                  >
                    Receive Order & confirm auto-pay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shipped_order;
