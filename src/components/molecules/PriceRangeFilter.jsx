import { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";

const PriceRangeFilter = ({ minPrice, maxPrice, onPriceChange }) => {
  const [localMin, setLocalMin] = useState(minPrice || 0);
  const [localMax, setLocalMax] = useState(maxPrice || 100000);

  useEffect(() => {
    const timer = setTimeout(() => {
      onPriceChange(localMin, localMax);
    }, 500);

    return () => clearTimeout(timer);
  }, [localMin, localMax]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Min Price
        </label>
        <Input
          type="number"
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          min={0}
          placeholder="Min"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Max Price
        </label>
        <Input
          type="number"
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          min={0}
          placeholder="Max"
        />
      </div>

      <div className="pt-2 text-sm text-gray-600">
        Range: ₹{localMin.toLocaleString()} - ₹{localMax.toLocaleString()}
      </div>
    </div>
  );
};

export default PriceRangeFilter;