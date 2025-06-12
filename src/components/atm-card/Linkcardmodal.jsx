import React, { useState } from "react";
import { useWeb3 } from "../../Web3Provider";
import { useSmartWallet } from "../../SmartWallet";
import { useWallet } from "../WalletContext";
import { Toaster, toast } from "sonner";
import Walletmodal from "../Walletmodal";
import axios from "axios";
import API_URL from "../../config";

const Linkcardmodal = ({ isOpen, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { walletType, setWalletType } = useWallet();
  const [isWalletmodalOpen, setIsWalletmodalOpen] = useState(false);
  const openWalletmodal = () => setIsWalletmodalOpen(true);
  const closeWalletmodal = () => setIsWalletmodalOpen(false);

  // Call both hooks unconditionally
  const web3 = useWeb3();
  const smartWallet = useSmartWallet();

  const { connectWallet, walletAddress, connected } =
    (walletType === "metamask"
      ? web3
      : walletType === "smartwallet"
      ? smartWallet
      : {}) || {};

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
        walletAddress: walletAddress,
      });
      alert(`Card linked! Last 4: ${data.cardLast4}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to link card.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <>
          <h3>Link Your Workloob Card</h3>
          <div className="linkcard-inputs">
            <label>
              Workloob Card Number
              <input
                type="text"
                maxLength={16}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="cardfull-input"
              />
            </label>

            <label className="expiry-label">
              Expiry Date
              <div className="expiry-container">
                <input
                  type="text"
                  maxLength={2}
                  placeholder="MM"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  className="expiry-input"
                />
                <span className="slash">/</span>
                <input
                  type="text"
                  maxLength={2}
                  placeholder="YY"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  className="expiry-input"
                />
              </div>
            </label>

            <div className="cvv-pin-container">
              <label className="cvv-pin-label">
                CVV
                <div className="cvv-box-group">
                  {[...Array(3)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={cvv[i] || ""}
                      onChange={(e) => {
                        const newCvv = cvv.split("");
                        newCvv[i] = e.target.value.replace(/\D/, "");
                        setCvv(newCvv.join(""));
                      }}
                      className="cvv-box"
                    />
                  ))}
                </div>
              </label>

              <label className="cvv-pin-label">
                Create PIN
                <div className="pin-box-group">
                  {[...Array(4)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={pin[i] || ""}
                      onChange={(e) => {
                        const newPin = pin.split("");
                        newPin[i] = e.target.value.replace(/\D/, "");
                        setPin(newPin.join(""));
                      }}
                      className="pin-box"
                    />
                  ))}
                </div>
              </label>
            </div>

            <label>
              Email Address
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cardfull-input"
              />
            </label>
          </div>

          <br />

          <button
            className="modall-button"
            onClick={handleLink}
            disabled={loading}
          >
            {loading ? "Linking..." : "Link Card"}
          </button>
          <br />
          <button onClick={onClose} className="closemodall-button">
            Close
          </button>
        </>
      </div>
      <Walletmodal isOpen={isWalletmodalOpen} onClose={closeWalletmodal} />
    </div>
  );
};

export default Linkcardmodal;

const modalStyle = {
  display: "block",
  position: "fixed",
  zIndex: "9999",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
};

const modalContentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80%",
  width: "auto",
  minWidth: "300px",
  background: "#1a2c38",
  border: "1px solid white",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const closeButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "rgb(129, 128, 125)",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "10px",
  marginRight: "8px",
};

const walletAddressStyle = {
  textAlign: "center",
  margin: "20px 0",
  fontSize: "18px",
  fontWeight: "bold",
  background: "#fff",
  color: "#5c5a5a",
  padding: "20px",
  borderRadius: "20px",
};

const copyIconStyle = {
  display: "block",
  textAlign: "center",
  cursor: "pointer",
  fontSize: "24px",
  color: "#fff",
};

const connectButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "white",
  color: "black",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "20px",
};
