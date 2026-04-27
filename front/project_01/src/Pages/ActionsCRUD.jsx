import React, { useEffect, useState } from "react";
import axios from "axios";

export function ActionsCRUD() {
  const [actions, setActions] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

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
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    const file = e.target.files[0];

    setForm({ ...form, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  // =========================
  // CREATE / UPDATE
  // =========================
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
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

      setForm({ title: "", description: "", image: null });
      setPreview(null);
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
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Actions Dashboard</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md max-w-xl mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Action" : "Create Action"}
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 mb-3 bg-gray-100 rounded-lg"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 mb-3 bg-gray-100 rounded-lg"
        />

        <input type="file" onChange={handleImage} />

        {preview && (
          <img
            src={preview}
            className="mt-3 h-40 w-full object-cover rounded-lg"
            alt="preview"
          />
        )}

        <button className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          {editingId ? "Update" : "Create"}
        </button>
      </form>

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
    </div>
  );
}

export default ActionsCRUD;