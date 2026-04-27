import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Check, X, Clock, MapPin } from "lucide-react";
import axios from "axios";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  // 🔹 MAPA DE ÍCONES (baseado no backend)
  const iconMap = {
    request: MapPin,
    response: Check,
  };

  // 🔹 FETCH DA API
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const token = localStorage.getItem("access");

        const response = await axios.get(
          "http://localhost:8000/api/notification/list_create_view",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // 🔥 suporta paginação ou lista direta
        const data = response.data.results || response.data;

        setNotifications(data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    }

    fetchNotifications();
  }, []);

  // 🔹 CONTADOR DE NÃO LIDAS
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.is_read).length;
  }, [notifications]);

  // 🔹 MARCAR COMO LIDA (FRONT)
  async function markAsRead(id) {
    try {
      const token = localStorage.getItem("access");

      await axios.patch(
        `http://localhost:8000/api/notifications/read/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
      );
    } catch (error) {
      console.error("Erro ao marcar como lida:", error);
    }
  }

  function handleAccept(id) {
    console.log("Aceitar:", id);
    markAsRead(id);
  }

  function handleReject(id) {
    console.log("Recusar:", id);
    markAsRead(id);
  }

  return (
    <div className="flex min-h-screen bg-[#DCDCDC]">
      {/* SIDEBAR */}
      <aside className="w-[250px] bg-white">
        <Sidebar />
      </aside>

      <main className="flex-1">
        {/* HEADER */}
        <section className="h-[130px] bg-gradient-to-r from-[#188DA8] to-[#72519C] px-12 pt-11 text-white">
          <h1 className="text-[20px] font-bold">Notificações</h1>
          <p className="text-[14px]">Acompanhe tudo o que está acontecendo</p>
        </section>

        {/* FILTRO */}
        <section className="h-[54px] bg-white flex items-center justify-around px-10 text-[15px]">
          <button className="text-[#7650FF]">Todas</button>

          <button className="flex items-center gap-2">
            Não lidas
            <span className="bg-[#7650FF] text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-[12px]">
              {unreadCount}
            </span>
          </button>
        </section>

        {/* LISTA */}
        <section className="py-6 flex flex-col gap-4 items-center">
          {notifications.map((item) => {
            const Icon = iconMap[item.type] || Check;

            return (
              <div
                key={item.id}
                className={`bg-white w-[88%] max-w-[680px] min-h-[68px] shadow flex items-center px-3 ${
                  !item.is_read ? "border-[3px] border-[#18A8FF]" : ""
                }`}
              >
                {/* ICON */}
                <div className="w-[43px] h-[34px] flex items-center justify-center mr-3 bg-gray-200">
                  <Icon size={14} />
                </div>

                {/* TEXTO */}
                <div className="flex-1">
                  <h2 className="text-[16px] font-bold">{item.title}</h2>

                  <p className="text-[14px] text-[#555]">{item.message}</p>

                  {/* AÇÕES (se for request) */}
                  {item.type === "request" && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAccept(item.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Aceitar
                      </button>

                      <button
                        onClick={() => handleReject(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Recusar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default NotificationsPage;
