// components/MercadoPago.tsx
"use client";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

interface Props {
  title: string;
  price: number;
  spaceId: number;
  isAuthenticated: boolean;
}

export default function MercadoPagoWallet({ title, price, spaceId }: Props) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!;

  useEffect(() => {
    initMercadoPago(publicKey, { locale: "es-CO" });
  }, [publicKey]);

  const createPreferenceId = async () => {
    const res = await axios.post("/api/payment", {
      title,
      unit_price: price,
      quantity: 1,
      spaceId,
    });

    setPreferenceId(res.data.preferenceId);
  };

  return (
    <div className="mt-4">
      {!preferenceId && (
        <button
          onClick={createPreferenceId}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold"
        >
          Pagar con Mercado Pago
        </button>
      )}

      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
}
