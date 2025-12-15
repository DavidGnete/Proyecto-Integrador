export async function GET(request: Request) {
  try {
    return Response.json({ message: "product-images GET OK" }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: err?.message || "Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    return Response.json({ message: "product-images POST OK" }, { status: 201 });
  } catch (err: any) {
    return Response.json({ error: err?.message || "Error" }, { status: 500 });
  }
}