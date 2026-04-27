import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Switch from "@mui/material/Switch";
import connectImage from "../assets/Connect_2.png";
import { useState } from "react";

export function Register() {
  const navigate = useNavigate();
  const [isVolunteer, setIsVolunteer] = useState(false);

  const registerSchema = z.object({
    username: z.string().min(3, "Minimum 3 characters"),
    password: z.string().min(4, "Minimum 4 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        username: data.username,
        password: data.password,
        role: isVolunteer ? "volunteer" : "institution",
      };

      await axios.post(
        "http://127.0.0.1:8000/api/custom_user/list_create_view",
        payload
      );

      alert("User created successfully!");
      navigate("/");
    } catch (error) {
      alert("Error creating user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#279A94] to-[#C673EC]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96">
        <img className="h-16 mx-auto mb-4" src={connectImage} />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-center">Register</h1>

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
            Register
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="border h-10 rounded-lg"
          >
            I have login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;