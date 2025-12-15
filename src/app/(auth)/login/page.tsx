"use client";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Navbar() {
  
  const [email, setemail] =useState ("");
  const [password, setpasswrod] = useState ("");
  const route = useRouter();


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Inicio de sesión exitoso");
        route.push("/Home");
      } else {
        toast.error("Usuario o contraseña incorrectos");
      }
    } catch (error: any) {
      console.log("Error en login:", error);
      toast.error("Error en el servidor");
    }
  };
  return (
    <div className="grid place-items-center min-h-screen p-4">
      <div className="shadow-lg p-6 sm:p-8 border-t-4 border-green-400 bg-white border- w-full max-w-md">
        <h1 className="text-xl font-bold my-4">Ingresa a la plataforma</h1>
        
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

        <input
        onChange={(e) =>setemail(e.target.value)}
        type="email" 
        
        placeholder="ingresa email"
        className="p-3 border rounded"
        />
        <input
        onChange={(e)=> setpasswrod(e.target.value)}
        type="password"
        placeholder="password" 
        className="p-3 border rounded"
        /> 
        <button
          className="bg-blue-600 text-white font-bold px-6 py-2 rounded border-t-4 border-green-400 cursor-pointer hover:bg-blue-700"
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
