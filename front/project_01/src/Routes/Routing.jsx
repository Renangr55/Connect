import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { Home } from "../Pages/Home";
import { Chatbot } from "../Pages/Chatbot";
import NotificationsPage from "../Pages/NotificationsPage"
import Header from "../Components/Header";

function Routing() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/home/" element={<Home />} />
        <Route path="/watson/" element={<Chatbot/>} />
        <Route path="/notifications/" element={<NotificationsPage/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
