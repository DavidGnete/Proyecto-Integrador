"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numDocument, setNumDocument] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [docError, setDocError] = useState("");


  const router = useRouter();

  // Función para verificar email único
  const checkEmailUniqueness = async (email: string) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return; // Solo si es válido

    try {
      const res = await axios.get(
        `https://work-point-9be66ef1d8d3.herokuapp.com/api/Auth/check-email?email=${encodeURIComponent(email)}`
      );
      if (res.data?.exists) {
        setEmailError("Este correo ya está registrado");
      } else {
        setEmailError("");
      }
    } catch (error) {
      // Si el endpoint no existe, ignorar (no mostrar error)
      console.log("Endpoint check-email no disponible:", error);
    }
  };

  // Función para verificar documento único
  const checkDocumentUniqueness = async (numDocument: string) => {
    if (!numDocument || !/^\d+$/.test(numDocument)) return; // Solo si es válido

    try {
      const res = await axios.get(
        `https://work-point-9be66ef1d8d3.herokuapp.com/api/Auth/check-document?numDocument=${encodeURIComponent(numDocument)}`
      );
      if (res.data?.exists) {
        setDocError("Este número de documento ya está registrado");
      } else {
        setDocError("");
      }
    } catch (error) {
      // Si el endpoint no existe, ignorar
      console.log("Endpoint check-document no disponible:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones frontend
    if (!name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (!lastName.trim()) {
      toast.error("El apellido es obligatorio");
      return;
    }
    if (!email.trim()) {
      toast.error("El correo es obligatorio");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Ingresa un correo válido");
      return;
    }
    if (!password.trim()) {
      toast.error("La contraseña es obligatoria");
      return;
    }
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (!numDocument.trim()) {
      toast.error("El número de documento es obligatorio");
      return;
    }
    if (!/^\d+$/.test(numDocument)) {
      toast.error("El número de documento debe contener solo números");
      return;
    }
    if (docError || emailError) {
      toast.error("Corrige los errores antes de enviar");
      return;
    }

    const data = {
      userName: email.split("@")[0],     // temporal (mejor backend)
      name,
      lastName,                   // valor por defecto
      phone: "0000000000",               // valor por defecto
      email,
      password,
      documentTypeId: 1,                 // default
      numDocument,
      roleId: 1  
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

      (e.target as HTMLFormElement).reset();
      router.push("/");

    } catch (error: any) {
      console.log("Error completo:", error);
      const badMessage = error.response?.data?.message || error.response?.data?.error || JSON.stringify(error.response?.data) || error.message;

      if (badMessage && typeof badMessage === 'string') {
        if (badMessage.toLowerCase().includes("email")) {
          toast.error("El correo ya está registrado");
          return;
        }
        if (badMessage.toLowerCase().includes("numdocument") || badMessage.toLowerCase().includes("document")) {
          toast.error("El número de documento ya está registrado");
          return;
        }
        // Si hay mensaje pero no específico, mostrarlo
        toast.error(badMessage);
      } else {
        toast.error("Error al registrar usuario. Verifica los datos e intenta de nuevo.");
      }
    }
  };

  return (
    <div className="grid place-items-center min-h-screen p-4">
      <div className="shadow-lg p-6 sm:p-8 border-t-4 border-green-400 bg-white w-full max-w-md">
        <h1 className="text-xl font-bold my-4">Registrate</h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Nombre" required className="p-3 border rounded" />
          <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Apellido" required className="p-3 border rounded" />
          <input onChange={(e) => setNumDocument(e.target.value)} type="text" placeholder="Número de documento" required onBlur={() => checkDocumentUniqueness(numDocument)} className="p-3 border rounded" />
          {docError && <p className="text-red-500 text-sm">{docError}</p>}
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo" required onBlur={() => checkEmailUniqueness(email)} className="p-3 border rounded" />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" required className="p-3 border rounded" />

          <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2 rounded border-t-4 border-green-400 cursor-pointer hover:bg-blue-700">
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
