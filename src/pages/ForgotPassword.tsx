import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // Axios instance for base URL
  const api = axios.create({
    baseURL: "https://carbackend-1g9v.onrender.com/api/auth",
  });

  // Handle OTP input
  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (step === 1) {
        // Send OTP
        const { data } = await api.post("/send-otp", { email });
        alert(data.message);
        setStep(2);

      } else if (step === 2) {
        // Verify OTP
        const otpString = otp.join("");
        const { data } = await api.post("/verify-otp", { email, otp: otpString });
        alert(data.message);
        setStep(3);

      } else if (step === 3) {
        // Reset password
        if (password !== confirm) {
          alert("Passwords do not match!");
          return;
        }
        const otpString = otp.join("");
        const { data } = await api.post("/reset-password", {
          email,
          otp: otpString,
          newPassword: password,
        });
        alert(data.message);

        // Reset form
        setStep(1);
        setEmail("");
        setOtp(["", "", "", "", "", ""]);
        setPassword("");
        setConfirm("");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Enter OTP"}
          {step === 3 && "Reset Password"}
        </h2>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div>
            <label className="block text-gray-600 mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <div className="flex justify-between gap-2">
            {otp.map((digit, i) => (
              <Input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                className="w-12 h-12 text-center text-lg font-semibold border-gray-300"
              />
            ))}
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">New Password</label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Confirm Password</label>
              <Input
                type="password"
                placeholder="Repeat new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleSubmit}
            className="w-full py-2 text-lg"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : step === 1
              ? "Send OTP"
              : step === 2
              ? "Verify OTP"
              : "Reset Password"}
          </Button>
        </div>

        {step > 1 && (
          <p
            className="text-sm text-gray-500 mt-4 text-center cursor-pointer"
            onClick={() => setStep(step - 1)}
          >
            ← Go Back
          </p>
        )}
        <p
            className="text-sm text-gray-500 mt-4 text-center cursor-pointer"
            onClick={() => window.location.href("/")}
          >
            ← Go Back to login
          </p>
      </motion.div>
    </div>
  );
}

