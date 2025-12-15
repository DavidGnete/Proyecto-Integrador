"use client";
import React, { useState } from "react";

interface DeleteSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceId: number;
  spaceName: string;
  onSuccess: () => void; // aquí el padre borra la card
}

export default function DeleteSpaceModal({
  isOpen,
  onClose,
  spaceId,
  spaceName,
  onSuccess,
}: DeleteSpaceModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://work-point-9be66ef1d8d3.herokuapp.com/api/space/delete/${spaceId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      // Avisar al padre para que quite la card
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al eliminar";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
    <div className="relative w-full max-w-md bg-slate-900 rounded-2xl border border-white/10 shadow-2xl p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Eliminar Espacio</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          ×
        </button>
      </div>

      {/* Contenido */}
      <p className="mb-6 text-white/80">
        ¿Estás seguro de que quieres eliminar el espacio <strong>"{spaceName}"</strong>? Esta acción no se puede deshacer.
      </p>

      {error && (
        <p className="p-3 text-sm text-red-400 bg-red-500/10 rounded-lg border border-red-500/20 mb-4">
          {error}
        </p>
      )}

      {/* Botones */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 transition disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition disabled:opacity-50"
        >
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  </div>
);


}