import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0);
  const [me, setMe] = useState(null); // single user object
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        setTotalItems(0);
        return;
      }
      try {
        const res = await axios.get("https://carbackend-1g9v.onrender.com/add", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cards = Array.isArray(res.data?.cards) ? res.data.cards : [];
        setTotalItems(cards.length);
      } catch (err) {
        console.error("Failed to fetch user cards:", err);
        setTotalItems(0);
      }
    };
    fetchCart();
  }, [token]);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await axios.get("https://carbackend-1g9v.onrender.com/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMe(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        setMe(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Browse Cars", path: "/cars" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-automotive-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-automotive-primary font-display font-bold text-xl">
              WheelStone
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-automotive-accent"
                    : "text-gray-700 hover:text-automotive-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
  <div className="flex items-center space-x-2 md:space-x-10">
  {/* Search Button (hidden on small screens) */}
  <Button
    variant="ghost"
    size="icon"
    className="hidden md:flex p-2 rounded-full hover:bg-gray-100 transition flex-shrink-0"
    onClick={() => (window.location.href = "/cars")}
  >
    <Search className="h-5 w-5" />
  </Button>

  {/* Profile / Login Button */}
  {me ? (
 <Button
  variant="ghost"
  size="icon"
  className="flex items-center space-x-2 py-1 px-2 md:px-3 rounded-full hover:bg-gray-100 transition flex-shrink-0 w-[100px] md:w-[80px] lg:w-[180px]"
  onClick={() => navigate("/profile")}
>
  <img
    src={me.profile || "https://via.placeholder.com/40"}
    alt={me.name}
    className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-automotive-accent"
  />
  
  <span className="hidden md:inline text-sm md:text-base font-medium text-gray-700 truncate">
    {me.name || "Unknown"}
  </span>
</Button>


  ) : (
    <Button
      variant="ghost"
      size="icon"
      className="px-3 py-1 rounded-full hover:bg-gray-100 transition flex-shrink-0"
      onClick={() => navigate("/login")}
    >
      Login
    </Button>
  )}

  {/* Cart Button */}
  <Button
    variant="ghost"
    size="icon"
    className="relative p-2 rounded-full hover:bg-gray-100 transition flex-shrink-0"
    onClick={() => navigate("/cart")}
  >
    <ShoppingCart className="h-5 w-5" />
    {totalItems > 0 && (
      <span className="absolute -top-1 -right-1 bg-automotive-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {totalItems}
      </span>
    )}
  </Button>

  {/* Hamburger Menu for mobile */}
  <Button
    variant="ghost"
    size="icon"
    className="md:hidden p-2 rounded-full hover:bg-gray-100 transition flex-shrink-0"
  >
    <Menu className="h-5 w-5" />
  </Button>
</div>


        </div>
      </div>
    </header>
  );
};

export default Header;
