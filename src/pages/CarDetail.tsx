import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://carbackend-1g9v.onrender.com/cars/cart/${id}`
        );
        if (!isMounted) return;
        const fetchedCar = response.data?.finduser || null;
        setCar(fetchedCar);

        // Set first image as selected
        const images = [
          fetchedCar?.img1,
          fetchedCar?.img2,
          fetchedCar?.img3,
          fetchedCar?.img4,
          fetchedCar?.img5,
          fetchedCar?.img6,
          fetchedCar?.img7,
          fetchedCar?.img8,
          fetchedCar?.img9,
        ].filter(Boolean);
        setSelectedImage(images[0] || null);
      } catch (err) {
        console.error("Error fetching car:", err);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading car details...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
          <Button onClick={() => navigate("/cars")} variant="outline">
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  const images = [
    car.img1,
    car.img2,
    car.img3,
    car.img4,
    car.img5,
    car.img6,
    car.img7,
    car.img8,
    car.img9,
  ].filter(Boolean);

  const displayPrice = car.price ? `$${Number(car.price).toLocaleString()}` : "Contact";

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Image */}
        <div className="flex flex-col items-center">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={car.title || "Car image"}
              className="w-full h-96 object-cover rounded-lg shadow transition-all duration-500"
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center rounded-lg bg-gray-100">
              <span className="text-gray-500">No image available</span>
            </div>
          )}

          {/* Smooth sliding thumbnails */}
          {images.length > 1 && (
            <div className="mt-4 w-full overflow-x-auto flex gap-2 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${car.title} ${i + 1}`}
                  className={`w-24 h-16 object-cover rounded-md cursor-pointer border-2 ${
                    img === selectedImage ? "border-blue-500" : "border-gray-200"
                  } transition-transform duration-300 hover:scale-105`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Car Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{car.title || "Untitled Car"}</h1>
          <div className="text-gray-700 mb-4">
            {car.make} {car.model} · {car.year}
          </div>
          <div className="text-2xl font-bold text-automotive-primary mb-4">{displayPrice}</div>
          <p className="text-gray-700 mb-6">{car.description || "No description provided."}</p>

          <div className="flex gap-3">
            <Button onClick={() => navigate("/cars")} variant="outline">
              Back to Listings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
