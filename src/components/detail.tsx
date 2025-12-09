"use client";
import { useEffect, useState} from "react";
import { CldImage } from "next-cloudinary";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

interface ProductCardProps {
  _id: string;
  name: string;
  price: string | number;
  public_id: string;
}
export default function Detail({ _id, name, price, public_id }: ProductCardProps) {
    console.log("id of card", _id)
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
    )
}