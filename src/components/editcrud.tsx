"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { X, Trash2, Upload, Loader2 } from "lucide-react";

interface Photo { id: number; urlImage: string; }
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onSuccess: (p: Product) => void;
}

const API = "http://72.61.6.155:500/api";

export default function EditSpaceModal({ isOpen, onClose, product, onSuccess }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ spaceName: "", description: "", price: 0, maxCapacity: 0, categorieId: 0, branchId: 0, userId: 0 });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [toDelete, setToDelete] = useState<number[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({ spaceName: product.spaceName, description: product.description, price: product.price, maxCapacity: product.maxCapacity, categorieId: product.categorieId, branchId: product.branchId, userId: product.userId });
      setPhotos(product.photos || []);
      setToDelete([]);
      setNewFiles([]);
      setError("");
    }
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === "number" ? +value : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put(`${API}/space/update/${product.id}`, { ...form, photos: [] });
      await Promise.all(toDelete.map(id => axios.put(`${API}/photos/status/${id}`)));

      const uploaded = await Promise.all(newFiles.map(async file => {
        const fd = new FormData();
        fd.append("SpaceId", product.id.toString());
        fd.append("Photo", file);
        const { data } = await axios.post(`${API}/photos/create`, fd);
        return { id: data.id, urlImage: data.urlImage } as Photo;
      }));

      const finalPhotos = [...photos.filter(p => !toDelete.includes(p.id)), ...uploaded];
      onSuccess({ ...product, ...form, photos: finalPhotos });
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-2xl border border-white/10 shadow-2xl">
        

        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-slate-900/95 backdrop-blur border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Editar Espacio</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition">
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <p className="p-3 text-sm text-red-400 bg-red-500/10 rounded-lg border border-red-500/20">{error}</p>}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm text-white/60">Nombre</label>
              <input name="spaceName" value={form.spaceName} onChange={handleChange} required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition" />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm text-white/60">Descripción</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition resize-none" />
            </div>

            {[
              { name: "price", label: "Precio", min: 0 },
              { name: "maxCapacity", label: "Capacidad", min: 1 },
              { name: "categorieId", label: "Categoría ID", min: 1 },
              { name: "branchId", label: "Sucursal ID", min: 1 },
            ].map(({ name, label, min }) => (
              <div key={name}>
                <label className="block mb-2 text-sm text-white/60">{label}</label>
                <input type="number" name={name} value={(form as any)[name]} onChange={handleChange} min={min} required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition" />
              </div>
            ))}
          </div>

          {/* Fotos existentes */}
          <div>
            <label className="block mb-3 text-sm text-white/60">Fotos actuales</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {photos.map(p => (
                <div key={p.id} className={`relative group rounded-xl overflow-hidden aspect-square ${toDelete.includes(p.id) ? "opacity-40" : ""}`}>
                  <img src={p.urlImage} alt="" className="w-full h-full object-cover" />
                  <button type="button"
                    onClick={() => setToDelete(d => d.includes(p.id) ? d.filter(x => x !== p.id) : [...d, p.id])}
                    className={`absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition ${toDelete.includes(p.id) ? "opacity-100 bg-red-600/50" : ""}`}>
                    <Trash2 className="w-6 h-6 text-white" />
                  </button>
                </div>
              ))}
              {photos.length === 0 && <p className="col-span-full text-white/40 text-sm">Sin fotos</p>}
            </div>
          </div>

          {/* Nuevas fotos */}
          <div>
            <label className="block mb-3 text-sm text-white/60">Agregar fotos</label>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
              onChange={e => setNewFiles(f => [...f, ...Array.from(e.target.files || [])])} />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-3 w-full justify-center border-2 border-dashed border-white/20 rounded-xl text-white/60 hover:border-violet-500 hover:text-violet-400 transition">
              <Upload className="w-5 h-5" /> Seleccionar imágenes
            </button>
            {newFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {newFiles.map((f, i) => (
                  <span key={i} className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-sm text-white/70">
                    {f.name.slice(0, 15)}...
                    <button type="button" onClick={() => setNewFiles(n => n.filter((_, idx) => idx !== i))} className="hover:text-red-400">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} disabled={loading}
              className="flex-1 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 transition disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</> : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}