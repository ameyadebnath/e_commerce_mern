import React, { useState } from "react";
import "./Products.css";

const Products = ({
  user,
  setUser,
  cartItems,
  setCartItems,
  handleAddProduct,
}) => {
  const productItems = [
    {
      id: 1,
      image: "images/iphone14.webp",
      title: "iPhone 14",
      price: "1099",
    },
    {
      id: 2,
      image: "images/ipad_pro.jpg",
      title: "iPad",
      price: "599",
    },

    {
      id: 3,
      image: "images/Macbook14_pro.jpg",
      title: "Macbook",
      price: "1699",
    },
    {
      id: 4,
      image: "images/iphone13mini.jpg",
      title: "iPhone 13 Mini",
      price: "699",
    },
    {
      id: 5,
      image: "images/AirPods-Pro.jpg",
      title: "AirPods Pro",
      price: "299",
    },

    {
      id: 6,
      image: "images/Apple_watch_SE.jpeg",
      title: "Apple Watch SE",
      price: "399",
    },
    {
      id: 7,
      image: "images/HomePod-Second-Generation.jpg",
      title: "HomePod Second Generation",
      price: "399",
    },
  ];

  return (
    <div className="products">
      {productItems.map((productItem) => (
        <div className="card">
          <div>
            <img
              className="product-image"
              src={productItem.image}
              alt={productItem.title}
            />
          </div>

          <div>
            <h3 className="product-name">{productItem.title}</h3>
          </div>

          <div className="product-price">${productItem.price}</div>

          <div>
            <button
              className="product-add-button"
              onClick={() => handleAddProduct(productItem)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
