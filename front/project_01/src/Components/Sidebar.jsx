import React from "react";
import { Link, useNavigate } from "react-router-dom";
import image_people from "../assets/Connect_2.png";

function Sidebar() {
  const navigate = useNavigate();

  // 🔹 pega dados do usuário
  const username = localStorage.getItem("username") || "User";

  // 🔹 logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow-lg p-4 flex flex-col justify-between">
      
      {/* TOP */}
      <div>
        {/* Logo */}
        <section className="mb-10">
          <img className="w-full h-auto" src={image_people} alt="Logo" />
        </section>

        {/* User */}
        <div className="mb-8 text-center">
          <p className="text-gray-500 text-sm">Welcome</p>
          <h2 className="font-bold text-lg">{username}</h2>
        </div>

        {/* Navigation */}
        <nav>
          <section className="flex flex-col gap-4 text-lg">
            <Link to="/home/" className="hover:text-blue-500">Home</Link>
            <Link to="/profile/" className="hover:text-blue-500">Profile</Link>
            <Link to="/notifications/" className="hover:text-blue-500">Notification</Link>
            <Link to="/watson/" className="hover:text-blue-500">Chat</Link>
            <Link to="/actions" className="hover:text-blue-500">Action</Link>
          </section>
        </nav>
      </div>

      {/* BOTTOM */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;