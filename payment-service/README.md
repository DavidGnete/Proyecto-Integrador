Payment microservice

Endpoints:
- POST /preferences  -> create Mercado Pago preference
- POST /webhook      -> receive Mercado Pago notifications
- GET  /            -> health check

Env variables:
- MERCADOPAGO_ACCESS_TOKEN (required to create preferences)
- MONGO_URI (optional, if you want to persist orders)
- NOTIFICATION_URL (optional, override notification URL used in preference)
- BACKEND_URL (optional, used to build notification_url if NOTIFICATION_URL not set)
- PORT (optional, default 4000)

Build locally:

```powershell
cd payment-service
npm install
npm start
```

Build Docker image:

```powershell
docker build -t payment-service:latest ./payment-service
docker run -e MERCADOPAGO_ACCESS_TOKEN=your_token -p 4000:4000 payment-service:latest
```

Example preference request (curl):

```bash
curl -X POST http://localhost:4000/preferences \
  -H "Content-Type: application/json" \
  -d '{"items":[{"id":"1","title":"Test","quantity":1,"unit_price":100}], "back_urls": {"success":"http://localhost:3000/success"}}'
```

Notes:
- For local webhook testing use ngrok to expose `http://localhost:4000/webhook` to the internet and set `NOTIFICATION_URL` to the ngrok URL.
- The service attempts to persist orders if `MONGO_URI` is provided. If not, it still creates preferences but will not persist orders.
