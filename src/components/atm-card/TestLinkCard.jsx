import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../config";

export default function LinkCard({ wallet }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLink = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/v1/atm/tokenize`, {
        card_number: cardNumber,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
        cvv,
        pin,
        email,
        walletAddress: wallet,
      });
      alert(`Card linked! Last 4: ${data.cardLast4}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to link card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Link Your workloob Card</h3>
      <input
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <br />
      <input
        placeholder="Expiry MM"
        value={expiryMonth}
        onChange={(e) => setExpiryMonth(e.target.value)}
      />
      <br />
      <input
        placeholder="Expiry YY"
        value={expiryYear}
        onChange={(e) => setExpiryYear(e.target.value)}
      />
      <br />
      <input
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <br />
      <input
        placeholder="Card PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <br />
      <input
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleLink} disabled={loading}>
        {loading ? "Linking..." : "Link Card"}
      </button>
    </div>
  );
}
