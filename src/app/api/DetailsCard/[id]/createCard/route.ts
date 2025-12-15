/* import { NextResponse } from "next/server"; */

// Minimal placeholder handlers for createCard route.
// This file exists to satisfy build-time route validation.

export async function POST(request: Request, { params }: any) {
  try {
    // Accept form data or JSON; we only echo back a success for now.
    return Response.json({ message: "createCard POST OK", params }, { status: 201 });
  } catch (err: any) {
    return Response.json({ error: err?.message || "Error" }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: any) {
  try {
    return Response.json({ message: "createCard GET OK", params }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: err?.message || "Error" }, { status: 500 });
  }
}