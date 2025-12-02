"use client";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MercadoPagoWallet() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "";

  // Inicializar Mercado Pago una sola vez
  useEffect(() => {
    initMercadoPago(publicKey, { locale: "es-CO" });
  }, []);

  const createPreferenceId = async () => {
    const response = await axios.post(
      "/api/payment",
      {
        title: "Test Product",
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

  return (
    <div>
      {/* Botón para crear la preferencia */}
      {!preferenceId && (
        <button onClick={createPreferenceId}>
        
        </button>
      )}

      {/* Renderizado del widget real de Mercado Pago */}
      {preferenceId && (
        <Wallet initialization={{ preferenceId }} />
      )}
    </div>
  );
}
