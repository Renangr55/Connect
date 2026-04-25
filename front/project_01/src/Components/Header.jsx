import React from "react";
import connect_image from "../assets/Connect_2.png";
import { useState } from "react";
import { useEffect } from "react";

// useEffect(() => {
//   const [connectUser, setConnectUser] = useState(null);
// }, 1000);

export function Header({username}) {
  return (
    <header className="flex justify-evenly gap-250 items-center text-center max-w-screen">
      <nav className="font-medium text-2xl">
        <h1>Renan Gabriel</h1>
      </nav>
    </header>
  );
}

export default Header;
