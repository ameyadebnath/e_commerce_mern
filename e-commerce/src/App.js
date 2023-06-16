import "./App.css";
import React, { useState } from "react";
import Homepage from "./components/homepage/homepage";
import Cart from "./components/homepage/Cart";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    console.log(cartItems);
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
        <Route path="/login" element={<Login mUser={user} setMUser={setUser} handleCartClearance={handleCartClearance}/>} />
        <Route path="/register" element={<Register />} />
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
