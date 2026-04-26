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
    <div className="w-full min-h-screen m-5">
      <section className="flex flex-col">
        <img className="w-50 h-20" src={image_connect}></img>
        <img className="w-50 h-20" src={image_people}></img>
      </section>
      <nav className="flex flex-col">
        <Link
          className="flex flex-row items-center transition delay-100 duration-200 ease-in-out hover:scale-110 gap-2"
          to={"/home"}
        >
          <IoMdHome size={20} /> Home
        </Link>
        <Link
          className="flex flex-row items-center transition delay-100 duration-200 ease-in-out hover:scale-110 gap-2"
          to={"/profile"}
        >
          <CgProfile size={20} /> Profile
        </Link>
        <Link
          className="flex flex-row items-center transition delay-100 duration-200 ease-in-out hover:scale-110 gap-2"
          to={"/notifications"}
        >
          <IoNotifications size={20} />
          Notifi
        </Link>
        <Link
          className="flex flex-row items-center transition delay-100 duration-200 ease-in-out hover:scale-110 gap-2"
          to={"/chat"}
        >
          <TbMessageChatbot size={20} /> Chatbot
        </Link>
        <Link
          className="flex flex-row items-center transition delay-100 duration-200 ease-in-out hover:scale-110 gap-2"
          to={"?"}
        >
          <PiDotsThreeCircleLight size={20} /> Action
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
