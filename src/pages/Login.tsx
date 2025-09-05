import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * AuthForm integrated with:
 *  - Login:  https://carbackend-1g9v.onrender.com/normal/login
 *  - Register: https://carbackend-1g9v.onrender.com/normal/register
 *
 * Behaviors:
 *  - Stores token in localStorage (remember=true) or sessionStorage
 *  - Sets axios default Authorization header on success
 *  - Redirects to /cars after successful login/register
 */

const AuthForm = ({ onSuccess }) => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Signup-specific fields
  const [name, setName] = useState("");
  const [number, setNumber] = useState(""); // contact
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // UI state
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const resetMessages = () => {
    setError("");
    setSuccessMsg("");
  };

  const validate = () => {
    resetMessages();
    if (!email.trim()) return "Please enter your email.";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return "Please enter a valid email address.";

    if (!password) return "Please enter your password.";
    // backend requires 10 chars min
    if (mode === "signup" && password.length < 10) return "Password should be at least 10 characters.";

    if (mode === "signup") {
      if (!name.trim()) return "Please enter your name.";
      if (!number.toString().trim()) return "Please enter your contact number.";
      if (!country.trim()) return "Please enter your country.";
      if (!address.trim()) return "Please enter your address.";
      if (password !== confirmPassword) return "Passwords do not match.";
    }

    return null;
  };

  const handleSuccess = (token, message, data) => {
    // Store token based on remember
    try {
      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Set axios default header for subsequent requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.warn("Could not persist token:", err);
    }

    setSuccessMsg(message || "Success");
    if (onSuccess) onSuccess(data);

    // Redirect to /cars (adjust as needed)
    setTimeout(() => navigate("/"), 700);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      if (mode === "login") {
        const res = await axios.post("https://carbackend-1g9v.onrender.com/normal/login", { email, password });
        const token = res.data?.token;
        const message = res.data?.message || "Logged in successfully.";
        if (!token) {
          throw new Error("No token returned from server.");
        }
        handleSuccess(token, message, res.data);
      } else {
        // Signup - backend expects: name, number, country, address, email, password
        const payload = { name, number, country, address, email, password };
        const res = await axios.post("https://carbackend-1g9v.onrender.com/normal/register", payload);
        const token = res.data?.token;
        const message = res.data?.message || "Account created successfully.";
        if (!token) {
          // backend is expected to return a token but protect against missing token
          setSuccessMsg(message);
          setMode("login");
        } else {
          handleSuccess(token, message, res.data);
        }
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    resetMessages();
    setMode(newMode);
    // optionally clear sensitive fields
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => switchMode("login")}
                aria-pressed={mode === "login"}
                className={`px-3 py-1 rounded-md text-sm ${
                  mode === "login" ? "bg-emerald-500 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => switchMode("signup")}
                aria-pressed={mode === "signup"}
                className={`px-3 py-1 rounded-md text-sm ${
                  mode === "signup" ? "bg-emerald-500 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {mode === "signup" && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Street, City"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Country"
                  />
                </div>

                <div>
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact number
                  </label>
                  <input
                    id="number"
                    name="number"
                    type="tel"
                    autoComplete="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="+1 6xx xxx xxx"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-10"
                  placeholder={mode === "signup" ? "At least 10 characters" : "••••••••"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Repeat your password"
                />
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-gray-600">Remember me</span>
              </label>

              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => navigate("/resetpassword")}
                  className="text-emerald-600 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
            {successMsg && <div className="text-sm text-green-600">{successMsg}</div>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 rounded-md text-white font-medium ${
                  loading ? "bg-emerald-300 cursor-wait" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button onClick={() => setMode("signup")} className="text-emerald-600 hover:underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-emerald-600 hover:underline">
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

