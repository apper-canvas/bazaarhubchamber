import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CartSidebar from "@/components/organisms/CartSidebar";
import Header from "@/components/organisms/Header";

function Layout({ cartState }) {
  const {
    cartItems = [],
    showCartSidebar = false,
    setShowCartSidebar = () => {},
    handleAddToCart = () => {},
    handleUpdateQuantity = () => {},
    handleRemoveItem = () => {},
    handleClearCart = () => {}
  } = cartState || {}

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemCount={cartItems.length}
        onCartClick={() => setShowCartSidebar(true)}
      />
      
      <main className="pt-16">
        <Outlet context={{ 
          handleAddToCart,
          cartItems,
          onUpdateQuantity: handleUpdateQuantity,
          onRemoveItem: handleRemoveItem,
          onClearCart: handleClearCart
        }} />
      </main>

      <AnimatePresence>
        {showCartSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCartSidebar(false)}
              className="fixed inset-0 bg-black/50 z-40"
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
  )
}

export default Layout