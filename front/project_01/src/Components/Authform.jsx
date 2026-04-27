import React from "react";

export function AuthForm({
  title,
  fields,
  buttonText,
  footerText,
  footerAction,
  onSubmit,
}) {
  return (
    <div className="bg-gradient-to-r from-[#279A94] to-[#C673EC] p-8 rounded-xl w-96 text-white flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <label>{field.label}</label>
          <input
            type={field.type}
            className="p-2 rounded text-black outline-none"
            placeholder={field.placeholder}
          ></input>
        </div>
      ))}
      <button
        onClick={onSubmit}
        className="bg-black mt-4 py-2 rounded-xl hover:scale-105 transition"
      >
        {buttonText}
      </button>

      <button
        onClick={footerAction}
        className="bg-black mt-4 py-2 rounded-xl hover:scale-105 transition"
      >
        {footerText}
      </button>
    </div>
  );
}
