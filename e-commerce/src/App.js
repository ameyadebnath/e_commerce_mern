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
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems}/>} />
      </Routes>

      {/* <Login /> */}
    </div>
  );
}

export default App;
