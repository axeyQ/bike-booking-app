"use client";

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function BikesManagement() {
  const bikes = useQuery(api.bikes.getAllBikes) || [];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Manage Bikes
        </motion.h1>
        
        <Link href="/dashboard/bikes/new">
          <Button>
            Add New Bike
          </Button>
        </Link>
      </div>
      
      {bikes.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-500 mb-4">No bikes added yet</p>
          <Link href="/dashboard/bikes/new">
            <Button>Add Your First Bike</Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {bikes.map((bike) => (
            <motion.div key={bike._id} variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>{bike.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-2">{bike.bikeType}</p>
                  <p className="font-semibold mb-4">${bike.hourlyRate}/hr · ${bike.dailyRate}/day</p>
                  <div className="flex justify-end">
                    <Link href={`/dashboard/bikes/${bike._id}`}>
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}