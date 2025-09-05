// App.jsx
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import AuthForm from "./pages/Login";
import ProfilePage from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  // Add any other auth-only routes here if you want them to also hide layout:
  const hideLayoutPaths = ["/login", "/resetpassword"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hide header/footer on specified routes */}
      {!hideLayout && <Header />}

      <main className="flex-1">
        <Routes>
           <Route path="/resetpassword" element={<ForgotPassword/>} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sell" element={<NotFound />} />
          <Route path="/compare" element={<NotFound />} />
          <Route path="/financing" element={<NotFound />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
