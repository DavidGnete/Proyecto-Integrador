export async function GET(request: Request, { params }: any) {
  try {
    return Response.json({ message: "DetailsCard GET OK", params }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: err?.message || "Error" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: any) {
  try {
    return Response.json({ message: "DetailsCard POST OK", params }, { status: 201 });
  } catch (err: any) {
    return Response.json({ error: err?.message || "Error" }, { status: 500 });
  }
}