import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "@/router";
import React, { useEffect, useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("bazaarhub_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bazaarhub_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.Id === product.Id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.Id === product.Id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.Id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
<>
      <RouterProvider router={router} />
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;