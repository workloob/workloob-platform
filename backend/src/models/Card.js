const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  flutterwaveToken: { type: String, required: true },
  cardLast4: { type: String, required: true },
  linkedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Card", CardSchema);
