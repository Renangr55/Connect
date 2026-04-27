import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import axios from "axios";

const Profile = () => {
  const [volunteer, setVolunteer] = useState(null);

  const [day, setDay] = useState("");
  const [period, setPeriod] = useState("");
  const [avaliabilities, setAvaliabilities] = useState([]);

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const token = localStorage.getItem("access_token");

  // =========================
  // LOAD PROFILE
  // =========================
  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        console.log("📡 GET /api/volunteer/me/");

        const response = await axios.get(
          "http://localhost:8000/api/volunteer/me/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ PROFILE RESPONSE:", response.data);

        setVolunteer(response.data);
        setAvaliabilities(response.data.avaliabilities || []);
        setSkills(response.data.skills || []);
      } catch (error) {
        console.error("❌ PROFILE ERROR:", error);
      }
    };

    fetchVolunteer();
  }, []);

  // =========================
  // SAVE SKILLS
  // =========================
  const saveSkills = async (updatedSkills) => {
    try {
      const payload = {
        skills_ids: updatedSkills.map((s) => s.id),
      };

      console.log("📤 PATCH SKILLS PAYLOAD:", payload);

      const res = await axios.patch(
        "http://localhost:8000/api/volunteer/me/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ SKILLS SAVED:", res.data);
    } catch (error) {
      console.error(
        "❌ ERROR SAVING SKILLS:",
        error.response?.data || error.message
      );
    }
  };

  // =========================
  // ADD SKILL
  // =========================
  const addSkill = async () => {
    if (!skillInput) return;

    const payload = {
      name: skillInput,
      skills_description: "sem descrição", // ou "" se aceitar
    };

    try {
      // 1. cria no backend
      const response = await axios.post(
        "http://localhost:8000/api/skill/list_create_view",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newSkill = response.data.data || response.data;

      // 2. atualiza estado com ID real
      const updated = [...skills, newSkill];

      console.log("➕ ADD SKILL:", newSkill);
      console.log("📦 UPDATED SKILLS:", updated);

      setSkills(updated);
      setSkillInput("");

      // 3. salva no volunteer
      await saveSkills(updated);

    } catch (error) {
      console.error("❌ Error adding skill:", error);
    }
  };

  // =========================
  // ADD AVAILABILITY
  // =========================
  const addAvailability = async () => {
    if (!day || !period) {
      console.log("⚠️ day ou period vazio");
      return;
    }

    const newItem = { day, period };

    console.log("📤 ADD AVAILABILITY:", newItem);

    const updated = [...avaliabilities, newItem];
    setAvaliabilities(updated);

    setDay("");
    setPeriod("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/availability/list_create_view/",
        newItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ AVAILABILITY SAVED:", res.data);
    } catch (error) {
      console.error(
        "❌ ERROR SAVING AVAILABILITY:",
        error.response?.status,
        error.response?.data || error.message
      );
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-50 flex flex-col">
        <main className="px-8 py-6 flex-grow">

          <div className="bg-white p-6 rounded-2xl shadow mb-8">
            <h2 className="text-2xl font-bold">
              {localStorage.getItem("username")}
            </h2>

            <p className="text-gray-500 mt-2">
              {volunteer?.context || "No description"}
            </p>
          </div>

          {/* SKILLS */}
          <div className="bg-white p-6 rounded-2xl shadow mb-8">
            <h3 className="text-xl font-bold mb-4">Skills</h3>

            <div className="flex gap-2 mb-4">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skill"
                className="border p-2 rounded w-full"
              />

              <button
                onClick={addSkill}
                className="bg-blue-600 text-white px-4 rounded"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* AVAILABILITY */}
          <div className="bg-white p-6 rounded-2xl shadow mb-8">
            <h3 className="text-xl font-bold mb-4">Availability</h3>

            <div className="flex gap-2 mb-4">
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Day</option>
                <option value="mon">Monday</option>
                <option value="tue">Tuesday</option>
                <option value="wed">Wednesday</option>
                <option value="thu">Thursday</option>
                <option value="fri">Friday</option>
                <option value="sat">Saturday</option>
                <option value="sun">Sunday</option>
              </select>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Period</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>

              <button
                onClick={addAvailability}
                className="bg-green-600 text-white px-4 rounded"
              >
                Add
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {avaliabilities.map((a, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded">
                  {a.day} - {a.period}
                </div>
              ))}
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Profile;