import { NextResponse } from "next/server";
import cloudinary from "@/lib/conection/cloudinary";
/* ADDED */
import * as yup from 'yup';
import { Nube, INube } from "@/lib/models/Nube";
import { MongoConnection } from "@/lib/db";

export async function POST(request: Request) {
  await MongoConnection();

  const data = await request.formData();

  const image = data.get("file");
  const name = data.get("name");
  const city = data.get("city");
  const country = data.get("country");
  const price = data.get("price");
  const description = data.get("description");

  // Coerce FormDataEntryValue to typed variables
  const nameStr: string = typeof name === 'string' ? name.trim() : String(name || '');
  const cityStr: string = typeof city === 'string' ? city.trim() : String(city || '');
  const countryStr: string = typeof country === 'string' ? country.trim() : String(country || '');
  const descriptionStr: string = typeof description === 'string' ? description.trim() : String(description || '');
  const priceNum: number = typeof price === 'string' ? Number(price) : (typeof price === 'number' ? price : Number(String(price || '')));

  const productSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    price: yup.number().typeError('Precio inválido').required('El precio es obligatorio').positive('El precio debe ser mayor que 0'),
    country: yup.string().required('El país es obligatorio'),
    description: yup.string().required('La descripción es obligatoria'),
  });

  try {
    // Validate using the coerced values
    await productSchema.validate({ 
      name: nameStr,
      city: cityStr,
      country: countryStr,
      description: descriptionStr,
      price: priceNum,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Datos inválidos' }, { status: 400 });
  }

  if (!image || !(image instanceof File)) {
    return NextResponse.json({ error: "No se ha subido ninguna imagen" }, { status: 400 });
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  type UploadResult = { secure_url: string; public_id: string } & Record<string, any>;

  const uploadResult = await new Promise<UploadResult>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "productos" },
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result as UploadResult);
      }
    );

    stream.end(buffer);
  });

  const product = await Nube.create({
    name: nameStr,
    city: cityStr,
    country: countryStr,
    description: descriptionStr,
    price: String(priceNum),
    image_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  }) as INube;

  // Aquí agregas el return de éxito
  return NextResponse.json({
    message: 'Producto creado correctamente',
    product: product,  
  }, { status: 201 });
}