import React from "react";

export function ActionCard({ title, description, image }) {
  return (
    <div className="w-60 bg-gray-200 rounded-2xl p-4 flex flex-col gap-3">
      <div className="h-32 bg-gray-300 rounded-xl flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="h-full object-cover rounded-xl"
        ></img>
      </div>

      <div className="text-sm text-gray-700">
        <p className="font-semibold">{title}</p>
        <p>{description}</p>
      </div>

      <button className="bg-gray-700 text-white rounded-xl py-1 text-sm hover:scale-105 transition">
        or we could make this?
      </button>
    </div>
  );
}

export default ActionCard;
