"use client";
/* import MercadoPagoWallet from "./MercadoPago"; */
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";



interface ProductCardProps {
  _id: string;
  name: string;
  price: string | number;
  public_id: string;
  city?: string;
  country?: string;
  description?: string;
}

const ProductCard = ({ _id, name, price, public_id, city, country, description }: ProductCardProps) => {
  const router = useRouter();
  const[showpago, setShowpago]= useState (false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "";

  useEffect(() => {
    initMercadoPago(publicKey, { locale: "es-CO" });
  }, []);
  const createpreferenceid = async () => {
    const response = await axios.post(
      "/api/payment",
      {
        title: name,
        unit_price: 100,
        quantity: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.preferenceId) {
      setPreferenceId(response.data.preferenceId);
    }
  };

  // Convertir precio a centavos — más robusto con strings (quita símbolos)
  const numericPrice = typeof price === "number" ? price : Number(String(price).replace(/[^0-9.-]+/g, "")) || 0;
  const amountInCents = Math.round(numericPrice * 100);

  return (
    <>
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg
      overflow-hidden border border-gray-200
      cursor-pointer hover:shadow-2xl transform hover:-translate-y-1 transition mb-6" onClick={() => router.push(`/product/${_id}`)}>
        <div className="relative w-full h-56 md:h-64 lg:h-56">
          <CldImage
            src={public_id}
            alt={name}
            width={900}
            height={400}
            crop="fill"
            gravity="auto"
            className="object-cover w-full h-full"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </div>

        {/* Información de la ubicación */}
        <div className="px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {name}
          </h3>
          {(city || country) && (
            <p className="text-sm text-gray-600 mt-1">
              {city && <span>{city}</span>}
              {city && country && <span>, </span>}
              {country && <span>{country}</span>}
            </p>
          )}
          
          {/* Separador */}
          {description && <div className="border-t border-gray-200 my-3"></div>}
          
          {/* Descripción */}
          {description && (
            <p className="text-sm text-gray-700 line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;