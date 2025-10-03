import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ cartItems, onUpdateQuantity, onRemoveItem, onClose }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-secondary to-accent text-white">
        <div className="flex items-center gap-2">
          <ApperIcon name="ShoppingCart" size={24} />
          <h2 className="text-xl font-bold">Shopping Cart</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ApperIcon name="X" size={24} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mb-4">
                <ApperIcon name="ShoppingCart" size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Button onClick={onClose}>
                <ApperIcon name="ShoppingBag" size={20} />
                Continue Shopping
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.Id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-lg font-bold text-primary mb-2">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.Id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
                      >
                        <ApperIcon name="Minus" size={16} />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.Id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
                      >
                        <ApperIcon name="Plus" size={16} />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.Id)}
                        className="ml-auto p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                      >
                        <ApperIcon name="Trash2" size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-primary">
              ₹{calculateTotal().toLocaleString()}
            </span>
          </div>
          <Button onClick={handleCheckout} className="w-full">
            <ApperIcon name="CreditCard" size={20} />
            Proceed to Checkout
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default CartSidebar;