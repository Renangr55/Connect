import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex flex-row ">
        <Sidebar />
        <main className="min-w-screen bg-linear-to-r from-[#279A94] to-[#C673EC]">
          <h1>Seja um voluntário</h1>
          <button
            onClick={(e) => {
              e.preventDefault;
              navigate("/");
            }}
          >Conheçam aqui</button>
        </main>
      </div>
    </>
  );
}

export default Home;
