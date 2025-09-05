
import React, { useState } from 'react';
import { Star, Heart, Eye, Calendar, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
// import { carsData } from '@/data/carsData';
import axios from 'axios'
const FeaturedCars = ({search}) => {
  const navigate = useNavigate();
  // const featuredCars = carsData;
  const [cars, setcars]= useState([]);
  const [loading, setloading] = useState(false)
React.useEffect(()=>{

  const fetchcars = async ()=>{
  try{
    setloading(true)
 const res = await axios.get("https://carbackend-1g9v.onrender.com/cars");
  setcars(res.data.cars);

  }catch(error){
  console.log('====================================');
  console.log(error);
  console.log('====================================');
  
  }finally{
    setloading(false)
  }

  }
  fetchcars();
},[])
const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl mb-4 text-automotive-primary">
            Featured Vehicles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked premium vehicles from our exclusive collection. 
            Each car is thoroughly inspected and comes with our quality guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && (
  <p className="text-lg text-gray-600 text-center">Loading cars...</p>
)}

{!loading && cars.length === 0 && (
  <p className="text-lg text-gray-600 text-center">No cars available.</p>
)}

 {(showAll ? cars : cars.slice(0, 3))
.filter(item => 
  search ? item.title.toLowerCase().includes(search.toLowerCase()) : true
)

 .map((car, idx) => (
            <Card key={car._id} className="card-hover border-0 shadow-lg bg-white">
              <div className="relative">
                <img
                  src={car.img1 || "/placeholder-car.jpg"}
                  alt={car.title || "Car"}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-automotive-accent text-white">
                    {car.model || "Unknown"}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-lg text-automotive-primary">
                    {car.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{car.rating || (Math.floor(Math.random() * 5) + 10)}</span>
                    <span className="text-xs text-gray-500">({car.reviews || (Math.floor(Math.random() * 7) + 1)})</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{car.year || "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* <Gauge className="h-4 w-4" /> */}
                    {/* <span>{car.mileage ? car.mileage.toLocaleString() : "N/A"} mi</span> */}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{car.description.slice(0,12) || "Unknown"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-display font-bold text-2xl text-automotive-primary">
                        {car.price ? `$${car.price.toLocaleString()}` : "Contact"}
                      </span>
                      {car.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          £{car.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">Cost: ${car.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    className="btn-premium flex-1"
                    onClick={() => navigate(`/cars/${car._id}`)}
                  >
                    View Details
                  </Button>
                
                </div>
              </CardContent>
            </Card>
          ))}

        </div>

      <div className="text-center mt-12">
  <Button 
    className="btn-hero" 
    onClick={() => setShowAll(!showAll)}
  >
    {showAll ? "Show Less" : "View All Featured Cars"}
  </Button>
</div>

      </div>
    </section>
  );
};

export default FeaturedCars;
