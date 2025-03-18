"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Card({
  className,
  animate = true,
  children,
  ...props
}) {
  const motionProps = animate ? {
    whileHover: { y: -5 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <motion.div
      className={cn(
        "rounded-xl border bg-white shadow-sm transition-all overflow-hidden",
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({
  className,
  ...props
}) {
  return (
    <div
      className={cn("flex flex-col p-6 pb-3", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}) {
  return (
    <h3
      className={cn("text-xl font-semibold", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}) {
  return (
    <div
      className={cn("p-6 pt-3", className)}
      {...props}
    />
  );
}