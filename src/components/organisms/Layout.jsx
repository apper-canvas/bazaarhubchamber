import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import CartSidebar from "@/components/organisms/CartSidebar";
import Header from "@/components/organisms/Header";

export const CartContext = createContext(null)

function Layout() {
  const [cartItems, setCartItems] = useState([])
  const [showCartSidebar, setShowCartSidebar] = useState(false);

const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.Id === product.Id);
      
      if (existingItem) {
        toast.success(`Updated ${product.title} quantity in cart`, {
          icon: "🛒",
        });
        return prevItems.map((item) =>
          item.Id === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`Added ${product.title} to cart`, {
          icon: "🛒",
        });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.Id !== productId));
    toast.info("Item removed from cart");
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart: handleAddToCart,
      updateQuantity: handleUpdateQuantity,
      removeItem: handleRemoveItem,
      clearCart: handleClearCart
    }}>
      <div className="min-h-screen bg-gray-50">
        <Header
          cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
          onMenuClick={() => setShowCartSidebar(true)}
        />

        <Outlet />

        <AnimatePresence>
          {showCartSidebar && (
            <CartSidebar
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClose={() => setShowCartSidebar(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
}

export default Layout;