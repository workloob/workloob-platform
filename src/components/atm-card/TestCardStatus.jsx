import React, { useState, useEffect } from "react";
import { WorkLob_atm_address, WorkLob_atm_abi } from "../Constants";
import Web3 from "web3";

export default function CardStatus({ web3, wallet }) {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    if (web3 && wallet) {
      const contract = new web3.eth.Contract(
        WorkLob_atm_abi,
        WorkLob_atm_address
      );
      contract.methods
        .getCardData(wallet)
        .call()
        .then((res) => {
          setCardData({
            linked: res[0],
            disabled: res[1],
            limit: Number(res[2]) / 1e6,
            last4: res[3],
            expiry: new Date(Number(res[4]) * 1000).toLocaleDateString(),
          });
        })
        .catch(console.error);
    }
  }, [web3, wallet]);

  if (!cardData) return <p>Loading card data...</p>;
  return (
    <div
      style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc" }}
    >
      <h3>Card Status</h3>
      <p>Linked: {cardData.linked ? "Yes" : "No"}</p>
      <p>Disabled: {cardData.disabled ? "Yes" : "No"}</p>
      <p>Last 4 Digits: {cardData.last4}</p>
      <p>Expiry: {cardData.expiry}</p>
      <p>
        Spend Limit:{" "}
        {cardData.limit === 0 ? "Full Balance" : cardData.limit + " USDC"}
      </p>
    </div>
  );
}
