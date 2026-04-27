import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";

export function Actions() {
  const [actions, setActions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchActions() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/action/list_create_view"
        );

        const data = response.data.results || response.data;
        setActions(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchActions();
  }, []);

  return (
    <div className="p-6">
      
      {/* 🔥 BOTÃO IR PARA CRUD */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/actions-crud")}
          className="bg-black text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Go to CRUD
        </button>
      </div>

      {/* LISTA DE CARDS */}
      <div className="flex flex-wrap gap-4">
        {actions.map((action) => (
          <Card
            key={action.id}
            title={action.title}
            image={action.image}
            id={action.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Actions;
