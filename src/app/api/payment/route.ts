import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req: Request) {
  const body = await req.json();

  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!
  });

  const preference = new Preference(client);

  const result = await preference.create({
    body: {
      items: [
        {
          id: "123",
          title: body.title,
          quantity: body.quantity,
          unit_price: body.unit_price
        }
      ]
    }
  });

  return Response.json({ preferenceId: result.id });
}
