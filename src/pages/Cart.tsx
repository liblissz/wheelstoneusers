import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const parsePrice = (val) => {
  if (val == null) return 0;
  // Remove any non-digit/decimal characters and parse
  const cleaned = String(val).replace(/[^0-9.\-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
};

const Cart = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(null); // cardId being removed
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch user's cards from backend
  const fetchCards = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        toast({ title: "Not authenticated", description: "Please log in to view your cards." });
        navigate("/login");
        return;
      }

      const res = await axios.get("https://carbackend-1g9v.onrender.com/add", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCards(Array.isArray(res.data?.cards) ? res.data.cards : []);
    } catch (err) {
      console.error("Failed to fetch cards:", err);
      toast({
        title: "Failed to load cards",
        description: err?.response?.data?.message || err.message || "Server error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveItem = async (cardId, cardTitle) => {
    setRemoving(cardId);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        toast({ title: "Not authenticated", description: "Please log in to continue." });
        navigate("/login");
        return;
      }

      await axios.delete(`https://carbackend-1g9v.onrender.com/add/${cardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove from local state
      setCards((prev) => prev.filter((c) => String(c._id || c.id) !== String(cardId)));

      toast({
        title: "Removed from Cart",
        description: `${cardTitle} has been removed from your cart.`,
      });
    } catch (err) {
      console.error("Failed to remove card:", err);
      toast({
        title: "Failed to remove",
        description: err?.response?.data?.message || err.message || "Could not remove card.",
      });
    } finally {
      setRemoving(null);
    }
  };

  // For compatibility with previous UI, we keep quantity controls but they don't persist server-side.
  // We'll store quantities locally in state map.
  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    // initialize quantities to 1
    const init = {};
    cards.forEach((c) => {
      init[String(c._id || c.id)] = quantities[String(c._id || c.id)] || 1;
    });
    setQuantities((prev) => ({ ...init, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const handleUpdateQuantity = (cardId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({ ...prev, [String(cardId)]: newQuantity }));
  };

  const getTotalPrice = () => {
    return cards.reduce((sum, c) => {
      const price = parsePrice(c.price);
      const qty = quantities[String(c._id || c.id)] || 1;
      return sum + price * qty;
    }, 0);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50000 ? 0 : 999; // Free shipping over $50k
  const tax = subtotal * 0.0875; // 8.75% tax
  const total = subtotal + shipping + tax;
const [secondload, setsecondload] = useState(false)
const handlePlaceOrder = async () => {
  if (cards.length === 0) {
    toast({ title: "Cart Empty", description: "Add items before placing an order." });
    return;
  }

  try {
    setsecondload(true)
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast({ title: "Not authenticated", description: "Please log in to place an order." });
      navigate("/login");
      return;
    }

    // Send only cart and totalPrice
    const orderData = {
      cartItems: cards.map((c) => ({
        productId: c._id,
        title: c.title,
        price: parsePrice(c.price),
        quantity: quantities[String(c._id || c.id)] || 1,
      })),
      totalPrice: Math.round(total),
      paymentmethod: selected
    };

    const res = await axios.post("https://carbackend-1g9v.onrender.com/api/orders", orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast({
      title: "Order Placed Successfully!",
      description: `Order #${res.data._id} has been created. Check your orders for details.`,
    });

    setCards([]);
    setQuantities({});
    navigate("/cart");
    window.location.reload()
  } catch (err) {
    console.error( err?.response?.data?.message || err.message || "Could not place order.",);
    toast({
      title: "Order Failed",
      description: err?.response?.data?.message || err.message || "Could not place order.",
    });
  }finally{
    setsecondload(false)
  }
};

const deletecart = async () => {
  try {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    const res = await axios.post(
      "https://carbackend-1g9v.onrender.com/api/orders/deletecard",
      {}, // empty body
      { headers: { Authorization: `Bearer ${token}` } } // headers go here
    );

    toast({ title: "Cart cleared", description: "All items removed from your cart." });
    window.location.reload()
  } catch (err) {
    console.log(err);
    toast(err?.response?.data?.message || err.message || "Error clearing cart");
  }
};

 const [pay, setPay] = useState([]);
  const [selected, setSelected] = useState("");

  const fetchPayment = async () => {
    try {
      const res = await axios.get("https://carbackend-1g9v.onrender.com/payments");
      setPay(res.data.payments || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-display font-bold text-4xl mb-8 text-foreground">Shopping Cart</h1>
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="font-display font-semibold text-2xl text-foreground mb-4">Loading your cards...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-display font-bold text-4xl mb-8 text-foreground">Shopping Cart</h1>

          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="font-display font-semibold text-2xl text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Discover amazing vehicles in our catalog and start building your dream collection.
            </p>
            <Button onClick={() => (window.location.href = "/cars")} className="btn-hero">
              Browse Cars
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-bold text-4xl text-foreground">Shopping Cart</h1>
          <Button
            variant="outline"
            onClick={() => deletecart()}
            className="text-destructive hover:text-destructive"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cards.map((card) => {
              const id = card._id || card.id;
              const qty = quantities[String(id)] || 1;
              const priceAtAdd = parsePrice(card.price);
              return (
                <Card key={id} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Car Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={card.img1 || card.image || "/placeholder-car.jpg"}
                          alt={card.title}
                          className="w-full sm:w-32 h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Car Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-display font-semibold text-lg text-foreground">{card.title}</h3>
                          <p className="text-muted-foreground">
                            {card.make} • {card.model} • {card.year}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">Qty:</span>
                              <div className="flex items-center border border-border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleUpdateQuantity(id, qty - 1)}
                                  disabled={qty <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{qty}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleUpdateQuantity(id, qty + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Price */}
                            <div>
                              <span className="font-display font-bold text-xl text-automotive-primary">
                                ${(priceAtAdd * qty).toLocaleString()}
                              </span>
                              {qty > 1 && <p className="text-sm text-muted-foreground">${priceAtAdd.toLocaleString()} each</p>}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(id, card.title)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 self-start sm:self-center"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {removing === id ? "Removing..." : "Remove"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border border-border sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-xl mb-6 text-foreground">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground"> £{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping & Handling</span>
                    <span className="font-medium text-foreground">{shipping === 0 ? "Free" : ` £${shipping.toLocaleString()}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium text-foreground"> £{Math.round(tax).toLocaleString()}</span>
                  </div>

                  <hr className="border-border" />

                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-display font-bold text-automotive-primary">${Math.round(total).toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2" style={{marginBottom: "12px"}}>
                <label className="text-sm font-medium text-gray-700">Preffered Payment Method:</label>
              <select
  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white"
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
>
  <option>--select a payment method--</option>
  {pay.map((item, idx) => (
    <option key={idx} value={item.paymentname}>
      {item.paymentname}
    </option>
  ))}
</select>

              </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">after placing the order we will get your location and other credentials of yours from you login detial in our database, we will sheep your order to you and give you a call after making payments</p>
             
                <Button onClick={handlePlaceOrder} className="w-full btn-hero text-base" size="lg" disabled={secondload}>
                  {secondload ? "loading" :"Place Order"}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground mt-4 text-center">By placing your order, you agree to our terms and conditions.</p>
             
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
