// app/api/products/route.ts
import { NextResponse } from "next/server";
import { Nube } from "@/lib/models/Nube";
import { MongoConnection } from "@/lib/db";

export async function GET() {
  try {
    try {
      await MongoConnection();
    } catch (connErr) {
      // If connection failed and we're running in dev, return a small mock dataset
      console.error("Mongo connection failed in publicard route:", connErr);
      if (process.env.NODE_ENV !== "production" || process.env.DEV_USE_MOCK === "true") {
        const mock = [
          { _id: "000000000000000000000001", name: "Coworking demo", price: "50000", public_id: "demo_img", image_url: "/images/demo.jpg", city: "DemoCity" },
        ];
        return NextResponse.json({ products: mock }, { status: 200 });
      }
      // rethrow so outer catch returns 500
      throw connErr;
    }

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