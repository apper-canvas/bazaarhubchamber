import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const buttonVariants = {
  primary: "bg-gradient-to-r from-primary to-orange-600 text-white hover:shadow-lg",
  secondary: "border-2 border-primary text-primary hover:bg-primary/5",
  ghost: "text-gray-700 hover:bg-gray-100",
  danger: "bg-gradient-to-r from-danger to-red-700 text-white hover:shadow-lg"
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg"
};

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  disabled,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;