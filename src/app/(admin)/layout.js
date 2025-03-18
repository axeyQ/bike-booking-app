"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavLink } from "@/components/ui/nav-links";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/dashboard" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Bike Admin
          </Link>
          <div className="flex items-center gap-6">
            <nav>
              <ul className="flex space-x-1">
                <li><NavLink href="/dashboard">Dashboard</NavLink></li>
                <li><NavLink href="/dashboard/bikes">Bikes</NavLink></li>
                <li><NavLink href="/dashboard/bookings">Bookings</NavLink></li>
              </ul>
            </nav>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <motion.main 
        className="flex-grow container mx-auto px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Bike Booking Admin
        </div>
      </footer>
    </div>
  );
}