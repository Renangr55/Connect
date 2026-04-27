import React from "react";
import connectImage from "../assets/Connect_2.png";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export function Login() {
  const navigate = useNavigate();

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
        "http://localhost:8000/api/token/",
        data
      );

      const { access, refresh, role } = response.data;

      // 🔐 salva tokens e dados
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("role", role);

      // 👇 salva username (ESSENCIAL)
      localStorage.setItem("username", data.username);

      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#279A94] to-[#C673EC]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96">
        <img className="h-16 mx-auto mb-4" src={connectImage} alt="Logo" />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <label>Username</label>
          <input
            {...register("username")}
            className="bg-gray-200 p-2 rounded-lg"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}

          <label>Password</label>
          <input
            {...register("password")}
            type="password"
            className="bg-gray-200 p-2 rounded-lg"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <button className="bg-black text-white h-10 rounded-lg mt-3 hover:opacity-90 transition">
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="border h-10 rounded-lg hover:bg-gray-100 transition"
          >
            I don't have login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;