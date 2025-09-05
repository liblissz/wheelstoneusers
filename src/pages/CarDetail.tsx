

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
