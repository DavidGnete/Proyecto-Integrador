// app/api/products/route.ts
import { NextResponse } from "next/server";
import { Nube } from "@/lib/models/Nube";
import { MongoConnection } from "@/lib/db";

export async function GET() {
  try {
    await MongoConnection();

    const products = await Nube.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { products },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error al cargar productos" },
      { status: 500 }
    );
  }
}