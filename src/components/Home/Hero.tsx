
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="relative bg-automotive-section min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="animate-slide-up">
          <h1 className="font-display font-bold text-5xl md:text-7xl mb-6 leading-tight">
            Find Your
            <span className="text-gradient block mt-2">Dream Car</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto">
            Discover thousands of premium vehicles from trusted dealers nationwide. 
            Your perfect ride is just a click away.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Make</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white">
                  <option>Any Make</option>
                  <option>BMW</option>
                  <option>Mercedes-Benz</option>
                  <option>Audi</option>
                  <option>Toyota</option>
                  <option>Honda</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Model</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white">
                  <option>Any Model</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price Range</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white">
                  <option>Any Price</option>
                  <option>Under £10,000</option>
                  <option>£20,000 - £40,000</option>
                  <option>£40,000 - £60,000</option>
                  <option>Over £60,000</option>
                </select>
              </div>
              
              <Button className="btn-hero w-full h-12 flex items-center justify-center" onClick={() => (window.location.href = "/cars")}>
                <Search className="h-5 w-5 mr-2" />
                Search Cars
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="btn-premium" onClick={() => (window.location.href = "/cars")}>
              Browse All Cars
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/cars")} className="border-white text-white hover:bg-white hover:text-automotive-primary">
             Search Cars
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white" />
      </div>
    </section>
  );
};

export default Hero;
