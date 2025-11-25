"use client"
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import { useRouter } from "next/navigation";

export default function RegisterForm() {

  const [name, setname] =useState("");
  const [phone, setphone]= useState("");
  const [email, setemail]= useState("");
  const [password, setpasswrod]= useState("");
  const route = useRouter()


  const handleSubmit = async (e:any) =>{
    e.preventDefault();

    if (!name || !phone || !email || !password){
      toast.error("completa todos los campos")
      return;
    }
    try {
    const res = await axios.post("/api/register",{name,phone,email,password})

    toast.success("Gracias por registrarte");
      
    if (res){
      const form = e.target;
      form.reset();
      route.push("/")
    }

    }catch(error){
      console.log(error);
      toast.error("Error al registrar usuario");

    }

  }

      return (
        <div className="grid place-items-center h-screen">
          <div className="shadow-lg p-5  border-t-4 border-green-400 bg-white ">
            <h1 className="text-xl font-bold my-4">Registrate</h1>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input
                onChange={(e)=> setname(e.target.value)}
                type="text" 
                placeholder="Nombre Completo"></input>
                <input
                onChange={(e)=> setphone(e.target.value)}
                type="number" 
                placeholder="numero de telefono"></input>
                <input
                onChange={(e)=> setemail(e.target.value)}
                type="email" 
                placeholder="ingresa email"></input>
                <input
                onChange={(e)=> setpasswrod(e.target.value)}
                type="password"
                placeholder="password" 
                /> 
                <button
                type="submit"
                className="bg-blue-600 text-white font-bold px-6 py-2 rounded border-t-4 border-green-400 cursor-pointer"
                >
                Registrate
                </button>
        
                <Link className="text-sm mt-3 text-right" href={"/login"}>
                    ¿Ya tienes cuenta? <span className="underline">Inicia Sesion </span>
                </Link>
            </form>
            </div>
            <ToastContainer />
      
        </div>
        
      );
}