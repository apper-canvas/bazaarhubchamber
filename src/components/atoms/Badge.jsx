import { cn } from "@/utils/cn";

const badgeVariants = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-danger/10 text-danger border-danger/20",
  info: "bg-info/10 text-info border-info/20",
  default: "bg-gray-100 text-gray-700 border-gray-200"
};

const Badge = ({ children, variant = "default", className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;