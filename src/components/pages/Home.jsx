import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import productService from "@/services/api/productService";
import ProductCard from "@/components/organisms/ProductCard";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Home = ({ onAddToCart }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    subcategory: null,
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
    inStockOnly: false
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      searchProducts(searchQuery);
    } else {
      applyFilters();
    }
  }, [products, filters, searchParams]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.searchProducts(query);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      const filtered = await productService.filterProducts(filters);
      setFilteredProducts(filtered);
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading type="products" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Error message={error} onRetry={loadProducts} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {searchParams.get("search") 
            ? `Search Results for "${searchParams.get("search")}"`
            : filters.category === "All" 
              ? "All Products" 
              : filters.category}
        </h1>
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          <ApperIcon name="SlidersHorizontal" size={20} />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
        </aside>

        {/* Mobile Filters */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileFilters(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
              >
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  onClose={() => setShowMobileFilters(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <Empty
              message="No products found"
              description="Try adjusting your filters or search criteria"
              actionLabel="Clear Filters"
              onAction={() => setFilters({
                category: "All",
                subcategory: null,
                minPrice: undefined,
                maxPrice: undefined,
                minRating: undefined,
                inStockOnly: false
              })}
            />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.Id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;