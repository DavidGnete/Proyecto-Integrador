"use client";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  
  const [email, setemail] =useState ("");
  const [password, setpasswrod] = useState ("");
  const route = useRouter();
  const { login } = useAuth();


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://work-point-9be66ef1d8d3.herokuapp.com/api/Auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Asumir que el backend devuelve un token o algo
      console.log("Login exitoso:", res.data);

      // Guardar token en localStorage si viene
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        login(res.data.token);
      }

      toast.success("Inicio de sesión exitoso");
      route.push("/Home");

    } catch (error: any) {
      console.log("Error en login:", error);
      const badMessage = error.response?.data?.message || error.response?.data?.error || error.message;
      toast.error(badMessage || "Usuario o contraseña incorrectos");
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5  border-t-4 border-green-400 bg-white border-">
        <h1 className="text-xl font-bold my-4">Ingresa a la plataforma</h1>
        
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

        <input
        onChange={(e) =>setemail(e.target.value)}
        type="email" 
        
        placeholder="ingresa email" />
        <input
        onChange={(e)=> setpasswrod(e.target.value)}
        type="password"
        placeholder="password" 
        /> 
        <button
          className="bg-blue-600 text-white font-bold px-6 py-2 rounded border-t-4 border-green-400 cursor-pointer"
        >
          Sign In
        </button>

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            ¿No tienes cuenta? <span className="underline">Registrate </span>
          </Link>
        </form>
        </div>
        <ToastContainer />
  
    </div>
    
    
  );
}
