"use client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import * as yup from "yup";

export default function Lista() {
  const [categorieId, setCategorieId] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const schema = yup.object({
    spaceName: yup.string().required("El nombre del espacio es obligatorio"),
    price: yup
      .number()
      .typeError("El precio debe ser numérico")
      .required("El precio es obligatorio"),
    description: yup.string().required("La descripción es obligatoria"),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await schema.validate({
        spaceName,
        price: Number(price),
        description,
      });
    } catch (err: any) {
      toast.error(err?.message || "Datos inválidos");
      return;
    }

    const payload = {
      categorieId: Number(categorieId),
      maxCapacity: Number(maxCapacity),
      spaceName: spaceName,
      branchId: Number(branchId),
      price: Number(price),
      description: description,
      userId: Number(userId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await axios.post(
        "https://work-point-9be66ef1d8d3.herokuapp.com/api/space/create",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Coworking creado correctamente");

      setCategorieId("");
      setMaxCapacity("");
      setSpaceName("");
      setBranchId("");
      setPrice("");
      setDescription("");
      setUserId("");
    } catch (err: any) {
      console.error("Error:", err);
      toast.error("Error creando el coworking");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Crear Coworking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-2">Categoría (ID)</label>
            <input
              value={categorieId}
              type="number"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => setCategorieId(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Capacidad Máxima</label>
            <input
              value={maxCapacity}
              type="number"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => setMaxCapacity(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Nombre del Espacio</label>
            <input
              value={spaceName}
              type="text"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => setSpaceName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Sucursal (ID)</label>
            <input
              value={branchId}
              type="number"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => setBranchId(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Precio</label>
            <input
              value={price}
              type="number"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Descripción</label>
            <textarea
              value={description}
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Usuario (ID)</label>
            <input
              value={userId}
              type="number"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <button className="w-full bg-indigo-500 text-white py-2 rounded">
            Enviar
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
