import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { motion } from "framer-motion";

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1 max-w-2xl">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pr-12"
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-primary to-orange-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
      >
        <ApperIcon name="Search" size={20} />
      </motion.button>
    </form>
  );
};

export default SearchBar;