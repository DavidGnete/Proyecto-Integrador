/* import { NextResponse } from "next/server";
import { MongoConnection } from "@/lib/db";
import cloudinary from "@/lib/conection/cloudinary";
import { ProductImage } from "@/lib/models/ProductImage";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await MongoConnection();

  const data = await request.formData();
  const productId = data.get("productId");

  if (!productId || typeof productId !== "string") {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const files = data.getAll("files");
  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const saved: any[] = [];

  for (const f of files) {
    if (!(f instanceof File)) continue;
    const buffer = Buffer.from(await f.arrayBuffer());
    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "productos" },
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const doc = await ProductImage.create({
      productId: new mongoose.Types.ObjectId(productId),
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
    });

    saved.push(doc);
  }

  return NextResponse.json({ images: saved }, { status: 201 });
}

export async function GET(request: Request) {
  await MongoConnection();

  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");

  if (!productId) return NextResponse.json({ error: "productId query is required" }, { status: 400 });

  const images = await ProductImage.find({ productId: productId }).sort({ createdAt: 1 }).lean();

  return NextResponse.json({ images }, { status: 200 });
}

export async function DELETE(request: Request) {
  await MongoConnection();

  try {
    const body = await request.json();
    const { imageId } = body;
    if (!imageId) return NextResponse.json({ error: "imageId is required" }, { status: 400 });

    if (!mongoose.Types.ObjectId.isValid(imageId)) {
      return NextResponse.json({ error: "Invalid imageId" }, { status: 400 });
    }

    const img = await ProductImage.findById(imageId);
    if (!img) return NextResponse.json({ error: "Image not found" }, { status: 404 });

    await cloudinary.uploader.destroy(img.public_id);
    await ProductImage.findByIdAndDelete(imageId);

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error" }, { status: 500 });
  }
}
 */

export {};