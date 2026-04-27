import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export function Chatbot(){
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Good day! How may I assist you today?" }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(){
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/chat",
        {
          message: input
        }
      );

      setMessages((prev) => [
        ...prev,
        {
        	role: "assistant",
          	content: response.data.data.response || "Sem resposta 😢"
        }
      ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erro ao conectar com o servidor 😢"
        }
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Connect</h1>

	  <section className="flex flex-col">
		<Link to="/home/">Home</Link>
		<Link to="/dashboard">Profile</Link>
		<Link to="/notifications/">Notification</Link>
		<Link to="/dashboard">Chat</Link>
		<Link to="/dashboard">Action</Link>
		
	  </section>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col justify-between">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-4xl mx-auto w-full">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-xl max-w-lg ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white shadow"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-xl shadow">
                digitando...
              </div>
            </div>
          )}

        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-full px-4 py-2 outline-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
            >
              ➤
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}