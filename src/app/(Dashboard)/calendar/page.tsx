"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { DateSelectArg } from "@fullcalendar/core";
import { useSession } from "next-auth/react";

interface CreateReservation {
  spaceId: number;
  userId: number;
  start: string;
  end: string;
  notes: string;
}

export default function Reservation() {
  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const { data: session } = useSession();

  // Valores dinámicos en lugar de quemados
  const userId = session?.user?.id ? parseInt(session.user.id) : null;
  const spaceId = 30; // Temporal, hasta que se pase como prop o se obtenga de contexto

  const handleSelect = (info: DateSelectArg) => {
    setSelectedRange({
      start: info.start,
      end: info.end,
    });
  };

  const handleEvent = async () => {
    if (!selectedRange) {
      toast.error("Por favor selecciona un rango de tiempo");
      return;
    }

    if (!userId) {
      toast.error("Usuario no autenticado");
      return;
    }

    const payload: CreateReservation = {
      spaceId,
      userId,
      start: selectedRange.start.toISOString(),
      end: selectedRange.end.toISOString(),
      notes: "Evento creado desde el calendario",
    };

    try {
      const response = await fetch(
        "https://work-point-9be66ef1d8d3.herokuapp.com/api/Booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        toast.error("Error al crear el evento");
        return;
      }

      toast.success("Evento creado con éxito");
    } catch (error) {
      toast.error("Error al crear el evento");
    }
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-10">
      <ToastContainer />

      <div className="w-full max-w-6xl px-4 md:px-6 py-10 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="min-h-[600px]">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            events={[]}
            selectable={true}
            select={handleSelect}
            selectMirror={true}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleEvent}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar Evento
          </button>
        </div>
      </div>
    </main>
  );
}