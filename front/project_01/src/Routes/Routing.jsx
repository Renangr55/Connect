import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { Home } from "../Pages/Home";
import Header from "../Components/Header";

function Routing() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/home/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
