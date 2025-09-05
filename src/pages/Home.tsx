
import React from 'react';
import Hero from '@/components/Home/Hero';
import FeaturedCars from '@/components/Home/FeaturedCars';
import BrandCarousel from '@/components/Home/BrandCarousel';
import Stats from '@/components/Home/Stats';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <FeaturedCars />
      <BrandCarousel />
    </div>
  );
};

export default Home;
