import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  message = "No items found", 
  description = "Try adjusting your search or filters",
  actionLabel = "Browse All Products",
  onAction 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="Package" size={48} className="text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="ShoppingBag" size={20} />
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default Empty;