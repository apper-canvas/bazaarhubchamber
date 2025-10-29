import { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import PriceRangeFilter from "@/components/molecules/PriceRangeFilter";
import Button from "@/components/atoms/Button";
import categoryService from "@/services/api/categoryService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const FilterSidebar = ({ filters, onFilterChange, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
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

const handleBrandToggle = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleColorToggle = (color) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFilterChange({ ...filters, colors: newColors });
  };

  const handleSizeToggle = (size) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleStockToggle = () => {
    onFilterChange({
      ...filters,
      inStockOnly: !filters.inStockOnly
    });
  };

const clearAllFilters = () => {
    onFilterChange({
      category: "All",
      subcategory: null,
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      brands: [],
      colors: [],
      sizes: [],
      inStockOnly: false
    });
  };

  const availableBrands = ["Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Lenovo", "Asus", "Nike", "Adidas", "Puma", "Canon", "Nikon", "Bose", "JBL"];
  const availableColors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Gray", hex: "#9CA3AF" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Red", hex: "#EF4444" },
    { name: "Green", hex: "#10B981" },
    { name: "Yellow", hex: "#F59E0B" },
    { name: "Purple", hex: "#A855F7" },
    { name: "Pink", hex: "#EC4899" }
  ];
  const availableSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

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

{/* Brand Filter */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ApperIcon name="Tag" size={18} />
            Brand
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {availableBrands.map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ApperIcon name="Palette" size={18} />
            Color
          </h3>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                className={`relative w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                  filters.colors.includes(color.name)
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {filters.colors.includes(color.name) && (
                  <ApperIcon
                    name="Check"
                    size={16}
                    className={`absolute inset-0 m-auto ${
                      color.hex === "#FFFFFF" ? "text-gray-900" : "text-white"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ApperIcon name="Ruler" size={18} />
            Size
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all hover:scale-105 ${
                  filters.sizes.includes(size)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Stock Filter */}
        <div className="pt-6 border-t border-gray-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={handleStockToggle}
              className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm font-medium text-gray-700">In Stock Only</span>
          </label>
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