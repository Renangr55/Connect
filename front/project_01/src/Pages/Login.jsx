import React from "react";
import connectImage from "../assets/Connect_2.png";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const navigate = useNavigate();

  const loginUserSchema = z.object({
    username: z
      .string()
      .nonempty("Username is required")
      .regex(/^[A-Za-z]+$/i, "Only letters are allowed"),
    password: z.string().nonempty("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex justify-center flex-col items-center max-w-500">
      <img className="h-20 w-50" src={connectImage}></img>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 bg-linear-to-t flex-col flex from-[#279A94] to-[#C673EC] text-white"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <label htmlFor="username">
          <strong>Username</strong>
        </label>
        <input
          {...register("username")}
          className="bg-white p-2 text-2xl text-black"
          type="text"
          placeholder="Username"
          name="username"
          required
        ></input>
        {errors.username && (
          <span className="bg-red-600">{errors.username.message}</span>
        )}
        <label htmlFor="password">
          <strong>Password</strong>
        </label>
        <input
          {...register("password")}
          className="bg-white p-2 text-2xl text-black"
          type="password"
          placeholder="Password"
          name="password"
          required
        ></input>
        {errors.password && (
          <span className="bg-red-600">{errors.password.message}</span>
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
              e.preventDefault;
              navigate("/register/");
            }}
            className="h-10 border w-50 cursor-pointer transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#279A94] border-white"
          >
            I don't have login
          </button>
        </section>
      </form>
    </div>
  );
}

export default Login;
