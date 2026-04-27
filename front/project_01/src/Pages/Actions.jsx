import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";

export function Actions() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    async function fetchActions() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/action/list_create_view",
        );

        setActions(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchActions();
  }, []);

  return (
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
  );
}

export default Actions;
