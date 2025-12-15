/* "use client";

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
import MercadoPagoWallet from "@/components/MercadoPago";

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

       
        {step === 1 && (
          <>
            <Calendar mode="single" selected={date} onSelect={setDate} className="mt-4" />
            <Button className="w-full mt-4" disabled={!date} onClick={() => setStep(2)}>
              Siguiente
            </Button>
          </>
        )}

   
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
            <Button className="w-full mt-4" disabled={!hour} onClick={() => setStep(3)}>
              Continuar
            </Button>
          </>
        )}

  
        {step === 3 && (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Fecha: {date?.toDateString()} <br />
              Hora: {hour}
            </p>

        
            <div className="mt-4">
              <MercadoPagoWallet
                title={productName}
                price={price}
                spaceId={productId}
              />
            </div>
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
} */