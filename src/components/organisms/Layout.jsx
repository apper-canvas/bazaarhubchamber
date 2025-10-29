import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import CartSidebar from "@/components/organisms/CartSidebar";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

function Layout() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
    localStorage.removeItem("cartItems");
    toast.success("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onMenuClick={() => setShowCartSidebar(true)}
      />

      <Outlet context={{ 
        cartItems, 
        onAddToCart: handleAddToCart,
        onUpdateQuantity: handleUpdateQuantity,
        onRemoveItem: handleRemoveItem,
        onClearCart: handleClearCart
      }} />

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
    </div>
  );
}

export default Layout;