import ApperIcon from "@/components/ApperIcon";

const RatingStars = ({ rating, reviewCount, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <ApperIcon key={index} name="Star" size={size} className="text-primary fill-primary" />;
          } else if (index === fullStars && hasHalfStar) {
            return <ApperIcon key={index} name="StarHalf" size={size} className="text-primary fill-primary" />;
          } else {
            return <ApperIcon key={index} name="Star" size={size} className="text-gray-300" />;
          }
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-600">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
};

export default RatingStars;