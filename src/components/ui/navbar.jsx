// src/components/ui/navbar.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              BikeBuddy
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/bikes" className="text-gray-700 hover:text-blue-600 transition-colors">
              Bikes
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            {isSignedIn ? (
              <>
                <Link href="/bookings" className="text-gray-700 hover:text-blue-600 transition-colors">
                  My Bookings
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <SignInButton mode="modal">
                  <Button variant="ghost">Login</Button>
                </SignInButton>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center"
            aria-label="Toggle menu"
          >
            <svg
              className={cn(
                "w-6 h-6 text-gray-700 transition-transform",
                isMenuOpen && "transform rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-3 bg-white shadow-lg">
              <Link
                href="/bikes"
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Bikes
              </Link>
              <Link
                href="/how-it-works"
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              {isSignedIn ? (
                <>
                  <Link
                    href="/bookings"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <div className="py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                  </SignInButton>
                  <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};