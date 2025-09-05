
import React from 'react';
import { Users, Car, Award, MapPin } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: Car,
      value: '25,000+',
      label: 'Cars Available',
      description: 'Premium vehicles in our inventory'
    },
    {
      icon: Users,
      value: '100,000+',
      label: 'Happy Customers',
      description: 'Satisfied buyers nationwide'
    },
    {
      icon: Award,
      value: '15+',
      label: 'Years Experience',
      description: 'Trusted automotive expertise'
    },
    {
      icon: MapPin,
      value: '50+',
      label: 'Locations',
      description: 'Dealerships across the country'
    }
  ];

  return (
    <section className="py-16 bg-automotive-section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white animate-fade-in">
              <div className="mb-4">
                <stat.icon className="h-12 w-12 text-automotive-accent mx-auto" />
              </div>
              <div className="font-display font-bold text-4xl mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-xl mb-1">
                {stat.label}
              </div>
              <div className="text-gray-300 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
