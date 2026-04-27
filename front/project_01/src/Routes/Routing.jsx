import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { Home } from "../Pages/Home";
import { Chatbot } from "../Pages/Chatbot";
import { Actions } from "../Pages/Actions";
import NotificationsPage from "../Pages/NotificationsPage";
import Profile from "../Pages/profile";
import { PrivateRoute } from "./PrivateRoute";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        {/* públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register/" element={<Register />} />

        {/* protegidas */}
        <Route
          path="/home/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/watson/"
          element={
            <PrivateRoute>
              <Chatbot />
            </PrivateRoute>
          }
        />

        <Route
          path="/notifications/"
          element={
            <PrivateRoute>
              <NotificationsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/actions"
          element={
            <PrivateRoute>
              <Actions />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;