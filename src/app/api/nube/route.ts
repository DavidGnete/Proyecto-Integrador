import { NextResponse } from "next/server";
import cloudinary from "@/lib/conection/cloudinary";
/* ADDED */
import * as yup from 'yup';
import { Nube } from "@/lib/models/Nube";
import { MongoConnection } from "@/lib/db";

export async function POST(request: Request) {
  await MongoConnection();

  const data = await request.formData();

  const image = data.get("file");
  const name = data.get("name");
  const city = data.get("city");
  const price = data.get("price");

  const productSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    price: yup.number().typeError('Precio inválido').required('El precio es obligatorio').positive('El precio debe ser mayor que 0'),
  });

  try {
    // formData values might be non-string, coerce as needed
    await productSchema.validate({ name: String(name || ''), city: String(city || ''), price: Number(price), });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Datos inválidos' }, { status: 400 });
  }

  if (!image || !(image instanceof File)) {
    return NextResponse.json({ error: "No se ha subido ninguna imagen" }, { status: 400 });
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult: any = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "productos" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });

  const product = await Nube.create({
    name,
    city,
    price,
    image_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  });

  // Aquí agregas el return de éxito
  return NextResponse.json({
    message: 'Producto creado correctamente',
    product: product,  
  }, { status: 201 });
}