import React, { useState } from "react";
import axios from "axios";

export default function ActionsCRUD() {
  const token = localStorage.getItem("access");

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    image: null,

    // ADDRESS
    country: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    description_address: "",

    // RELATIONS
    required_skills: "", // pode ser "1,2,3"
  });

  const [preview, setPreview] = useState(null);

  // 🔹 HANDLE INPUT
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🔹 HANDLE IMAGE
  function handleImage(e) {
    const file = e.target.files[0];

    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  }

  // 🔹 SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    // ACTION
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("date", form.date);

    // ADDRESS (achatado)
    formData.append("localization.country", form.country);
    formData.append("localization.city", form.city);
    formData.append("localization.neighborhood", form.neighborhood);
    formData.append("localization.street", form.street);
    formData.append("localization.number", form.number);
    formData.append(
      "localization.description_address",
      form.description_address,
    );

    // SKILLS (ex: "1,2,3")
    formData.append("required_skills", form.required_skills);

    // IMAGE
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await axios.post(
        "http://localhost:8000/api/action/list_create_view",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Action criada 🚀");

      // RESET
      setForm({
        title: "",
        description: "",
        date: "",
        image: null,
        country: "",
        city: "",
        neighborhood: "",
        street: "",
        number: "",
        description_address: "",
        required_skills: "",
      });

      setPreview(null);
    } catch (error) {
      console.error("ERRO:", error.response?.data || error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold mb-4">Create Action</h1>

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 mb-3 bg-gray-100 rounded-lg"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 mb-3 bg-gray-100 rounded-lg"
        />

        {/* DATE */}
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-3 mb-3 bg-gray-100 rounded-lg"
        />

        {/* SKILLS */}
        <input
          name="required_skills"
          value={form.required_skills}
          onChange={handleChange}
          placeholder="Skill IDs (ex: 1,2,3)"
          className="w-full p-3 mb-3 bg-gray-100 rounded-lg"
        />

        {/* ADDRESS */}
        <h2 className="font-bold mt-4 mb-2">Address</h2>

        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country ID"
          className="w-full p-3 mb-2 bg-gray-100 rounded-lg"
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City ID"
          className="w-full p-3 mb-2 bg-gray-100 rounded-lg"
        />

        <input
          name="neighborhood"
          value={form.neighborhood}
          onChange={handleChange}
          placeholder="Neighborhood"
          className="w-full p-3 mb-2 bg-gray-100 rounded-lg"
        />

        <input
          name="street"
          value={form.street}
          onChange={handleChange}
          placeholder="Street"
          className="w-full p-3 mb-2 bg-gray-100 rounded-lg"
        />

        <input
          name="number"
          value={form.number}
          onChange={handleChange}
          placeholder="Number"
          className="w-full p-3 mb-2 bg-gray-100 rounded-lg"
        />

        <textarea
          name="description_address"
          value={form.description_address}
          onChange={handleChange}
          placeholder="Address description"
          className="w-full p-3 mb-3 bg-gray-100 rounded-lg"
        />

        {/* IMAGE BUTTON */}
        <div className="flex flex-col gap-3">
          <label className="cursor-pointer border-2 border-dashed border-gray-400 p-6 rounded-xl text-center hover:bg-gray-100 transition">
            <p className="text-gray-600 font-medium">
              {preview ? "Change Image" : "Upload Image"}
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-40 w-full object-cover rounded-lg"
            />
          )}
        </div>

        {/* SUBMIT */}
        <button className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Create Action
        </button>
      </form>
    </div>
  );
}
