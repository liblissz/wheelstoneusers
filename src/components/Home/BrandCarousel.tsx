
import React from 'react';

const BrandCarousel = () => {
  const brands = [
    { name: 'BMW', logo: 'https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png' },
    { name: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Mercedes_Benz_Logo_11.jpg/1200px-Mercedes_Benz_Logo_11.jpg' },
    { name: 'Audi', logo: 'https://di-uploads-pod3.dealerinspire.com/vindeversautohausofsylvania/uploads/2018/10/Audi-Logo-Banner.png' },
    { name: 'Porsche', logo: 'https://static.cdnlogo.com/logos/p/63/porsche.svg' },
    { name: 'Tesla', logo: 'https://static.cdnlogo.com/logos/t/25/tesla.svg' },
    { name: 'Toyota', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Toyota-Logo.png' },
    { name: 'Honda', logo: 'https://static.cdnlogo.com/logos/h/89/honda.svg' },
    { name: 'Lexus', logo: 'https://static.cdnlogo.com/logos/l/44/lexus.svg' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl mb-4 text-automotive-primary">
            Premium Brands
          </h2>
          <p className="text-lg text-gray-600">
            Discover vehicles from the world's most trusted automotive brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center p-4 group-hover:bg-automotive-accent/10 transition-colors duration-300">
                <img 
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <span className="mt-3 text-sm font-medium text-gray-600 group-hover:text-automotive-primary transition-colors duration-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
