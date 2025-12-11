"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


interface Product {
  _id: string;
  name: string;
  price: number | string;
  public_id: string;
  city?: string;
  country?: string;
  description?: string;
}

export default function Products() {
  const [coworking, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/publicard"); 

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
        <div className="container mx-auto px-4 text-center">
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
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Nuestros espacios
        </h2>

        {coworking.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No hay coworkings disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {coworking.map((place) => (
              <ProductCard
                key={place._id}
                _id={place._id}
                name={place.name}
                price={place.price}
                public_id={place.public_id}
                city={place.city}
                country={place.country}
                description={place.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}