
"use client";

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewBike() {
  const router = useRouter();
  const createBike = useMutation(api.bikes.createBike);
  
  const [bikeData, setBikeData] = useState({
    name: '',
    description: '',
    hourlyRate: 0,
    dailyRate: 0,
    bikeType: 'mountain',
    features: [],
    imageUrl: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'hourlyRate' || name === 'dailyRate') {
      setBikeData({
        ...bikeData,
        [name]: parseFloat(value) || 0
      });
    } else if (name === 'features') {
      setBikeData({
        ...bikeData,
        features: value.split(',').map(f => f.trim()).filter(Boolean)
      });
    } else {
      setBikeData({
        ...bikeData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createBike(bikeData);
      toast.success('Bike added successfully');
      router.push('/dashboard/bikes');
    } catch (error) {
      toast.error('Failed to add bike');
      console.error(error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Add New Bike
      </motion.h1>
      
      <motion.div
        className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bike Name</label>
            <input
              type="text"
              name="name"
              value={bikeData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={bikeData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
              <input
                type="number"
                name="hourlyRate"
                value={bikeData.hourlyRate}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rate ($)</label>
              <input
                type="number"
                name="dailyRate"
                value={bikeData.dailyRate}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bike Type</label>
            <select
              name="bikeType"
              value={bikeData.bikeType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="mountain">Mountain Bike</option>
              <option value="road">Road Bike</option>
              <option value="hybrid">Hybrid Bike</option>
              <option value="electric">Electric Bike</option>
              <option value="city">City Bike</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
            <input
              type="text"
              name="features"
              value={bikeData.features.join(', ')}
              onChange={handleChange}
              placeholder="e.g. Suspension, Gears, Lights"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={bikeData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/bike-image.jpg"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Link href="/dashboard/bikes">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Bike'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}