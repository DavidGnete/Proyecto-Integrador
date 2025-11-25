"use client";
import { ToastContainer, toast } from 'react-toastify';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";

export default function Navbar() {
  
  const [email, setemail] =useState ("");
  const [password, setpasswrod] = useState ("");
  const route = useRouter()


  const handleSubmit =async (e:any) => {
    e.preventDefault()

    try {
      const res= await signIn("credentials",{
        email,password,
        redirect: false,
      });
        if (res?.error) {
      toast.error("Usuario o contraseña incorrectos");
      return;
      }
      route.push("/Home")
    }catch(error){
      console.log(error);
      toast.error("usuario no registrado");
    }

}
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

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/Home" })}
          className="bg-blue-600 text-white font-bold px-6 py-2 rounded border-green-400 w-fit cursor-pointer"
        >
          Google
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
