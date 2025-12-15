"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Photo {
  id: number;
  urlImage: string;
}

interface ProductCardProps {
  id:number;
  categorieId: number;
  maxCapacity: number;
  spaceName: string;
  branchId: number;
  price: number;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  photos: Photo[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  categorieId,
  maxCapacity,
  spaceName,
  branchId,
  price,
  description,
  photos,
  userId,
  createdAt,
  updatedAt,
  
}) => {
  const router = useRouter();

  return (
    <div
      className="w-full max-w-sm bg-white rounded-xl shadow-lg
      overflow-hidden border border-gray-200
      cursor-pointer hover:shadow-2xl transform hover:-translate-y-1 transition mb-6 p-5"
    >
      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={photos?.[0]?.urlImage || "/placeholder.jpg"}
          alt={spaceName}
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900">
        {spaceName}
      </h3>

      <p className="text-gray-700 mt-2">
        {description}
      </p>

      <div className="mt-4 text-sm text-gray-600 space-y-1">
        {/* <p>Categoría: {categorieId}</p> */}
        <p>Capacidad Máxima: {maxCapacity}</p>
       {/*  <p>Sucursal: {branchId}</p>
        <p>Usuario Dueño: {userId}</p> */}
        <p className="font-semibold text-gray-900">Precio: ${price}</p>
      </div>

    {/*   <div className="mt-4 text-xs text-gray-500">
        <p>Creado: {new Date(createdAt).toLocaleString()}</p>
        <p>Actualizado: {new Date(updatedAt).toLocaleString()}</p>
      </div> */}

      <button
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        onClick={() => router.push(`/product/${id}`)}
      >
        Ver detalles
      </button>
    </div>
  );
};

export default ProductCard;
