// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Star, Heart, Share, Calendar, Gauge, Fuel, Settings, Car as CarIcon, MapPin, Shield, ArrowLeft, ShoppingCart } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { useCartStore } from '@/store/cartStore';
// // import { carsData } from '@/data/carsData';
// import { useToast } from '@/hooks/use-toast';
// import axios from "axios"
// const CarDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCartStore();
//   const { toast } = useToast();
  
//   // const car = carsData.find(c => c.id === parseInt(id || '0'));
//  const [car, setcarad] = useState([])
//  const [loading, setloading] = useState(false)
//    useEffect(()=>{
//     const fetchcar = async ()=>{
//       try{
//         setloading(true)
//  const carac = await axios.get(`https://carbackend-1g9v.onrender.com/cars/cart/${id}`)
//     setcarad(carac.data?.finduser)
//       }catch(err){
//         console.log(err);
//       }finally{
//         setloading(false)
//       }
   
//     }
//     fetchcar()
//    },[id])

  
//   if (!car) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-foreground mb-4">Car Not Found</h1>
//           <Button onClick={() => navigate('/cars')} variant="outline">
//             Back to Catalog
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     addToCart(car);
//     toast({
//       title: "Added to Cart",
//       description: `${car?.title} has been added to your cart.`,
//     });
//   };

//   const specs = [
//     { label: "Year", value: car.year.toString(), icon: Calendar },
//     { label: "Mileage", value: `${car.mileage.toLocaleString()} mi`, icon: Gauge },
//     { label: "Fuel Type", value: car.fuel, icon: Fuel },
//     { label: "Transmission", value: car.transmission, icon: Settings },
//     { label: "Body Type", value: car.bodyType, icon: CarIcon },
//     { label: "Drivetrain", value: car.drivetrain, icon: Settings },
//     { label: "Engine", value: car.engine, icon: Settings },
//     { label: "Doors", value: car.doors.toString(), icon: CarIcon },
//     { label: "Seats", value: car.seats.toString(), icon: CarIcon },
//     { label: "Color", value: car.color, icon: CarIcon }
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-8">
//         {/* Back Button */}
//         <Button 
//           variant="ghost" 
//           onClick={() => navigate(-1)}
//           className="mb-6 text-muted-foreground hover:text-foreground"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back
//         </Button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Image Gallery */}
//           <div className="space-y-4">
//             <div className="relative">
//               <img 
//                 src={car.img1 || "null"}
//                 alt={car.title || "unknown"}
//                 className="w-full h-96 object-cover rounded-lg shadow-lg"
//               />
//               <div className="absolute top-4 left-4">
//                 <Badge className={`${
//                   car.badge === 'Premium' ? 'bg-automotive-accent text-white' :
//                   car.badge === 'Electric' ? 'bg-green-500 text-white' :
//                   'bg-automotive-premium text-automotive-dark'
//                 }`}>
//                   {car.badge}
//                 </Badge>
//               </div>
//               <div className="absolute top-4 right-4 flex space-x-2">
//                 <Button variant="secondary" size="icon">
//                   <Heart className="h-4 w-4" />
//                 </Button>
//                 <Button variant="secondary" size="icon">
//                   <Share className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Car Info */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="font-display font-bold text-3xl text-foreground mb-2">
//                 {car.title}
//               </h1>
//               <div className="flex items-center space-x-4 mb-4">
//                 <div className="flex items-center space-x-1">
//                   <Star className="h-5 w-5 text-yellow-400 fill-current" />
//                   <span className="font-medium">{car.rating}</span>
//                   <span className="text-muted-foreground">({car.reviews} reviews)</span>
//                 </div>
//                 <div className="flex items-center space-x-1 text-muted-foreground">
//                   <MapPin className="h-4 w-4" />
//                   <span>{car.location}</span>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-4 mb-6">
//                 <div className="flex items-center space-x-2">
//                   <span className="font-display font-bold text-4xl text-automotive-primary">
//                     ${car.price.toLocaleString()}
//                   </span>
//                   {car.originalPrice && (
//                     <span className="text-lg text-muted-foreground line-through">
//                       ${car.originalPrice.toLocaleString()}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <p className="text-muted-foreground mb-6 leading-relaxed">
//                 {car.description}
//               </p>

//               <div className="flex space-x-4">
//                 <Button 
//                   onClick={handleAddToCart}
//                   className="btn-premium flex-1"
//                   size="lg"
//                 >
//                   <ShoppingCart className="h-5 w-5 mr-2" />
//                   Add to Cart
//                 </Button>
//                 <Button variant="outline" className="btn-steel" size="lg">
//                   Schedule Test Drive
//                 </Button>
//               </div>

//               <div className="flex items-center space-x-2 mt-4 text-sm text-muted-foreground">
//                 <Shield className="h-4 w-4" />
//                 <span>Protected by our quality guarantee</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Specifications */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <Card>
//             <CardContent className="p-6">
//               <h3 className="font-display font-semibold text-xl mb-4 text-foreground">
//                 Specifications
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {specs.map((spec) => {
//                   const IconComponent = spec.icon;
//                   return (
//                     <div key={spec.label} className="flex items-center space-x-3">
//                       <IconComponent className="h-5 w-5 text-automotive-accent" />
//                       <div>
//                         <div className="text-sm text-muted-foreground">{spec.label}</div>
//                         <div className="font-medium text-foreground">{spec.value}</div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               <div className="mt-6 pt-6 border-t border-border">
//                 <div className="text-sm text-muted-foreground mb-2">VIN</div>
//                 <div className="font-mono text-sm text-foreground">{car.vin}</div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <h3 className="font-display font-semibold text-xl mb-4 text-foreground">
//                 Features & Equipment
//               </h3>
//               <div className="grid grid-cols-1 gap-2">
//                 {car.features.map((feature, index) => (
//                   <div key={index} className="flex items-center space-x-3">
//                     <div className="w-2 h-2 bg-automotive-accent rounded-full" />
//                     <span className="text-foreground">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarDetail;















import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button"; // adjust import path if needed

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showall, setshowall] = useState(false);

  // Add-to-card states
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  useEffect(() => {
    let isMounted = true; // prevent state updates if component unmounts

    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://carbackend-1g9v.onrender.com/cars/cart/${id}`);
        if (!isMounted) return;
        // using the same property name you used: finduser
        setCar(response.data?.finduser || null);
      } catch (err) {
        console.error("Error fetching car:", err);
        if (!isMounted) return;
        setCar(null);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchCar();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Add to card function
  const addToCard = async () => {
    setAddError("");
    setAddSuccess("");

    // require car loaded
    if (!car) {
      setAddError("No car loaded to add.");
      return;
    }

    // get token from localStorage or sessionStorage
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      // not logged in — send to login page
      setAddError("You must be logged in to add to your cards.");
      // optional: navigate('/login')
      navigate("/login");
      return;
    }

    const payload = {
      title: car.title || "",
      make: car.make || car.make || "",
      model: car.model || "",
      year: car.year || "",
      price: car.price || "",
      description: car.description || "",
      img1: car.img1 || "",
      img2: car.img2 || "",
      img3: car.img3 || "",
    };

    try {
      setAdding(true);
      // Use the endpoint you provided. I corrected the port to 1200 (https://carbackend-1g9v.onrender.com/add)
      const res = await axios.post("https://carbackend-1g9v.onrender.com/add", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201 || res.status === 200) {
        setAddSuccess(res.data?.message || "Added to card");
        // Optionally navigate to cart after a short delay
        setTimeout(() => {
          navigate("/cart");
        }, 800);
      } else {
        setAddError(res.data?.message || "Could not add card");
      }
    } catch (err) {
      console.error("Add to card error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong while adding the card.";
      setAddError(msg);

      // If unauthorized, send to login
      if (err?.response?.status === 401) {
        // Redirect to login after showing message
        setTimeout(() => navigate("/login"), 700);
      }
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading car details...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Car Not Found</h1>
          <Button onClick={() => navigate("/cars")} variant="outline">
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  // Safe helpers
  const images = [car.img1, car.img2, car.img3].filter(Boolean);
  const displayPrice = car.price ? `$${Number(car.price).toLocaleString()}` : "Contact";
  const mileage = car.model ?? "N/A";
  const rating = car.rating ?? Math.floor((Math.random() * 5) + 1);
  const reviews = car.reviews ?? Math.floor((Math.random() * 50) + 1);

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images / gallery */}
        <div>
          {images.length > 0 ? (
            <img
              src={images[0]}
              alt={car.title || "Car image"}
              className="w-full h-96 object-cover rounded-lg shadow"
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center rounded-lg bg-gray-100">
              <span className="text-gray-500">No image available</span>
            </div>
          )}

          {images.length > 1 && (
            <div className="mt-4 flex space-x-2">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${car.title || "Car"} ${i + 1}`}
                  className="w-24 h-16 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{car.title || "Untitled Car"}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.383 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.383-2.455a1 1 0 00-1.176 0l-3.383 2.455c-.785.57-1.84-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.047 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
              </svg>
              <span className="font-medium">{rating}</span>
              <span className="text-sm text-gray-500">({reviews})</span>
            </div>

            <div className="text-sm text-gray-600">
              <strong>{car.year || "N/A"}</strong> · {mileage}
            </div>
          </div>

          <div className="mb-4">
            <span className="text-2xl font-bold text-automotive-primary">{displayPrice}</span>
            {car.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-3">
                ${Number(car.originalPrice).toLocaleString()}
              </span>
            )}
            <div className="text-sm text-gray-600 mt-1">Starting at $899/mo</div>
          </div>

          <p className="text-gray-700 mb-6">{car.description || "No description provided."}</p>

          <div className="flex space-x-3">
            <Button
              className="btn-premium"
              onClick={addToCard}
              disabled={adding}
            >
              {adding ? "Adding..." : "Add To Card"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/cars")}>
              Back to Listings
            </Button>
          </div>

          {/* add message */}
          <div className="mt-4">
            {addError && <div className="text-sm text-red-600">{addError}</div>}
            {addSuccess && <div className="text-sm text-green-600">{addSuccess}</div>}
          </div>

          {/* Optional extra info */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md text-sm text-gray-700">
            <div>
              <strong>Description:</strong>{" "}
              {showall ? car.description : (car.description?.slice(0, 50) || "Unknown")}
              <span
                className="text-gray-900 cursor-pointer ml-2"
                onClick={() => setshowall(!showall)}
              >
                {!showall ? "..see more" : " ..show less"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
