import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router";
import { ActionCard } from "../Components/ActionCard";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const navigate = useNavigate();
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActions() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/action/list_create_view/",
        );

        const role = localStorage.getItem("role");

        const data = response.data.results || response.data;
        setActions(data);
      } catch (error) {
        console.error("Error when searching actions: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchActions();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-row ">
        <Sidebar />
        <main className="min-w-screen pl-6 font-['Barlow_Semi_Condensed'] gap-5 flex items-center">
          <div className="flex flex-col">
            <section className="bg-linear-to-r w-246 p-10 h-100 from-[#279A94] to-[#C673EC] flex flex-col gap-5 text-white">
              <h1 className="text-6xl font-bold">Became a Voluntary</h1>
              <h1 className="text-6xl font-bold">Helping in Actions</h1>
              <button
                className="bg-[#000000] rounded-xl w-40 text-center items-center cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Known Here!
              </button>
            </section>
            <section className="w-full flex flex-col justify-center text-center items-center">
              <h1 className="bg-gradient-to-r text-4xl from-[#279993] to-[#9A87E6] bg-clip-text text-transparent">
                Some Actions
              </h1>
            </section>

            {loading ? (
              <p className="text-center mt-10">Loading...</p>
            ) : (
              <section className="grid grid-cols-3 gap-6 mt-10">
                {actions.map((action) => (
                  <ActionCard
                    key={action.id}
                    title={action.title}
                    description={action.description}
                    image={action.image}
                  />
                ))}
              </section>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
