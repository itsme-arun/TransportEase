import React, { useState } from "react";

interface VehicleFormData {
  type: string;
  model: string;
  registrationNumber: string;
  capacity: number | "";
  ratePerKm: number | "";
  city: string;
  imageFile: File | null;
}

const OwnerDashboard = () => {
  const [formData, setFormData] = useState<VehicleFormData>({
    type: "",
    model: "",
    registrationNumber: "",
    capacity: "",
    ratePerKm: "",
    city: "",
    imageFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Replace with actual logged-in owner email
  const userEmail = "owner@example.com";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "capacity" || name === "ratePerKm") {
      const val = value === "" ? "" : Number(value);
      setFormData((prev) => ({ ...prev, [name]: val }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (
      formData.capacity === "" ||
      formData.ratePerKm === "" ||
      formData.capacity <= 0 ||
      formData.ratePerKm < 0
    ) {
      setMessage("Capacity must be > 0 and Rate per Km must be >= 0");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("type", formData.type);
      payload.append("name", formData.model);
      payload.append("registrationNumber", formData.registrationNumber); // optional, backend may ignore
      payload.append("capacity", String(formData.capacity));
      payload.append("ratePerKm", String(formData.ratePerKm));
      payload.append("city", formData.city);
      payload.append("available", "true");
      payload.append("ownerEmail", userEmail); // ✅ required by backend

      if (formData.imageFile) {
        payload.append("image", formData.imageFile);
      }

      const response = await fetch("http://localhost:8080/api/vehicles", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || "Failed to add vehicle");
      }

      setMessage("✅ Vehicle added successfully!");
      setFormData({
        type: "",
        model: "",
        registrationNumber: "",
        capacity: "",
        ratePerKm: "",
        city: "",
        imageFile: null,
      });
    } catch (error: any) {
      setMessage(error.message || "❌ Error adding vehicle.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>
      <h2 className="text-xl font-semibold mb-4">Add a New Vehicle</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="type" className="block mb-1 font-medium">
            Vehicle Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Type</option>
            <option value="Bus">Bus</option>
            <option value="Van">Van</option>
            <option value="Car">Car</option>
          </select>
        </div>

        <div>
          <label htmlFor="model" className="block mb-1 font-medium">
            Model
          </label>
          <input
            id="model"
            name="model"
            type="text"
            value={formData.model}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="registrationNumber"
            className="block mb-1 font-medium"
          >
            Registration Number
          </label>
          <input
            id="registrationNumber"
            name="registrationNumber"
            type="text"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="capacity" className="block mb-1 font-medium">
            Capacity
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="ratePerKm" className="block mb-1 font-medium">
            Rate per Km
          </label>
          <input
            id="ratePerKm"
            name="ratePerKm"
            type="number"
            min="0"
            value={formData.ratePerKm}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="city" className="block mb-1 font-medium">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block mb-1 font-medium">
            Vehicle Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default OwnerDashboard;
