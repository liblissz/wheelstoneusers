
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const logout = ()=>{
    localStorage.removeItem("token")
  sessionStorage.removeItem("token") 
  window.location.reload()
 }
const [is, setis] = useState(false)

 const isac = ()=>{
  if(localStorage.getItem("token") || sessionStorage.getItem("token")){
    setis(true)
  }
 }
useEffect(()=>{
  isac()
},[])
  return (
    <footer className="bg-automotive-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-automotive-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="font-display font-bold text-xl">WheelStone</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner in finding the perfect car. Quality vehicles, transparent pricing, exceptional service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-automotive-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-automotive-accent cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-automotive-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cars" className="text-gray-300 hover:text-automotive-accent transition-colors">Browse Cars</Link></li>

              <li><Link to="/financing" className="text-gray-300 hover:text-automotive-accent transition-colors">Home</Link></li>
           {is &&   <li onClick={()=> logout()}><Link to={""}  className="text-gray-300 hover:text-automotive-accent transition-colors">Log Out</Link></li>}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
           
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-automotive-accent" />
                <span className="text-gray-300">1-800-WHEELS-1</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-automotive-accent" />
                <span className="text-gray-300">info@wheelstone.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-automotive-accent" />
                <span className="text-gray-300">Los Angeles, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 WheelStone Deals. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* <Link to="/privacy" className="text-gray-400 hover:text-automotive-accent text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-automotive-accent text-sm transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-automotive-accent text-sm transition-colors">Cookie Policy</Link>
           */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
