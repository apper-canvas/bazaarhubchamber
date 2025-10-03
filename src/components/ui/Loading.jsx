import { motion } from "framer-motion";

const Loading = ({ type = "products" }) => {
  if (type === "products") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="w-full h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse-slow" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse-slow" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-2/3 animate-pulse-slow" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-pulse-slow" />
                <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-pulse-slow" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "details") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="w-full h-96 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse-slow" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse-slow"
              />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse-slow" />
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-pulse-slow" />
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse-slow" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse-slow" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-2/3 animate-pulse-slow" />
          </div>
          <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse-slow" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
    </div>
  );
};

export default Loading;