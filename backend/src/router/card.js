const express = require("express");
const axios = require("axios");
const Card = require("../models/Card");
const router = express.Router();

router.post("/tokenize", async (req, res) => {
  const {
    card_number,
    cvv,
    expiry_month,
    expiry_year,
    pin,
    email,
    walletAddress,
  } = req.body;
  try {
    const payload = {
      card_number,
      cvv,
      expiry_month,
      expiry_year,
      currency: "NGN",
      amount: "10",
      email,
      authorization: { mode: "pin", pin },
    };
    const { data } = await axios.post(
      "https://api.flutterwave.com/v3/charges?type=card",
      payload,
      { headers: { Authorization: `Bearer ${process.env.FLW_SECRET}` } }
    );

    const token = data?.data?.card?.token;
    if (!token) return res.status(400).json({ success: false });

    const last4 = card_number.slice(-4);
    await Card.create({
      walletAddress,
      flutterwaveToken: token,
      cardLast4: last4,
    });

    res.json({ success: true, token, cardLast4: last4 });
  } catch (err) {
    console.error(err.response?.data);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
