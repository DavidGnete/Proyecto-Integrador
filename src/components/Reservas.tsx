"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
// import MercadoPagoWallet from "@/components/MercadoPago";

interface ReservationModalProps {
  productName: string;
  productId: number;
  price: number;
}

export default function ReservationModal({
  productName,
  productId,
  price,
}: ReservationModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // TODO: reemplaza por el userId real (de tu auth/sesión)
  const userId = 1;

  const RESERVATION_DURATION_MINUTES = 60; // asumo 1h

  const handleCreateBooking = async () => {
    if (!date || !hour) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Combinar fecha + hora seleccionada
      const [h, m] = hour.split(":").map(Number);
      const startDate = new Date(date);
      startDate.setHours(h, m, 0, 0);

      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + RESERVATION_DURATION_MINUTES);

      const body = {
        spaceId: productId,
        userId,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        notes: `Reserva de ${productName}`,
      };

      const res = await fetch(
        "https://work-point-9be66ef1d8d3.herokuapp.com/api/Booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Error al crear la reserva");
      }

      setSuccess(true);
      // aquí puedes avanzar de paso, cerrar modal, etc.
      // setStep(3);
    } catch (err: any) {
      setError(err.message || "Error inesperado al crear la reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Reservar</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reservar {productName}</DialogTitle>
          <DialogDescription>
            Sigue los pasos para completar tu reserva.
          </DialogDescription>
        </DialogHeader>

        {/* PASO 1: FECHA */}
        {step === 1 && (
          <>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mt-4"
            />
            <Button
              className="w-full mt-4"
              disabled={!date}
              onClick={() => setStep(2)}
            >
              Siguiente
            </Button>
          </>
        )}

        {/* PASO 2: HORA */}
        {step === 2 && (
          <>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {["08:00", "09:00", "10:00", "11:00"].map((h) => (
                <Button
                  key={h}
                  variant={hour === h ? "default" : "outline"}
                  onClick={() => setHour(h)}
                >
                  {h}
                </Button>
              ))}
            </div>

            {/* Aquí ya tienes fecha y hora -> botón que guarda en el endpoint */}
            <Button
              className="w-full mt-4"
              disabled={!hour || !date || loading}
              onClick={async () => {
                await handleCreateBooking();
                if (!error) setStep(3); // avanzar si todo ok
              }}
            >
              {loading ? "Guardando..." : "Confirmar fecha y hora"}
            </Button>

            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}
            {success && (
              <p className="mt-2 text-sm text-green-600">
                Reserva registrada correctamente.
              </p>
            )}
          </>
        )}

        {/* PASO 3: RESUMEN / PAGO (si quieres) */}
        {step === 3 && (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Fecha: {date?.toDateString()} <br />
              Hora: {hour}
            </p>

            {/* Aquí podrías mostrar Mercado Pago si lo necesitas, 
                pero la reserva YA está guardada en el backend */}
            {/* 
            <div className="mt-4">
              <MercadoPagoWallet
                title={productName}
                price={price}
                spaceId={productId}
              />
            </div>
            */}
          </>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full mt-4">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}