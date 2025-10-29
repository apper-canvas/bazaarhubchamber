import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/organisms/Header";
import CartSidebar from "@/components/organisms/CartSidebar";
import { toast } from "react-toastify";

function Layout() {
  // Cart state management
  const [cartItems, setCartItems] = useState([]);
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.Id === product.Id);
      
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity in cart`, {
          icon: "🛒",
        });
        return prevItems.map((item) =>
          item.Id === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`Added ${product.name} to cart`, {
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
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onMenuClick={() => setShowCartSidebar(true)}
      />

      <Outlet context={{ cartItems, onAddToCart: handleAddToCart, onUpdateQuantity: handleUpdateQuantity, onRemoveItem: handleRemoveItem, onClearCart: handleClearCart }} />

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