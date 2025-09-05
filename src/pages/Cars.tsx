
import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FeaturedCars from '@/components/Home/FeaturedCars';

const Cars = () => {
  const [searchin, setsearchin] = useState("")
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-4xl mb-4 text-automotive-primary">
            Browse Cars
          </h1>
          <p className="text-lg text-gray-600">
            Discover your perfect vehicle from our extensive inventory
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Search by 
                  make, model, or keyword..."
                  className="pl-10 h-12"
                  value={searchin}
                  onChange={(e)=> setsearchin(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="btn-steel flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
              {/* <div className="flex border rounded-lg">
                <Button variant="ghost" size="icon">
                  <Grid className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <List className="h-5 w-5" />
                </Button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Results */}
        <FeaturedCars search={searchin}/>
        {/* <div className="text-center py-16">
          <h2 className="font-display font-semibold text-2xl text-automotive-primary mb-4">
            Car Catalog Coming Soon
          </h2>
          <p className="text-gray-600 mb-8">
            Our comprehensive car browsing experience is being built. 
            Check back soon for an amazing selection of vehicles!
          </p>
          <Button className="btn-hero">
            Return to Home
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Cars;
