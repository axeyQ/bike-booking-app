"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function NavLink({ href, className, children, ...props }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "text-blue-600" 
          : "text-gray-700 hover:text-blue-600",
        className
      )}
      {...props}
    >
      {children}
      {isActive && (
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600"
          layoutId="navbar-indicator"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
}