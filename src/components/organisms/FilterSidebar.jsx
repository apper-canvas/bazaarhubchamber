import React, { useEffect, useState } from "react";
import categoryService from "@/services/api/categoryService";
import productService from "@/services/api/productService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import PriceRangeFilter from "@/components/molecules/PriceRangeFilter";
import CategoryFilter from "@/components/molecules/CategoryFilter";

const FilterSidebar = ({ filters, onFilterChange, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);

  useEffect(() => {
    loadCategories();
    loadFilterOptions();
  }, []);

const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadFilterOptions = async () => {
    try {
      const products = await productService.getAll();
      
      // Extract unique brands
      const brands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
      setAvailableBrands(brands);

      // Extract unique colors
      const colors = [...new Set(products.map(p => p.color).filter(Boolean))].sort();
      setAvailableColors(colors);

      // Extract unique sizes
      const sizes = [...new Set(products.map(p => p.size).filter(Boolean))].sort((a, b) => {
        // Sort numeric sizes numerically, non-numeric alphabetically
        const aNum = parseInt(a);
        const bNum = parseInt(b);
        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
        return a.localeCompare(b);
      });
      setAvailableSizes(sizes);
    } catch (err) {
      console.error("Failed to load filter options:", err);
    }
  };

  const handleCategoryChange = (category, subcategory = null) => {
    onFilterChange({
      ...filters,
      category,
      subcategory
    });
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    onFilterChange({
      ...filters,
      minPrice,
      maxPrice
    });
  };
const handleRatingChange = (minRating) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === minRating ? undefined : minRating
    });
  };

  const handleStockToggle = () => {
    onFilterChange({
      ...filters,
      inStockOnly: !filters.inStockOnly
    });
  };

  const handleBrandToggle = (brand) => {
    const currentBrands = filters.brands || [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter(b => b !== brand)
      : [...currentBrands, brand];
    
    onFilterChange({
      ...filters,
      brands: newBrands
    });
  };

  const handleColorToggle = (color) => {
    const currentColors = filters.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    
    onFilterChange({
      ...filters,
      colors: newColors
    });
  };

  const handleSizeToggle = (size) => {
    const currentSizes = filters.sizes || [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];
    
    onFilterChange({
      ...filters,
      sizes: newSizes
    });
  };

  const getColorClass = (color) => {
    const colorMap = {
      Black: 'bg-black',
      White: 'bg-white border-2 border-gray-300',
      Silver: 'bg-gray-300',
      Blue: 'bg-blue-500',
      Gray: 'bg-gray-500',
      Brown: 'bg-amber-700',
      Red: 'bg-red-500',
      Purple: 'bg-purple-500',
      Green: 'bg-green-500',
      Yellow: 'bg-yellow-400'
    };
    return colorMap[color] || 'bg-gray-400';
  };

const clearAllFilters = () => {
    onFilterChange({
      category: "All",
      subcategory: null,
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      inStockOnly: false,
      brands: [],
      colors: [],
      sizes: []
    });
  };

  if (loading) {
    return (
      <div className="p-4">
        <Loading type="default" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Error message={error} onRetry={loadCategories} />
      </div>
    );
  }

return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-2">
          <ApperIcon name="SlidersHorizontal" size={20} className="text-primary" />
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        )}
      </div>

      {/* Filter Content */}
      <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
{/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
          <CategoryFilter
            categories={categories}
            selectedCategory={filters.category}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Brand Filter */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Brand {filters.brands?.length > 0 && `(${filters.brands.length})`}
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableBrands.map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={filters.brands?.includes(brand) || false}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Color {filters.colors?.length > 0 && `(${filters.colors.length})`}
          </h3>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((color) => {
              const isSelected = filters.colors?.includes(color) || false;
              return (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`relative group`}
                  title={color}
                >
                  <div className={`w-10 h-10 rounded-full ${getColorClass(color)} transition-all duration-200 ${
                    isSelected ? 'ring-4 ring-primary ring-offset-2' : 'hover:scale-110'
                  }`}>
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ApperIcon name="Check" size={20} className={color === 'White' ? 'text-gray-700' : 'text-white'} />
                      </div>
                    )}
                  </div>
                  <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {color}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Filter */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Size {filters.sizes?.length > 0 && `(${filters.sizes.length})`}
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const isSelected = filters.sizes?.includes(size) || false;
              return (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-primary to-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
          <PriceRangeFilter
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onPriceChange={handlePriceChange}
          />
        </div>

        {/* Rating Filter */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                  filters.minRating === rating
                    ? "bg-gradient-to-r from-primary to-orange-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <ApperIcon name="Star" size={16} className={filters.minRating === rating ? "fill-white" : "fill-primary text-primary"} />
                <span>{rating}+ Stars</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stock Filter */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Stock Availability</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={handleStockToggle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ml-3 text-sm text-gray-700">In Stock Only</span>
            </label>
          </div>
        </div>
        {/* Clear Filters */}
        <div className="pt-6 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="w-full"
          >
            <ApperIcon name="X" size={18} />
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;