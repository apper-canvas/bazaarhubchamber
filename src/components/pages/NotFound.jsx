import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="text-xl text-gray-600">Page Not Found</p>
          <p className="text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <ApperIcon name="Home" size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;