import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-danger/10 to-danger/5 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertCircle" size={40} className="text-danger" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="RotateCw" size={20} />
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default Error;