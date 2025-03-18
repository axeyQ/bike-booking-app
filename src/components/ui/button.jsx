"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600",
        outline: "border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-50",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-blue-50 hover:text-blue-500",
        link: "text-blue-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({ 
  className, 
  variant, 
  size, 
  asChild = false,
  animate = true,
  ...props 
}) {
  const Comp = asChild ? motion.button : motion.button;
  
  const motionProps = animate ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...motionProps}
      {...props}
    />
  );
}