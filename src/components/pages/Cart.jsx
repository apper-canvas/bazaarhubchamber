import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";

const Cart = ({ cartItems = [], onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();

  // Validate cartItems prop
  const safeCartItems = cartItems || [];

  const calculateSubtotal = () => {
    return safeCartItems.reduce((total, item) => {
      return total + ((item?.price || 0) * (item?.quantity || 0));
    }, 0);
  };

const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return Math.round((subtotal || 0) * 0.18);
  };

  const calculateTotal = () => {
    return (calculateSubtotal() || 0) + (calculateTax() || 0);
  };

if (safeCartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Empty
          message="Your cart is empty"
          description="Start adding products to your cart to see them here"
          actionLabel="Start Shopping"
          onAction={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
<div className="lg:col-span-2 space-y-4">
          {safeCartItems.map((item) => (
            <motion.div
              key={item?.Id || Math.random()}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex gap-6">
                <img
                  src={item?.images?.[0] || '/placeholder.png'}
                  alt={item?.title || 'Product'}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
<div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{item?.brand || 'Unknown Brand'}</p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item?.title || 'Product'}
                      </h3>
                    </div>
                    <button
                      onClick={() => onRemoveItem?.(item?.Id)}
                      className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Trash2" size={20} />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-primary mb-4">
                    ₹{(item?.price || 0).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center gap-2">
<button
                        onClick={() => onUpdateQuantity?.(item?.Id, Math.max(1, (item?.quantity || 1) - 1))}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <ApperIcon name="Minus" size={18} />
                      </button>
                      <span className="text-lg font-semibold w-12 text-center">
                        {item?.quantity || 0}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity?.(item?.Id, (item?.quantity || 0) + 1)}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <ApperIcon name="Plus" size={18} />
                      </button>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                      <p className="text-xl font-bold text-gray-900">
                        ₹{((item?.price || 0) * (item?.quantity || 0)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ₹{calculateSubtotal().toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-semibold text-gray-900">
                  ₹{calculateTax().toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-success">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate("/checkout")}
              className="w-full mb-4"
              size="lg"
            >
              <ApperIcon name="CreditCard" size={20} />
              Proceed to Checkout
            </Button>

            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="w-full"
            >
              <ApperIcon name="ArrowLeft" size={20} />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;