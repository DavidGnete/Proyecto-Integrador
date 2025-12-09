const express = require('express');
const axios = require('axios');
const cors = require('cors');  /* permite que otros servicios consuman este servicio */
const pino = require('pino'); /* libreria que permite ver los errores en el docker */

const logger = pino({ transport: { target: 'pino-pretty' } }); /* configura para que sea legible */
const app = express();

app.use(express.json());
app.use(cors());   /* permite que el microserVICIO RECIBA DATOS EN FORMATO JSON */

const PORT = 3002;

// ⚠️ Token fijo, sin env (PUEDES CAMBIARLO AQUÍ)
const MP_ACCESS_TOKEN = "VgsyzPo3QA9QpRbm2JnoHpMVOC8";

// ⚠️ URL donde MP enviará el webhook
const NOTIFICATION_URL = "https://tu-dominio.com/api/payment/webhook";

// POST /preferences
app.post('/preferences', async (req, res) => {
  try {
    const body = req.body || {};
    const items = body.items || [];
    const back_urls = body.back_urls || {};
    const payer = body.payer || {};

    const reference = `order_${Date.now()}_${Math.floor(Math.random()*1000)}`;

    const preferencePayload = {
      items,
      payer,
      external_reference: reference,
      back_urls: back_urls,
      notification_url: NOTIFICATION_URL
    };

    const mpRes = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      preferencePayload,
      {
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.json({
      preferenceId: mpRes.data.id,
      reference,
    });
  } catch (err) {
    logger.error("Error creating preference", err);
    return res.status(500).json({ error: "Error creating preference" });
  }
});

// Webhook
app.post('/webhook', (req, res) => {
  logger.info("Webhook received:", req.body);
  return res.status(200).send("ok");
});

app.get("/", (req, res) => {
  res.json({ ok: true, service: "payment-service" });
});

ap
