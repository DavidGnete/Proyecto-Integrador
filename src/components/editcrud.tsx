"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface Photo {
  id: number;
  urlImage: string;
  // puedes agregar más campos si los necesitas
}

interface Product {
  id: number;
  categorieId: number;
  maxCapacity: number;
  spaceName: string;
  branchId: number;
  price: number;
  description: string;
  userId: number;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
}

interface EditSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onSuccess: (updatedProduct: Product) => void;
}

export default function EditSpaceModal({
  isOpen,
  onClose,
  product,
  onSuccess,
}: EditSpaceModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    spaceName: "",
    description: "",
    price: 0,
    maxCapacity: 0,
    categorieId: 0,
    branchId: 0,
    userId: 0,
  });

  const [existingPhotos, setExistingPhotos] = useState<Photo[]>([]);
  const [photosToDelete, setPhotosToDelete] = useState<number[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Cargar datos iniciales cuando cambie el producto
  useEffect(() => {
    if (product) {
      setFormData({
        spaceName: product.spaceName || "",
        description: product.description || "",
        price: product.price || 0,
        maxCapacity: product.maxCapacity || 0,
        categorieId: product.categorieId || 0,
        branchId: product.branchId || 0,
        userId: product.userId || 0,
      });
      setExistingPhotos(product.photos || []);
      setPhotosToDelete([]);
      setNewImages([]);
    }
  }, [product]);

  // Reset al cerrar
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setSuccess(false);
      setNewImages([]);
      setPhotosToDelete([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // si quieres, aquí puedes validar tipo y cantidad
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleMarkPhotoToDelete = (photoId: number) => {
    setPhotosToDelete((prev) =>
      prev.includes(photoId) ? prev : [...prev, photoId]
    );
  };

  const handleUnmarkPhotoToDelete = (photoId: number) => {
    setPhotosToDelete((prev) => prev.filter((id) => id !== photoId));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1. Actualizar datos del espacio
      await axios.put(
        `https://work-point-9be66ef1d8d3.herokuapp.com/api/space/update/${product.id}`,
        {
          categorieId: formData.categorieId,
          maxCapacity: formData.maxCapacity,
          spaceName: formData.spaceName,
          branchId: formData.branchId,
          price: formData.price,
          description: formData.description,
          userId: formData.userId,
          // Normalmente no hace falta mandar photos aquí si tienes endpoints separados
          photos: [],
        }
      );

      // 2. Desactivar / eliminar fotos marcadas
      // ⚠️ IMPORTANTE: ajusta el método (PUT / PATCH / DELETE)
      // y el body según tu backend de /api/photos/status/:id
      const deletePromises = photosToDelete.map((photoId) =>
        axios.put(
          `https://work-point-9be66ef1d8d3.herokuapp.com/api/photos/status/${photoId}`
        )
      );

      // 3. Subir nuevas imágenes (si las hay)
      let uploadedPhotos: Photo[] = [];
      if (newImages.length > 0) {
        setUploadingImages(true);

        const uploadPromises = newImages.map(async (file) => {
          const fd = new FormData();
          // nombres de campos según tu backend:
          fd.append("SpaceId", product.id.toString());
          fd.append("Photo", file);

          const res = await axios.post(
            "https://work-point-9be66ef1d8d3.herokuapp.com/api/photos/create",
            fd,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // Ajusta estos campos según lo que devuelva tu API
          const data = res.data;
          const newPhoto: Photo = {
            id: data.id, // asegúrate que la API devuelve id
            urlImage: data.urlImage, // asegúrate que la API devuelve urlImage
          };
          return newPhoto;
        });

        // Ejecutar todo en paralelo (borrados + subidas)
        const [_, uploaded] = await Promise.all([
          Promise.all(deletePromises),
          Promise.all(uploadPromises),
        ]);

        uploadedPhotos = uploaded;
      } else {
        // Si no hay nuevas imágenes, solo ejecutar borrados
        await Promise.all(deletePromises);
      }

      // 4. Construir nuevo arreglo de fotos en el frontend:
      const remainingPhotos = existingPhotos.filter(
        (photo) => !photosToDelete.includes(photo.id)
      );

      const updatedPhotos = [...remainingPhotos, ...uploadedPhotos];

      const updatedProduct: Product = {
        ...product,
        ...formData,
        photos: updatedPhotos,
        // podrías actualizar updatedAt si lo necesitas
      };

      setSuccess(true);
      onSuccess(updatedProduct);

      // Cerrar después de un pequeño delay o directamente
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Error al actualizar el espacio"
      );
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <div>
      <h2>Editar espacio</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Espacio actualizado correctamente</p>}

      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div>
          <label>Nombre del espacio</label>
          <input
            type="text"
            name="spaceName"
            value={formData.spaceName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Precio */}
        <div>
          <label>Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        {/* Capacidad */}
        <div>
          <label>Capacidad máxima</label>
          <input
            type="number"
            name="maxCapacity"
            value={formData.maxCapacity}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label>ID Categoría</label>
          <input
            type="number"
            name="categorieId"
            value={formData.categorieId}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        {/* Sucursal */}
        <div>
          <label>ID Sucursal</label>
          <input
            type="number"
            name="branchId"
            value={formData.branchId}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        {/* FOTOS EXISTENTES */}
        <div>
          <h3>Fotos actuales</h3>
          {existingPhotos.length === 0 && <p>No hay fotos</p>}
          {existingPhotos.map((photo) => {
            const marked = photosToDelete.includes(photo.id);
            return (
              <div key={photo.id}>
                <img
                  src={photo.urlImage}
                  alt="Foto del espacio"
                  style={{ width: 150, height: 150, objectFit: "cover" }}
                />
                <div>
                  {marked ? (
                    <button
                      type="button"
                      onClick={() => handleUnmarkPhotoToDelete(photo.id)}
                    >
                      Desmarcar eliminación
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleMarkPhotoToDelete(photo.id)}
                    >
                      Marcar para eliminar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* NUEVAS FOTOS */}
        <div>
          <h3>Nuevas fotos</h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
          />

          {newImages.map((file, index) => (
            <div key={index}>
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveNewImage(index)}
              >
                Quitar
              </button>
            </div>
          ))}
        </div>

        <div>
          <button type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button type="submit" disabled={loading || uploadingImages}>
            {loading
              ? uploadingImages
                ? "Actualizando y subiendo fotos..."
                : "Guardando..."
              : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}