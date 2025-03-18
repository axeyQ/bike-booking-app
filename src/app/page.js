"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-gray-100">
      <motion.div 
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Book Your Perfect Ride
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Find and book the perfect bike for your next adventure.
          Browse our selection of bikes and book with just a few clicks.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <Link href="/bikes">
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
            >
              Browse Bikes
            </Button>
          </Link>
          
          <Link href="/sign-in">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
            >
              Login
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}