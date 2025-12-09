import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gradient";
  size?: "sm" | "md" | "lg";
}

const baseStyles = `
  font-semibold 
  rounded-xl 
  transition-all 
  duration-300 
  active:scale-95 
  flex items-center justify-center
`;

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-black shadow-md",
  gradient:
    "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer hover:scale-105 ${clsx(baseStyles, variants[variant], sizes[size], className)}`}
      {...props}
    />
  );
}

