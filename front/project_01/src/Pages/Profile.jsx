import React from "react";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import { Mail, Plus, ChevronDown } from "lucide-react";

const Profile = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo */}
      <div className="ml-64 w-full min-h-screen bg-gray-50 flex flex-col">
        
        {/* MAIN cresce */}
        <main className="w-full px-8 py-6 flex-grow">

          {/* Banner */}
          <div className="h-32 w-full rounded-2xl bg-gradient-to-r from-purple-400 via-purple-500 to-teal-400 mb-8"></div>

          {/* Info */}
          <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Lorem Ipsum</h2>
                <p className="text-gray-500">lorem@email.com</p>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Full Name", placeholder: "Your Name" },
              { label: "Nickname", placeholder: "Your Nickname" },
              { label: "Gender", placeholder: "Select", select: true },
              { label: "Profession", placeholder: "Select", select: true },
              { label: "Language", placeholder: "Select", select: true },
              { label: "Time Zone", placeholder: "Select", select: true },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <label className="text-gray-700 text-sm font-medium">
                  {field.label}
                </label>

                <div className="relative">
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full bg-white shadow-sm rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  {field.select && (
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* EMAIL */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">
              My Email Address
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Mail className="w-5 h-5" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">
                  alexarowles@gmail.com
                </p>
                <p className="text-xs text-gray-400">1 month ago</p>
              </div>
            </div>

            <button className="flex items-center gap-2 text-blue-600 bg-blue-100 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-200 transition">
              <Plus className="w-4 h-4" />
              Add Email Address
            </button>
          </div>

        </main>

        {/* Footer sempre no final */}
        <Footer />
      </div>
    </div>
  );
};

export default Profile;