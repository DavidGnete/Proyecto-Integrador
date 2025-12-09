"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

interface Product {
  _id: string;
  name: string;
  price: string | number;
  public_id: string;
  city?: string;
  image_url?: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID de producto no válido");
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        console.log("Fetching product with ID:", id);
        const res = await fetch(`/api/DetailsCard/${id}`);
        
        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Response data:", data);

        if (!res.ok) {
          setError(data.error || "Producto no encontrado");
          setLoading(false);
          return;
        }

        setProduct(data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message || "Error al cargar el producto");
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-3xl text-white">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center flex-col gap-4">
        <p className="text-3xl text-red-500">{error}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Volver atrás
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center flex-col gap-4">
        <p className="text-3xl text-white">Producto no encontrado</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Volver atrás
        </button>
      </div>
    );
  }

  const numericPrice = typeof product.price === "number" 
    ? product.price 
    : Number(String(product.price).replace(/[^0-9.-]+/g, "")) || 0;

  return (
    <section className="min-h-screen  py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Contenedor Imagen de los espacios */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-800 rounded-xl p-8">
          <div className="flex  flex-col gap-7 items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 ">
                {product.name}
              </h1>
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-xl ">

              <CldImage
                src={product.public_id}
                alt={product.name}
                width={500}
                height={400}
                crop="fill"
                gravity="auto"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              {product.city && (
                <p className="text-xl text-gray-400 mb-4">
                {product.city}
                </p>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="flex flex-col justify-center space-y-6">

            {/* Precio */}
            <div className=" p-6 rounded-lg">
              <p className="text-gray-300 mb-2">Precio</p>
              <h2 className="text-4xl font-bold text-white">
                ${numericPrice.toLocaleString('es-CO')}
              </h2>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <button className="w-full py-3  text-white font-semibold rounded-lg transition transform hover:scale-105">
                Reservar Ahora
              </button>
              <button className="w-full py-3 text-white font-semibold rounded-lg transition transform hover:scale-105">
                Contactar
              </button>
              <button className="w-full py-3  text-white font-semibold rounded-lg transition transform hover:scale-105">
                Pagar
              </button>
            </div>

            {/* Información adicional */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">ID del Producto</h3>
              <p className="text-gray-300 break-words text-sm font-mono">
                {product._id}
              </p>
            </div>
          </div>
        </div>

        {/* Descripción adicional */}
        <div className="mt-12 bg-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Detalles del Espacio
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Este es un espacio de coworking premium ubicado en {product.city || "una ubicación estratégica"}. 
            Cuenta con todas las comodidades necesarias para tu productividad.
          </p>
        </div>
      </div>
    </section>
  );
}
