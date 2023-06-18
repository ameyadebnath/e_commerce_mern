import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Supplier.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Supplier = ({
  user,
  setUser,
  cartItems,
  setCartItems,
  handleAddProduct,
  handleRemoveProduct,
  handleCartClearance,
}) => {
  const navigate = useNavigate();

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
        const response = await axios.get("http://localhost:9002/pendingOrders");
        const { success } = response.data;
        setPendingOrders(response.data.pendingOrders);
        console.log(response.data.pendingOrders);
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
        const response = await axios.get(
          "http://localhost:9004/completedOrders"
        );
        const { success } = response.data;
        setCompletedOrders(response.data.completedOrders);
        console.log(response.data.completedOrders);
        if (success) {
          //setBalance(amount);
        } else {
          toast.warning(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.warning("something went wrong2");
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
      const response = await axios.get("http://localhost:9002/pendingOrders");
      const { success } = response.data;
      setPendingOrders(response.data.pendingOrders);
      console.log(response.data.pendingOrders);
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
      const response = await axios.get("http://localhost:9004/completedOrders");
      const { success } = response.data;
      setCompletedOrders(response.data.completedOrders);
      console.log(response.data.completedOrders);
      if (success) {
        //setBalance(amount);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.warning("something went wrong2");
    }
  };

  const acceptOrder = async (id) => {
    try {
      const response = await axios.post("http://localhost:9004/completeOrder", {
        orderId: id, // Replace with the actual user bank ID
      });
      const { success } = response.data;
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
        <div className="header-links1">
          <ul>
            <li>
              <Link to="/login">logout</Link>
            </li>
          </ul>
        </div>
      </header>

      {/* balance */}
      <div className="account-balance">Current Balance: ${balance}</div>

      <h2 className="cart-items-header1">Pending Orders List</h2>
      {PendingOrders.length === 0 && (
        <div className="cart-items2">No Available Orders</div>
      )}

      {PendingOrders.map((order) => (
        <div className="cart-items1">
          {/* {cartItems.length === 0 && (
          <div className="cart-items-empty">No items are added.</div>
        )} */}

          <div>
            <div className="my1">
              <div>Date: {order.date}</div>
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
                className="status1"
                onClick={(e) => {
                  acceptOrder(order._id);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ))}

      <h2 className="cart-items-header1">Shipped Orders List</h2>
      {completedOrders.map((order) => (
        <div className="cart-items1">
          {/* {cartItems.length === 0 && (
          <div className="cart-items-empty">No items are added.</div>
        )} */}

          <div>
            <div className="my1">
              <div>Date of Order: {order.dateoforder}</div>
              <div>Date of Accepted: {order.dateofaccpted}</div>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Supplier;
