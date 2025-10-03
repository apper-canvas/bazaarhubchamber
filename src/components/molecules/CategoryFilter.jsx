import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import { motion, AnimatePresence } from "framer-motion";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const toggleCategory = (categoryName) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => onCategoryChange("All")}
        className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
          selectedCategory === "All"
            ? "bg-gradient-to-r from-primary to-orange-600 text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        All Categories
      </button>
      
      {categories.map((category) => (
        <div key={category.Id}>
          <button
            onClick={() => {
              onCategoryChange(category.name);
              if (category.subcategories.length > 0) {
                toggleCategory(category.name);
              }
            }}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between ${
              selectedCategory === category.name
                ? "bg-gradient-to-r from-primary to-orange-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <span className="flex items-center gap-2">
              <span>{category.name}</span>
              <span className="text-xs opacity-70">({category.productCount})</span>
            </span>
            {category.subcategories.length > 0 && (
              <ApperIcon
                name={expandedCategories.has(category.name) ? "ChevronUp" : "ChevronDown"}
                size={16}
              />
            )}
          </button>
          
          <AnimatePresence>
            {expandedCategories.has(category.name) && category.subcategories.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden ml-4 mt-1 space-y-1"
              >
                {category.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => onCategoryChange(category.name, sub)}
                    className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                  >
                    {sub}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;