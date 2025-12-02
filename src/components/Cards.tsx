"use client";
/* import MercadoPagoWallet from "./MercadoPago"; */
import React, { useEffect } from "react";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";



interface ProductCardProps {
  name: string;
  price: string | number;
  public_id: string;
}

const ProductCard = ({ name, price, public_id }: ProductCardProps) => {
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
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-2xl transform hover:-translate-y-1 transition mb-6">
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

        {/* Información del producto */}
        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {name}
            </h3>
            <p className="mt-2 text-xl font-bold text-gray-800">
              ${price}
            </p>
          </div>

          <div className="flex-shrink-0 ml-4">
            {!preferenceId && (
            <button
              onClick={createpreferenceid}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:opacity-95 hover:scale-105 transform transition cursor-pointer"
              >
            pagar 
            </button>
            )}
            {preferenceId && (
              <div className="mt-4">
                <Wallet initialization={{ preferenceId }} />
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;