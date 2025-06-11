import React, { useState } from "react";
import ethers from "ethers";
import { WorkLob_atm_address, WorkLob_atm_abi } from "../Constants";

export default function SetLimit({ web3, wallet }) {
  const [amount, setAmount] = useState("");

  const handleSet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      WorkLob_atm_address,
      WorkLob_atm_abi,
      signer
    );
    const decimals = ethers.utils.parseUnits(amount || "0", 6);
    const tx = await contract.setSpendLimit(decimals);
    await tx.wait();
    alert("Spend limit set!");
    setAmount("");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Set Spend Limit (USDC)</h3>
      <input
        type="number"
        placeholder="e.g. 50.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <button onClick={handleSet} disabled={!amount}>
        Set Limit
      </button>
    </div>
  );
}
