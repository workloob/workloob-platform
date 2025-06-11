const express = require("express");
const Web3 = require("web3");
const axios = require("axios");
const Card = require("../models/Card");
const WorkloobATMArtifact = require("../abi/WorkloobATM.json");
const ABI = WorkloobATMArtifact.abi;

const router = express.Router();
const web3 = new Web3(process.env.RPC_URL);
const contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS);
const adminAccount = web3.eth.accounts.privateKeyToAccount(
  process.env.ADMIN_PRIVATE_KEY
);
web3.eth.accounts.wallet.add(adminAccount);

async function convertNGNtoUSDC(ngnAmount) {
  const res = await axios.get(
    `https://api.exchangeratesapi.io/latest?base=NGN&symbols=USD&access_key=${process.env.EXCHANGE_API_KEY}`
  );
  const rate = res.data.rates.USD; // USD per NGN :contentReference[oaicite:6]{index=6}
  return (ngnAmount * rate).toFixed(6);
}

router.post("/flutterwave", async (req, res) => {
  const { event, data } = req.body;
  if (event !== "card.withdrawal.complete") return res.sendStatus(200);

  const {
    card: { last4 },
    amount,
    currency,
  } = data;

  const cardRecord = await Card.findOne({ cardLast4: last4 });
  if (!cardRecord) return res.status(404).json({ success: false });

  try {
    const usdc = await convertNGNtoUSDC(amount);
    const usdcWei = web3.utils.toBN(Math.floor(usdc * 1e6));

    const tx = contract.methods.withdrawUSDC(cardRecord.walletAddress, usdcWei);
    const gas = await tx.estimateGas({ from: adminAccount.address });
    const receipt = await tx.send({ from: adminAccount.address, gas });

    return res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

module.exports = router;
