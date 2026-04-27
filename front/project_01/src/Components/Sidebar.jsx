import React from "react";
import { Link } from "react-router";
import image_people from "../assets/Connect_2.png";

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow-lg p-4">
      
      {/* Logo */}
      <section className="mb-10">
        <img className="w-full h-auto" src={image_people} alt="Logo" />
      </section>

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
  );
}

export default Sidebar;