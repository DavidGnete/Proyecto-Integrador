"use client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";

export default function Nube() {
  const CATEGORIE_ID = 1;
  const BRANCH_ID = 1;
  const USER_ID = 24;
const router = useRouter();
  const [spaceName, setSpaceName] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Imágenes
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Validación
  const schema = yup.object({
    spaceName: yup.string().required("Nombre obligatorio"),
    maxCapacity: yup
      .number()
      .typeError("Capacidad debe ser numérica")
      .required("Capacidad obligatoria"),
    price: yup
      .number()
      .typeError("Precio debe ser numérico")
      .required("Precio obligatorio"),
    description: yup.string().required("Descripción obligatoria"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValues = {
      spaceName,
      maxCapacity: Number(maxCapacity),
      price: Number(price),
      description,
    };

    try {
      await schema.validate(formValues, { abortEarly: true });
    } catch (err: any) {
      toast.error(err.message);
      return;
    }

    if (images.length > 5) {
      toast.error("Máximo 5 imágenes permitidas");
      return;
    }

    //  Payload EXACTO que el backend espera
    const payload = {
      spaceName: spaceName.trim(),
      maxCapacity: Number(maxCapacity),
      price: Number(price),
      description: description.trim(),

      categorieId: CATEGORIE_ID,
      branchId: BRANCH_ID,
      userId: USER_ID,

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      setIsLoading(true);

      console.log("[create-space] payload:", payload);

      const response = await axios.post(
        "http://72.61.6.155:500/api/space/create",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      const spaceId = response.data?.id;
      if (!spaceId) throw new Error("Backend no devolvió spaceId");

    
      if (images.length > 0) {
        setUploadingImages(true);

        for (const file of images) {
          const formData = new FormData();
          formData.append("SpaceId", spaceId.toString());
          formData.append("Photo", file);

          await axios.post(
            "http://72.61.6.155:500/api/photos/create",
            formData
          );
        }
      }
      toast.info("coworking creado, Redirigiendo...");
      setTimeout(() => router.push("/Home"), 1500);

    
      setSpaceName("");
      setMaxCapacity("");
      setPrice("");
      setDescription("");
      setImages([]);
    } catch (error: any) {
      console.error("ERROR BACKEND:", error?.response?.data || error.message);
      toast.error(
        error?.response?.data?.error?.message ||
          "Error interno del servidor"
      );
    } finally {
      setIsLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Crear Coworking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Nombre del espacio"
            value={spaceName}
            onChange={(e) => setSpaceName(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Capacidad"
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files || []))}
          />

          <button
            disabled={isLoading || uploadingImages}
            className="w-full bg-indigo-500 text-white py-2 rounded disabled:opacity-50"
          >
            {isLoading || uploadingImages ? "Procesando..." : "Crear"}
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
