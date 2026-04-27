import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
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

      console.log(payload);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/custom_user/list_create_view",
        payload,
      );

      console.log(response.data);

      alert("User created suscessfully!");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex justify-center flex-col items-center">
      {/* LOGO */}
      <img className="h-20 w-50 mb-4" src={connectImage} />

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 flex flex-col gap-4 text-white 
        bg-gradient-to-t from-[#279A94] to-[#C673EC] rounded-md w-96"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        {/* USERNAME */}
        <label>
          <strong>Name</strong>
        </label>
        <input {...register("username")} className="bg-white p-2 text-black" />
        {errors.username && (
          <span className="bg-red-600 p-1 rounded text-sm">
            {errors.username.message}
          </span>
        )}

        {/* PASSWORD */}
        <label>
          <strong>Password</strong>
        </label>
        <input
          {...register("password")}
          type="password"
          className="bg-white p-2 text-black"
        />
        {errors.password && (
          <span className="bg-red-600 p-1 rounded text-sm">
            {errors.password.message}
          </span>
        )}

        {/* SWITCH BONITO */}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isVolunteer}
                onChange={(e) => setIsVolunteer(e.target.checked)}
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
            label="Voluntário"
          />
        </FormGroup>

        {/* BOTÕES */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <button
            type="submit"
            className="h-10 w-50 bg-black font-bold 
            hover:scale-110 transition"
          >
            Register
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="h-10 w-50 border border-white 
            hover:bg-[#279A94] transition"
          >
            I have Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
