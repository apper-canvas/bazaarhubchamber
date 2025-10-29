import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
// Cart management logic exported for Layout component

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

// Cart management logic now used by Layout component
  return {
    cartItems,
    showCartSidebar,
    setShowCartSidebar,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart
  };
}

export default App;