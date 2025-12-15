"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Photo {
  id: number;
  spaceId: number;
  urlImage: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
  photos: Photo[];
}

export default function Products() {
  const [coworking, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://work-point-9be66ef1d8d3.herokuapp.com/api/space/getAll"); 

        if (!res.ok) throw new Error("No se pudieron cargar los productos");

        const data = await res.json();
        setProducts(data.products || data); 
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <section>
        <div className="container mx-auto px-4 text-center ">
          <p className="text-xl text-gray-600">Cargando coworkings...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center text-red-500">
          Error: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">

        {coworking.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No hay coworkings disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {coworking.map((place) => (
              <ProductCard
                key={place.id}
                id={place.id}
                categorieId={place.categorieId}
                maxCapacity={place.maxCapacity}
                spaceName={place.spaceName}
                branchId={place.branchId}
                price={place.price}
                description={place.description}
                userId={place.userId}
                createdAt={place.createdAt}
                updatedAt={place.updatedAt}
                photos={place.photos}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}