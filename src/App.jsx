import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/organisms/Layout";
function App() {
// Cart state management with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.Id === product.Id);
      if (existing) {
        toast.success(`Updated ${product.name} quantity in cart!`);
        return prev.map((item) =>
          item.Id === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.Id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    const item = cartItems.find((item) => item.Id === productId);
    if (item) {
      toast.info(`${item.name} removed from cart`);
    }
    setCartItems((prev) => prev.filter((item) => item.Id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    toast.success('Order placed successfully!');
  };

  const cartState = {
    cartItems,
    showCartSidebar,
    setShowCartSidebar,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart
  };

  return <Layout cartState={cartState} />;
}

export default App;