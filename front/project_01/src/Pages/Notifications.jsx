import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Check, X, Clock, MapPin } from "lucide-react";

export function Notifications() {
  const role = localStorage.getItem("role"); // "volunteer" ou "institution"

  const notifications =
    role === "institution"
      ? [
          {
            title: "Nova solicitação",
            description: "João quer participar da ação 'Ajuda Animal'",
            icon: MapPin,
            color: "bg-[#D5B8FF]",
            action: true,
          },
          {
            title: "Nova solicitação",
            description: "Maria quer participar da ação 'Doação de alimentos'",
            icon: MapPin,
            color: "bg-[#D5B8FF]",
            action: true,
          },
        ]
      : [
          {
            title: "Solicitação aprovada",
            description: "Instituição aceitou a sua inscrição",
            icon: Check,
            color: "bg-[#BDE4FF]",
            active: true,
          },
          {
            title: "Solicitação recusada",
            description: "Sua solicitação foi recusada",
            icon: X,
            color: "bg-[#FFB8C0]",
          },
          {
            title: "Lembrete",
            description: "Você tem uma ação agendada para hoje às 16h",
            icon: Clock,
            color: "bg-[#B9F5CC]",
          },
        ];

  return (
    <>
      <Header />

      <div className="flex min-h-screen bg-[#DCDCDC] font-['Barlow_Semi_Condensed']">
        <aside className="w-[250px] bg-white shrink-0">
          <Sidebar />
        </aside>

        <main className="flex-1">
          {/* HEADER */}
          <section className="h-[130px] bg-gradient-to-r from-[#188DA8] to-[#72519C] px-12 pt-11 text-white">
            <h1 className="text-[20px] font-bold">Notificações</h1>
            <p className="text-[14px]">
              Acompanhe tudo o que está acontecendo
            </p>
          </section>

          {/* FILTRO */}
          <section className="h-[54px] bg-white flex items-center justify-center gap-[320px] text-[15px]">
            <button className="text-[#7650FF]">Todas</button>

            <button className="flex items-center gap-1 text-black">
              Não lidas
              <span className="bg-[#7650FF] text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-[12px] font-bold">
                {notifications.length}
              </span>
            </button>
          </section>

          {/* LISTA */}
          <section className="py-4 flex flex-col gap-4 items-center">
            {notifications.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className={`bg-white w-[88%] max-w-[680px] min-h-[68px] shadow-[0_4px_8px_rgba(0,0,0,0.25)] flex items-center px-3 ${
                    item.active ? "border-[3px] border-[#18A8FF]" : ""
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

                  {/* TEXTO */}
                  <div className="flex-1">
                    <h2 className="text-[16px] font-bold text-black">
                      {item.title}
                    </h2>

                    <p className="text-[14px] text-[#555]">
                      {item.description}
                    </p>

                    {/* BOTÕES (instituição) */}
                    {item.action && (
                      <div className="flex gap-2 mt-2">
                        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                          Aceitar
                        </button>

                        <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
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

export default Notifications;