import React, { useState } from "react";
import connectImage from "../assets/Connect_2.png";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function Login() {
  const navigate = useNavigate();
  const [isVolunteer, setIsVolunteer] = useState(false);

  const loginUserSchema = z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/token_obtain",
        data
      );

      const access = response.data.access;
      const decoded = jwtDecode(access);

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("role", decoded.role);

      navigate("/home");
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#279A94] to-[#C673EC]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96">
        <img className="h-16 mx-auto mb-4" src={connectImage} />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <label>Username</label>
          <input
            {...register("username")}
            className="bg-gray-200 p-2 rounded-lg"
          />
          {errors.username && <span>{errors.username.message}</span>}

          <label>Password</label>
          <input
            {...register("password")}
            type="password"
            className="bg-gray-200 p-2 rounded-lg"
          />
          {errors.password && <span>{errors.password.message}</span>}

          {/* SWITCH UX */}
          <div className="flex items-center justify-between mt-2">
            <span className={!isVolunteer ? "font-bold" : "text-gray-400"}>
              Institution
            </span>

            <Switch
              checked={isVolunteer}
              onChange={(e) => setIsVolunteer(e.target.checked)}
            />

            <span className={isVolunteer ? "font-bold" : "text-gray-400"}>
              Voluntary
            </span>
          </div>

          <button className="bg-black text-white h-10 rounded-lg mt-3">
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="border h-10 rounded-lg"
          >
            I don't have login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;