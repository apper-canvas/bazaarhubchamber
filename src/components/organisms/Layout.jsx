import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CartSidebar from "@/components/organisms/CartSidebar";
import Header from "@/components/organisms/Header";

function Layout() {
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
    setCartItems((prevItems) => 
      prevItems.filter((item) => item.Id !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onMenuClick={() => setShowCartSidebar(true)}
      />

      {/* 🎯 Pass context to child routes here */}
      <Outlet
        context={{
          cartItems,
          onAddToCart: handleAddToCart,
          onUpdateQuantity: handleUpdateQuantity,
          onRemoveItem: handleRemoveItem,
          onClearCart: handleClearCart,
        }}
      />

      <AnimatePresence>
        {showCartSidebar && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowCartSidebar(false)}
            />
            <CartSidebar
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClose={() => setShowCartSidebar(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Layout;