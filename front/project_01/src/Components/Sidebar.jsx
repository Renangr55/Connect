import React from "react";
import { Link } from "react-router";
import image_connect from "../assets/people.png";
import image_people from "../assets/Connect_2.png";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { TbMessageChatbot } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

function Sidebar() {
  return (
    <div className="w-50% min-h-screen m-5">
      <section className="flex flex-col">
        <img className="w-50 h-20" src={image_people}></img>
      </section>
      <nav className="flex flex-col">
        <section className="flex flex-col">
            <Link to="/home/">Home</Link>
            <Link to="/dashboard">Profile</Link>
            <Link to="/notifications/">Notification</Link>
            <Link to="/dashboard">Chat</Link>
            <Link to="/dashboard">Action</Link>
            
        </section>
      </nav>
    </div>
  );
}

export default Sidebar;
