import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbq5gkepx/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "images-zozac";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageUploading, setImageUploading] = useState(false);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://carbackend-1g9v.onrender.com/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setFormData(res.data.user); // pre-fill form
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, form);
      const imageUrl = res.data.secure_url;
      setFormData({ ...formData, profile: imageUrl });
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `https://carbackend-1g9v.onrender.com/normal/profile/update`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h1>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={formData.profile || "https://via.placeholder.com/150"}
          alt={formData.name || "Profile"}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-automotive-accent mb-4"
        />
        {editMode && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
            {imageUploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
          </>
        )}
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded-md ${
              editMode ? "border-blue-500 bg-white" : "border-gray-300 bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded-md ${
              editMode ? "border-blue-500 bg-white" : "border-gray-300 bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="number"
            value={formData.number || ""}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded-md ${
              editMode ? "border-blue-500 bg-white" : "border-gray-300 bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country || ""}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded-md ${
              editMode ? "border-blue-500 bg-white" : "border-gray-300 bg-gray-100"
            }`}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            disabled={!editMode}
            className={`w-full p-2 border rounded-md ${
              editMode ? "border-blue-500 bg-white" : "border-gray-300 bg-gray-100"
            }`}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-3">
        {!editMode ? (
          <Button
            onClick={() => setEditMode(true)}
            className="bg-automotive-accent text-white hover:bg-automotive-primary transition"
          >
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              onClick={handleSave}
              className="bg-green-500 text-white hover:bg-green-600 transition"
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setFormData(user);
                setEditMode(false);
              }}
              className="bg-red-500 text-white hover:bg-red-600 transition"
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
