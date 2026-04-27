import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Check, X, Clock, MapPin } from "lucide-react";

function NotificationsPage() {
  const role = localStorage.getItem("role") || "volunteer";

  const initialNotifications = useMemo(() => {
    return role === "institution"
      ? [
          {
            id: 1,
            title: "Nova solicitação",
            description: "João quer participar da ação 'Ajuda Animal'",
            icon: MapPin,
            color: "bg-[#D5B8FF]",
            action: true,
            read: false,
          },
          {
            id: 2,
            title: "Nova solicitação",
            description: "Maria quer participar da ação 'Doação de alimentos'",
            icon: MapPin,
            color: "bg-[#D5B8FF]",
            action: true,
            read: false,
          },
        ]
      : [
          {
            id: 3,
            title: "Solicitação aprovada",
            description: "Instituição aceitou sua inscrição",
            icon: Check,
            color: "bg-[#BDE4FF]",
            read: false,
          },
          {
            id: 4,
            title: "Solicitação recusada",
            description: "Sua solicitação foi recusada",
            icon: X,
            color: "bg-[#FFB8C0]",
            read: false,
          },
          {
            id: 5,
            title: "Lembrete",
            description: "Você tem uma ação hoje às 16h",
            icon: Clock,
            color: "bg-[#B9F5CC]",
            read: false,
          },
        ];
  }, [role]);

  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  function markAsRead(id) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
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
    <>
      <Header />

      <div className="flex min-h-screen bg-[#DCDCDC]">
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
              const Icon = item.icon || Check;

              return (
                <div
                  key={item.id}
                  className={`bg-white w-[88%] max-w-[680px] min-h-[68px] shadow flex items-center px-3 ${
                    !item.read ? "border-[3px] border-[#18A8FF]" : ""
                  }`}
                >
                  {/* ICON */}
                  <div
                    className={`${item.color} w-[43px] h-[34px] flex items-center justify-center mr-3`}
                  >
                    <div className="bg-black rounded-full w-[22px] h-[22px] flex items-center justify-center">
                      <Icon size={14} color="white" />
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className="flex-1">
                    <h2 className="text-[16px] font-bold">{item.title}</h2>
                    <p className="text-[14px] text-[#555]">
                      {item.description}
                    </p>

                    {item.action && (
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
    </>
  );
}

export default NotificationsPage;