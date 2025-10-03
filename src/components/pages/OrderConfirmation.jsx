import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { format } from "date-fns";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-success to-green-700 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <ApperIcon name="CheckCircle" size={48} className="text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-6 mb-8 text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Order ID</span>
                <span className="text-lg font-bold text-primary">{orderData.orderId}</span>
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Order Date</span>
                <span className="font-semibold text-gray-900">
                  {format(new Date(orderData.orderDate), "PPP")}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{orderData.orderTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-info/10 to-blue-50 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <ApperIcon name="Info" size={20} className="text-info flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Order Tracking Information
                </p>
                <p className="text-sm text-gray-600">
                  You will receive an email with tracking details once your order is shipped.
                  Expected delivery in 3-5 business days.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate("/")}
              variant="secondary"
              className="flex-1"
            >
              <ApperIcon name="ShoppingBag" size={20} />
              Continue Shopping
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="flex-1"
            >
              <ApperIcon name="Home" size={20} />
              Back to Home
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;