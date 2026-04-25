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
        <section className="">
          <button>Login</button>
          <button>Não tenho cadastro</button>
        </section>
      </form>
    </div>
  );
}

export default Login;
