import React, { useState } from "react";
import connectImage from "../assets/Connect_2.png";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export function Login({
  nameLogin,
  labelPassword,
  inputPassword,
  labelName,
  inputName,
  toggleSwitch,
  button1,
  button2,
}) {
  const label = { slotProps: { input: { "aria-label": "Switch Mode" } } };

  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/custom_user/list_create_view",
        );

        console.log(response.data);

        const data = response.data.results || response.data;
        setUser(data);
      } catch (error) {
        console.error("Error", error);
      }
    }
  }, []);

  const loginUserSchema = z.object({
    username: z
      .string()
      .nonempty("Username is required"),
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
        data,
      );

      const access = response.data.access;

      const decoded = jwtDecode(access);

      console.log(decoded);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("role", decoded.role);

      console.log("Login success:", response.data);

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center flex-col items-center max-w-500">
      <img className="h-20 w-50" src={connectImage}></img>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 bg-linear-to-t flex-col flex from-[#279A94] to-[#C673EC] text-white"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <label>
          <strong>Username</strong>
        </label>
        <input
          {...register("username")}
          className="bg-white p-2 text-2xl text-black"
          placeholder="Username"
        ></input>
        {errors.username && (
          <span className="bg-red-600 p-1 rounded">
            {errors.username.message}
          </span>
        )}
        <label>
          <strong>Password</strong>
        </label>
        <input
          {...register("password")}
          className="bg-white p-2 text-2xl text-black"
          type="password"
          placeholder="Password"
        ></input>
        {errors.password && (
          <span className="bg-red-600 p-1 rounded">
            {errors.password.message}
          </span>
        )}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#fff",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    background: "#6a1b9a",
                  },
                  "& .MuiSwitch-track": {
                    background: "#ccc",
                  },
                }}
              />
            }
            label="Voluntary"
          ></FormControlLabel>
        </FormGroup>
        <section className="flex flex-col text-center items-center gap-3">
          <button
            type="submit"
            className="h-10 font-bold w-50 cursor-pointer transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 bg-black"
          >
            Login
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register/");
            }}
            className="h-10 border w-50 cursor-pointer transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#279A94] border-white"
          >
            I don't have login!
          </button>
        </section>
      </form>
    </div>
  );
}

export default Login;
