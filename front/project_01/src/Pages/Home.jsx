import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router";
import { ActionCard } from "../Components/ActionCard";
import axios from "axios";

import SocialVulnerability from "../assets/vulnerabilidadesocial.jpg";
import ChildrenSocialVulnerability from "../assets/vulnerabilidadeSocialInfantil.jpg";

export function Home() {
  const navigate = useNavigate();
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActions() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/action/list_create_view/"
        );

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
    <div className="flex">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="ml-64 w-full">
        {/* HERO */}
        <section className="bg-gradient-to-r from-[#279A94] to-[#C673EC] p-10 text-white flex flex-col gap-5">
          <h1 className="text-5xl font-bold">Become a Volunteer</h1>
          <h2 className="text-4xl font-semibold">Helping in Actions</h2>

          <button
            className="bg-black rounded-xl w-40 py-2 hover:scale-110 transition"
            onClick={() => navigate("/")}
          >
            Know More
          </button>
        </section>

        {/* CARDS FIXOS */}
        <section className="flex flex-col items-center py-10">
          <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-[#279993] to-[#9A87E6] bg-clip-text text-transparent">
            Some Actions
          </h1>

          <div className="flex flex-wrap justify-center gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-r from-[#279A94] to-[#C673EC] rounded-2xl w-80 p-4">
              <img
                className="w-full h-40 object-cover rounded-lg"
                src={ChildrenSocialVulnerability}
                alt=""
              />
              <h2 className="text-xl font-bold text-white mt-4 text-center">
                Social Vulnerability
              </h2>
              <p className="text-white text-center text-sm mt-2">
                Volunteers play a crucial role by providing support, food,
                emotional care, and helping rebuild communities.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-r from-[#279A94] to-[#C673EC] rounded-2xl w-80 p-4">
              <img
                className="w-full h-40 object-cover rounded-lg"
                src={SocialVulnerability}
                alt=""
              />
              <h2 className="text-xl font-bold text-white mt-4 text-center">
                Infrastructure Recovery
              </h2>
              <p className="text-white text-center text-sm mt-2">
                Rebuilding homes and infrastructure to restore safe living
                conditions and reconnect communities.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-r from-[#279A94] to-[#C673EC] rounded-2xl w-80 p-4">
              <img
                className="w-full h-40 object-cover rounded-lg"
                src={SocialVulnerability}
                alt=""
              />
              <h2 className="text-xl font-bold text-white mt-4 text-center">
                Community Support
              </h2>
              <p className="text-white text-center text-sm mt-2">
                Helping communities recover through collective action and
                volunteer engagement.
              </p>
            </div>
          </div>
        </section>

        {/* LISTA DINÂMICA */}
        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
      </main>
    </div>
  );
}

export default Home;