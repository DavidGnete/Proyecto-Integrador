/* import { NextResponse } from "next/server";
import { Nube } from "@/lib/models/Nube";
import { MongoConnection } from "@/lib/db";
import cloudinary from "@/lib/conection/cloudinary";
import mongoose from "mongoose";

export async function GET(request: Request, { params }: any) {
  try {
    await MongoConnection();

    // Desempaquetar params que es una Promise
    const resolvedParams = await params;
    const { id } = resolvedParams;
    console.log("Buscando producto con ID:", id);

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("ID inválido:", id);
      return NextResponse.json(
        { error: "ID de producto inválido" },
        { status: 400 }
      );
    }
     
    // Nube son los modelos de mongoose

    const product = await Nube.findById(new mongoose.Types.ObjectId(id)).lean();
    console.log("Producto encontrado:", product);

    if (!product) {
      console.log("No se encontró producto con ID:", id);
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Error al cargar el producto", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: any) {
  try {
    await MongoConnection();

    const data = await request.formData();

    const name = data.get("name");
    const price = data.get("price");
    const city = data.get("city");
    const country = data.get("country");
    const description = data.get("description");
    const image = data.get("file");
    const additionalFiles = data.getAll("files");

    const updateData: any = {
      name,
      price,
      city,
      country,
      description,
    };

    // Si hay imagen nueva, subirla
    if (image instanceof File) {
      const buffer = Buffer.from(await image.arrayBuffer());

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "productos" },
          (error, result) => error ? reject(error) : resolve(result)
        ).end(buffer);
      });

      updateData.image_url = uploadResult.secure_url;
      updateData.public_id = uploadResult.public_id;
    }

    // Procesar archivos adicionales (galería)
    if (additionalFiles && additionalFiles.length > 0) {
      // obtener producto actual para conservar la galería previa
      const existing = await Nube.findById(params.id).lean();
      const existingGallery = (existing && (existing as any).gallery) || [];

      const uploaded: Array<{ public_id: string; url: string }> = [];

      for (const f of additionalFiles) {
        if (f instanceof File) {
          const buf = Buffer.from(await f.arrayBuffer());
          const res: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { folder: "productos" },
              (error, result) => (error ? reject(error) : resolve(result))
            ).end(buf);
          });

          uploaded.push({ public_id: res.public_id, url: res.secure_url });
        }
      }

      updateData.gallery = existingGallery.concat(uploaded);
    }

    const updated = await Nube.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).lean();

    return NextResponse.json(updated, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: "Error al actualizar", details: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request, { params }: any) {
  await MongoConnection();

  const product = await Nube.findById(params.id);

  if (!product) {
    return NextResponse.json({ error: "No existe" }, { status: 404 });
  }

  // Eliminar imagen en Cloudinary
  await cloudinary.uploader.destroy(product.public_id);

  // Eliminar registro en Mongo
  await Nube.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "Eliminado" });
}

 */

export {};