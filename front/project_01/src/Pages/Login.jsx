import React from "react";
import connectImage from "../assets/Connect_2.png";

export function Login() {
  return (
    <div className="min-h-screen flex justify-center flex-col items-center max-w-500">
      <img className="h-20 w-50" src={connectImage}></img>
      <form className="p-5 bg-linear-to-t flex-col flex from-[#279A94] to-[#C673EC] text-white">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <label for="uname">
          <strong>Nome</strong>
        </label>
        <input
          className="bg-white p-2 text-2xl text-black"
          type="text"
          placeholder="Nome"
          name="uname"
          required
        ></input>
        <label for="psw">
          <strong>Senha</strong>
        </label>
        <input
          className="bg-white p-2 text-2xl text-black"
          type="password"
          placeholder="Senha"
          name="psw"
          required
        ></input>
        <label className="relative inline-block w-60 h-34 ">
          <input className="opacity-0 w-0 h-0" type="checkbox"></input>
          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] "></span>
        </label>
        <section className="flex flex-col text-center items-center gap-3">
          <button className="h-10 font-bold w-50 cursor-pointer ease-in-out hover:scale-110 bg-black">
            Login
          </button>
          <button className="h-10 border w-50 cursor-pointer ease-in-out hover:scale-110 border-white">
            Não tenho cadastro
          </button>
        </section>
      </form>
    </div>
  );
}

export default Login;
