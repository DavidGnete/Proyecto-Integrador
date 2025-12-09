const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  items: { type: Array, default: [] },
  amount: Number,
  currency: { type: String, default: 'COP' },
  status: { type: String, default: 'pending' },
  preferenceId: String,
  raw: Object,
}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
