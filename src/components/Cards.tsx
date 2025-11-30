"use client";

import { CldImage } from "next-cloudinary";

interface ProductCardProps {
  name: string;
  price: string | number;
  public_id: string;
}

const ProductCard = ({ name, price, public_id }: ProductCardProps) => {
  return (
    <div className="w-full  bg-gray-300  rounded-xl shadow-md overflow-hidden border border-gray-200 cursor-pointer hover:scale-105 mb-20">
        <div className="relative w-full h-80 ">
        <CldImage
            src={public_id}
            alt={name}
            width={900}
            height={400}
            crop="fill"
            gravity="auto"
            className="object-cover w-full h-full"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      </div>

      {/* Información del producto */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {name}
        </h3>
        <p className="mt-2 text-2xl font-bold text-gray-800">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;