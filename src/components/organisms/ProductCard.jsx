import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import RatingStars from "@/components/molecules/RatingStars";
import PriceDisplay from "@/components/molecules/PriceDisplay";

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link to={`/product/${product.Id}`}>
        <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {product.originalPrice > product.price && (
              <Badge variant="danger" className="absolute top-3 right-3">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="default" className="text-white bg-black/70">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
              <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
            </div>

            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

            <PriceDisplay price={product.price} originalPrice={product.originalPrice} />

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full"
            >
              <ApperIcon name="ShoppingCart" size={18} />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;