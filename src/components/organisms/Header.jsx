import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import { motion } from "framer-motion";

const Header = ({ cartItemCount = 0, onMenuClick }) => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-secondary to-accent shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <ApperIcon name="Menu" size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="ShoppingBag" size={24} />
            </div>
            <span className="text-2xl font-bold hidden sm:block">BazaarHub</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ApperIcon name="ShoppingCart" size={24} />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-orange-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
};

export default Header;