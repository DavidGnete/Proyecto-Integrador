"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [documentTypeId, setdocumentTypeId] = useState("");
  const [numDocument, setNumDocument] = useState("");
  const [roleId] = useState(1); 

  const route = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      userName,
      name,
      lastName,
      phone,
      email,
      password,
      documentTypeId: Number(documentTypeId),
      numDocument,
      roleId
    };

    console.log("Datos que se enviarán al backend:", data);

    try {
      const res = await axios.post(
        "https://work-point-9be66ef1d8d3.herokuapp.com/api/Auth/register",
        data, // se envía el objeto correcto
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Gracias por registrarte");
      console.log("Status del request:", res.status);

      e.target.reset();
      route.push("/");

    } catch (error: any) {
      console.log("Error:", error.response?.data || error.message);
      toast.error("Error al registrar usuario");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 border-t-4 border-green-400 bg-white ">
        <h1 className="text-xl font-bold my-4">Registrate</h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder="User Name" />
          <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Nombre" />
          <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Apellido" />
          <input onChange={(e) => setNumDocument(e.target.value)} type="text" placeholder="Número de documento" />
          <input onChange={(e) => setdocumentTypeId(e.target.value)} type="number" placeholder="Tipo documento (ej: 3)" />
          <input onChange={(e) => setphone(e.target.value)} type="text" placeholder="Número de teléfono" />
          <input onChange={(e) => setemail(e.target.value)} type="email" placeholder="Ingresa email" />
          <input onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" />

          <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2 rounded border-t-4 border-green-400 cursor-pointer">
            Registrate
          </button>

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            ¿Ya tienes cuenta? <span className="underline">Inicia Sesión</span>
          </Link>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
