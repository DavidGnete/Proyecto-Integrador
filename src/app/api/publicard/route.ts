export async function GET(request: Request) {
  try {
    return Response.json({ message: "publicard GET OK" }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: err?.message || "Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    return Response.json({ message: "publicard POST OK" }, { status: 201 });
  } catch (err: any) {
    return Response.json({ error: err?.message || "Error" }, { status: 500 });
  }
}