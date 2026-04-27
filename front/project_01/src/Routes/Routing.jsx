import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { Home } from "../Pages/Home";
import { Chatbot } from "../Pages/Chatbot";
import { Actions } from "../Pages/Actions";
import NotificationsPage from "../Pages/NotificationsPage";
import Profile from "../Pages/profile";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/home/" element={<Home />} />
        <Route path="/watson/" element={<Chatbot />} />
        <Route path="/notifications/" element={<NotificationsPage />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/actions" element={<Actions />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
