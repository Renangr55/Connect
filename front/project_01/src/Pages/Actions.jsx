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
        const token = localStorage.getItem("access_token");

        const response = await axios.get(
          "http://localhost:8000/api/action/list_create_view",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("ACTIONS RESPONSE:", response.data);

        const data = response.data.results || response.data;
        setActions(data);

      } catch (error) {
        console.error("ERROR LOADING ACTIONS:", error.response?.data || error.message);
      }
    }

    fetchActions();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/actions-crud")}
          className="bg-black text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Go to CRUD
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {actions.map((action) => (
          <Card
            key={action.id}
            title={action.title}
            image={action.image || "no image"}
            id={action.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Actions;