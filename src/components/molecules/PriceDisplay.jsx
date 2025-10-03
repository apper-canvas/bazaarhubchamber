const PriceDisplay = ({ price, originalPrice, className = "" }) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-2xl font-bold text-gray-900">
        ₹{price.toLocaleString()}
      </span>
      {originalPrice && originalPrice > price && (
        <>
          <span className="text-lg text-gray-500 line-through">
            ₹{originalPrice.toLocaleString()}
          </span>
          <span className="text-sm font-semibold text-success bg-success/10 px-2 py-1 rounded">
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  );
};

export default PriceDisplay;