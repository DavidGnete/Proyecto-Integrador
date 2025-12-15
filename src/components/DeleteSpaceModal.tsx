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
    <div>
      <h2>Eliminar Espacio</h2>
      <p>
        ¿Estás seguro de que quieres eliminar el espacio{" "}
        <strong>"{spaceName}"</strong>? Esta acción no se puede deshacer.
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={onClose} disabled={loading}>
        Cancelar
      </button>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Eliminando..." : "Eliminar"}
      </button>
    </div>
  );
}