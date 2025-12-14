"use client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Asegúrate de importar los estilos de toastify si no lo has hecho en el layout
import React, { useState } from "react";
import * as yup from "yup";

export default function nube() {
  // TODO: Reemplazar opciones hardcodeadas con llamadas API para obtener branches, categories, users válidos
  const [categorieId, setCategorieId] = useState("1"); // Valor por defecto
  const [maxCapacity, setMaxCapacity] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [branchId, setBranchId] = useState("1"); // Valor por defecto
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("1"); // Valor por defecto
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const schema = yup.object({
    spaceName: yup.string().required("El nombre del espacio es obligatorio"),
    maxCapacity: yup
      .number()
      .typeError("La capacidad máxima debe ser numérica")
      .required("La capacidad máxima es obligatoria"),
    price: yup
      .number()
      .typeError("El precio debe ser numérico")
      .required("El precio es obligatorio"),
    description: yup.string().required("La descripción es obligatoria"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schema.validate({
        spaceName,
        maxCapacity: Number(maxCapacity),
        price: Number(price),
        description,
      });
    } catch (err: any) {
      toast.error(err?.message || "Datos inválidos");
      return;
    }

    const parsedCategorieId = categorieId === "" ? NaN : parseInt(categorieId, 10);
    const parsedMaxCapacity = maxCapacity === "" ? NaN : parseInt(maxCapacity, 10);
    const parsedBranchId = branchId === "" ? NaN : parseInt(branchId, 10);
    const parsedPrice = price === "" ? NaN : Number(price);
    const parsedUserId = userId === "" ? NaN : parseInt(userId, 10);
    
    // Validación básica de imágenes
    if (images.length > 5) {
      toast.error("Máximo 5 imágenes permitidas");
      return;
    }
    const invalidFiles = images.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    if (
      Number.isNaN(parsedCategorieId) ||
      Number.isNaN(parsedMaxCapacity) ||
      Number.isNaN(parsedBranchId) ||
      Number.isNaN(parsedPrice) ||
      Number.isNaN(parsedUserId)
    ) {
      toast.error("Por favor completa todos los campos numéricos con valores válidos");
      return;
    }

    const payload = {
      categorieId: parsedCategorieId,
      maxCapacity: parsedMaxCapacity,
      spaceName: spaceName,
      branchId: parsedBranchId,
      price: parsedPrice,
      description: description,
      userId: parsedUserId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      setIsLoading(true);
      console.log("[create-space] payload:", payload);
      const response = await axios.post("https://work-point-9be66ef1d8d3.herokuapp.com/api/space/create", payload, {
        headers: { "Content-Type": "application/json" },
      });
      const spaceId = response.data?.id;

      if (!spaceId) {
        throw new Error("No se recibió spaceId al crear el coworking");
      }
      
      // Si hay imágenes, subirlas
      if (images.length > 0) {
        setUploadingImages(true);

        try {
          // Subir cada imagen individualmente con SpaceId y Photo
          for (const file of images) {
            const formData = new FormData();
            formData.append("SpaceId", spaceId.toString()); // Nota: mayúscula
            formData.append("Photo", file);                // Nota: Photo, no files

            const uploadResponse = await axios.post(
              "https://work-point-9be66ef1d8d3.herokuapp.com/api/photos/create",
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("Imagen subida:", uploadResponse.data.urlImage);
          }

          toast.success("Imágenes subidas correctamente");
        } catch (imgErr: any) {
          console.error("Error subiendo imágenes:", imgErr);
          toast.error("Coworking creado, pero error al subir imágenes");
        } finally {
          setUploadingImages(false);
        }
      }

      console.log("[create-space] response:", response.status, response.data);
      toast.success("Coworking creado correctamente");

      setImages([]);
      setMaxCapacity("");
      setSpaceName("");
      setPrice("");
      setDescription("");
    } catch (err: any) {
      console.error("[create-space] Axios error:", err);
      console.error("[create-space] response status:", err?.response?.status);
      console.error("[create-space] response data:", err?.response?.data);
      const serverMsg = err?.response?.data?.message || (err?.response?.data ? JSON.stringify(err.response.data) : null);
      toast.error(serverMsg || err.message || "Error creando el coworking");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Fondo con imagen de oficina y overlay oscuro */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
          alt="Office Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Cabecera del Formulario */}
        <div className="bg-indigo-600 px-8 py-6 text-white">
          <h1 className="text-3xl font-bold tracking-tight">WorkPoint</h1>
          <p className="text-indigo-100 mt-2 text-sm">
            Publica tu espacio y conecta con profesionales en busca de su lugar ideal.
          </p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Detalles del Nuevo Espacio
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Nombre del Espacio */}
            <div>
              <label htmlFor="spaceName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Coworking
              </label>
              <input
                id="spaceName"
                name="spaceName"
                value={spaceName}
                type="text"
                placeholder="Ej: Sala de Juntas Panorama"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                onChange={(e) => setSpaceName(e.target.value)}
              />
            </div>

            {/* Grid para Capacidad y Precio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="maxCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacidad Máxima (personas)
                </label>
                <div className="relative">
                  <input
                    id="maxCapacity"
                    name="maxCapacity"
                    value={maxCapacity}
                    type="number"
                    placeholder="Ej: 10"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    onChange={(e) => setMaxCapacity(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Precio por día ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">$</span>
                  <input
                    id="price"
                    name="price"
                    value={price}
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción del Espacio
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                rows={4}
                placeholder="Describe las amenidades, el ambiente y lo que hace único a este espacio..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Subida de Imágenes Estilizada */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                Galería de Fotos (Opcional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer relative">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Sube tus archivos</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        accept="image/*"
                        multiple
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => setImages(Array.from(e.target.files || []))}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                </div>
              </div>
              {images.length > 0 && (
                <div className="mt-2 bg-indigo-50 text-indigo-700 text-sm p-2 rounded flex items-center">
                  <span className="font-bold mr-2">✓</span> {images.length} imagen(es) seleccionada(s)
                </div>
              )}
            </div>

            {/* Botón de Acción */}
            <div className="pt-4">
              <button
                disabled={isLoading || uploadingImages}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                  ${isLoading || uploadingImages 
                    ? "bg-indigo-400 cursor-not-allowed" 
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  }`}
              >
                {isLoading || uploadingImages ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando Publicación...
                  </span>
                ) : (
                  "Publicar Coworking"
                )}
              </button>
            </div>
          </form>
        </div>
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </div>
  );
}