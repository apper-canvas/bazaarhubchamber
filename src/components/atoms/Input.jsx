import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text", 
  className,
  error,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors duration-200",
        error && "border-danger focus:border-danger",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;