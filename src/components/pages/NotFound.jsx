import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="inline-block mb-8"
        >
          <ApperIcon 
            name="PackageSearch" 
            size={120} 
            className="text-primary opacity-80"
          />
        </motion.div>

        <h1 className="text-6xl font-bold text-secondary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-accent mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back to shopping!
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
          >
            <ApperIcon name="Home" size={20} />
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;