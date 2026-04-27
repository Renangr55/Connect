import React, { useState } from "react";
import axios from "axios";

function Card({ id, title, image, horizontal = false }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOpen() {
    setOpen(true);
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/action/retrive_update_delete/${id}/`
      );

      setDescription(response.data.description);
    } catch (error) {
      console.error(error);
      setDescription("Erro ao carregar descrição");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-2xl shadow-md ${
          horizontal ? "h-48 w-full" : "h-48 w-72"
        }`}
      >
        <img
          src={
            image
              ? `http://localhost:8000${image}`
              : "https://via.placeholder.com/300"
          }
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-xl font-bold">{title}</h2>

          <div className="flex gap-2 mt-2">
            <button className="bg-white text-black text-xs px-3 py-1 rounded-md">
              subscribe in the action
            </button>

            <button
              onClick={handleOpen}
              className="bg-white text-black text-xs px-3 py-1 rounded-md"
            >
              More informations
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setOpen(false)} 
        >
          <div
            className="bg-white rounded-2xl p-6 w-96 shadow-lg relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-lg font-bold mb-2">{title}</h2>

            <p className="text-sm text-gray-700">
              {loading ? "Loading..." : description}
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;