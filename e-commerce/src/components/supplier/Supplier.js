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
  const [completedOrders, setCompletedOrders] = useState([{ orderedItems: [] }]);

  useEffect(() => {
    // Function to fetch the user's account balance
    const fetchAccountBalance = async () => {
      try {
        const response = await axios.post(
          "http://localhost:9003/getUserAmount"
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
        const response = await axios.get(
          "http://localhost:9002/pendingOrders"
        );
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
        const response = await axios.post(
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
