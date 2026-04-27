import React from "react";

function Card({ horizontal = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-md bg-gray-300 ${
        horizontal ? "h-48 w-full" : "h-48 w-72"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="absolute bottom-4 left-4 text-white">
        <h2 className="text-xl font-bold">Title</h2>
        <p className="text-sm opacity-80">Subtitle</p>

        <div className="flex gap-2 mt-2">
          <button className="bg-white text-black text-xs px-3 py-1 rounded-md">
            Add to my itinerary
          </button>
          <button className="bg-white text-black text-xs px-3 py-1 rounded-md">
            12 mins from hotel
          </button>
        </div>
      </div>
    </div>
  );
}
