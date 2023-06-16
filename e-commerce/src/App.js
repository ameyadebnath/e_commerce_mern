import "./App.css";
import React, { useState } from "react";
import Homepage from "./components/homepage/homepage";
import Cart from "./components/homepage/Cart";
import Login from "./components/login/login";
import Login_supplier from "./components/login/login_supplier";
import Register from "./components/register/register";
import Admin from "./components/login/admin";
import Admin_page from "./components/admin_page/Admin_page";
import Bank from "./components/login/bank";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Supplier from "./components/supplier/Supplier";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const handleAddProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleCartClearance = () => {
    setCartItems([]);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              user={user}
              setUser={setUser}
              cartItems={cartItems}
              setCartItems={setCartItems}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              handleCartClearance={handleCartClearance}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/login_supplier" element={<Login_supplier />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin_page" element={<Admin_page />} />
        <Route path="/Supplier" element={<Supplier />} />
        <Route path="/bank" element={<Bank />} />
        <Route
          path="/cart"
          element={
            <Cart
              user={user}
              setUser={setUser}
              cartItems={cartItems}
              setCartItems={setCartItems}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              handleCartClearance={handleCartClearance}
            />
          }
        />
      </Routes>

      {/* <Login /> */}
    </div>
  );
}

export default App;
