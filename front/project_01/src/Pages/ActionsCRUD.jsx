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

<<<<<<< HEAD
  const token = localStorage.getItem("access_token");

  // =========================
  // LISTAR ACTIONS
  // =========================
  async function fetchActions() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/action/list_create_view",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setActions(res.data.results || res.data);
    } catch (err) {
      console.error("❌ ERROR FETCHING ACTIONS:", err.response?.data || err.message);
    }
  }

  useEffect(() => {
    fetchActions();
  }, []);

  // =========================
  // INPUTS
  // =========================
=======
  // 🔹 HANDLE INPUT
>>>>>>> f57f4b77b1174856e75ad71288cc67cdb064021e
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🔹 HANDLE IMAGE
  function handleImage(e) {
    const file = e.target.files[0];
<<<<<<< HEAD

    setForm({ ...form, image: file });
=======
>>>>>>> f57f4b77b1174856e75ad71288cc67cdb064021e

    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  }

  // =========================
  // CREATE / UPDATE
  // =========================
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
<<<<<<< HEAD
      if (editingId) {
        await axios.patch(
          `http://localhost:8000/api/action/retrieve_update_destroy/${editingId}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/action/list_create_view",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
=======
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
>>>>>>> f57f4b77b1174856e75ad71288cc67cdb064021e

      setPreview(null);
<<<<<<< HEAD
      setEditingId(null);

      fetchActions();
    } catch (err) {
      console.error("❌ ERROR SUBMIT:", err.response?.data || err.message);
    }
  }

  // =========================
  // EDIT
  // =========================
  function handleEdit(action) {
    setForm({
      title: action.title,
      description: action.description,
      image: null,
    });

    setPreview(
      action.image ? `http://localhost:8000${action.image}` : null
    );

    setEditingId(action.id);
  }

  // =========================
  // DELETE
  // =========================
  async function handleDelete(id) {
    try {
      await axios.delete(
        `http://localhost:8000/api/action/retrieve_update_destroy/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchActions();
    } catch (err) {
      console.error("❌ DELETE ERROR:", err.response?.data || err.message);
    }
  }

  // =========================
  // UI
  // =========================
=======
    } catch (error) {
      console.error("ERRO:", error.response?.data || error);
    }
  }

>>>>>>> f57f4b77b1174856e75ad71288cc67cdb064021e
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

<<<<<<< HEAD
        {preview && (
          <img
            src={preview}
            className="mt-3 h-40 w-full object-cover rounded-lg"
            alt="preview"
          />
        )}
=======
        {/* SKILLS */}
        <input
          name="required_skills"
          value={form.required_skills}
          onChange={handleChange}
          placeholder="Skill IDs (ex: 1,2,3)"
          className="w-full p-3 mb-3 bg-gray-100 rounded-lg"
        />
>>>>>>> f57f4b77b1174856e75ad71288cc67cdb064021e

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
<<<<<<< HEAD

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action) => (
          <div
            key={action.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={
                action.image
                  ? `http://localhost:8000${action.image}`
                  : "/placeholder.png"
              }
              className="h-40 w-full object-cover"
              alt=""
            />

            <div className="p-4">
              <h2 className="font-bold text-lg">{action.title}</h2>
              <p className="text-sm text-gray-600">
                {action.description}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(action)}
                  className="flex-1 bg-yellow-400 p-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(action.id)}
                  className="flex-1 bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
=======
>>>>>>> f57f4b77b1174856e75ad71288cc67cdb064021e
    </div>
  );
}
