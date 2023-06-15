import "./App.css";
import React from "react";
import Homepage from "./components/homepage/homepage";
import Cart from "./components/homepage/Cart";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* <Login /> */}
    </div>
  );
}

export default App;
