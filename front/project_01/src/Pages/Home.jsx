import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router";
import { ActionCard } from "../Components/ActionCard";
import axios from "axios";
import Footer from "../Components/Footer";

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
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo */}
      <div className="ml-64 flex flex-col min-h-screen w-full">
        <main className="flex-grow">
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

          {/* BANNER */}
          <section className="relative h-80 flex items-center justify-center text-center text-white">
            {/* imagem */}
            <div className="absolute inset-0 bg-[url('/src/assets/wallpaper.jpeg')] bg-cover bg-center"></div>

            {/* overlay escuro */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* conteúdo */}
            <div className="relative z-10 px-4">
              <h1 className="text-4xl font-bold mb-4">
                Institutions Are Looking for Volunteers
              </h1>
              <p className="max-w-xl mx-auto">
                Many communities need your help right now. Join initiatives,
                support families, and make a real difference in people's lives.
              </p>
            </div>
          </section>

          {/* BENEFÍCIOS */}
          <section className="py-12 px-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-center mb-10">
              Why Use Our Platform?
            </h1>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-white rounded-xl shadow">
                <h2 className="font-bold text-xl mb-2">Easy Connection</h2>
                <p>
                  Find volunteer opportunities and connect with trusted
                  institutions easily.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow">
                <h2 className="font-bold text-xl mb-2">Real Impact</h2>
                <p>
                  Participate in actions that truly help communities recover.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow">
                <h2 className="font-bold text-xl mb-2">Virtual Assistant</h2>
                <p>
                  Use our AI assistant to discover opportunities and get help
                  instantly.
                </p>
              </div>
            </div>
          </section>

          {/* CARDS */}
          <section className="flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-[#279993] to-[#9A87E6] bg-clip-text text-transparent">
              Some Actions
            </h1>

            <div className="flex flex-wrap justify-center gap-6">
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
                  Volunteers help rebuild communities and support families.
                </p>
              </div>

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
                  Restoring homes and essential services.
                </p>
              </div>

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
                  Strengthening communities through collaboration.
                </p>
              </div>
            </div>
          </section>

          {/* LISTA */}
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

        {/* Footer agora correto */}
        <Footer />
      </div>
    </div>
  );
}

export default Home;