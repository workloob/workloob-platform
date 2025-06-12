import React, { useState } from "react";
import workloobLogo from "../../assets/img/worklob-logo-cp-no-bg.png";
import mastercardLogo from "../../assets/img/master-card.png";
import eyeOpen from "../../assets/img/smart-wallet.png";
import eyeSlash from "../../assets/img/smart-wallet.png";
import usdc from "../../assets/img/usdc.png";
import cardBG from "../../assets/img/atm-bg-use.png";
import Linkcardmodal from "./Linkcardmodal";
import AtmTransactions from "./AtmTransactions";
import "./atm.css";

const dummyCardData = {
  cardNumber: "4765367646789889",
  balance: "650.00",
  currency: "USDC",
  cardHolder: "Toluwase John",
  address: "0x9893.....65c148",
  cvv: "153",
  expiry: "25/28",
  spendLimit: null,
};

const Atmcard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [spendLimit, setSpendLimit] = useState(dummyCardData.spendLimit);
  const [limitInput, setLimitInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(true);
  const [cardLinked, setCardLinked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [walletDropdown, setWalletDropdown] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const formatCardNumber = (number) => {
    return number.replace(/\d{4}(?=.)/g, "$& ");
  };

  return (
    <>
      <div className="atmcard-container">
        {/* Left Column */}
        <div className="atmcard-column">
          {/* ATM Card with background */}
          <div
            className="atmcard-card atmcard-image-card"
            style={{ backgroundImage: `url(${cardBG})` }}
          >
            <div className="atmcard-card-header">
              <div className="logo d-flex align-items-center">
                <img
                  style={{ borderRadius: "5px" }}
                  src={workloobLogo}
                  alt=""
                  className="h-[90px] w-[70px] object-cover"
                />

                <span style={{ color: "#efbe2a" }} className="d-lg-block">
                  WorkLoob
                </span>
              </div>
              <img src={mastercardLogo} alt="Mastercard logo" />
            </div>

            <div className="card-middle">
              <div>
                <p>{dummyCardData.address}</p>
                <div className="logo d-flex align-items-center">
                  <img
                    style={{ borderRadius: "50%" }}
                    src={usdc}
                    alt=""
                    className="h-[90px] w-[70px] object-cover"
                  />

                  <span style={{ color: "white" }} className="d-lg-block">
                    {isVisible ? `${dummyCardData.balance} USDC` : "-- USDC"}
                  </span>
                </div>
              </div>

              <i
                className={`bi ${
                  isVisible ? "bi-eye" : "bi-eye-slash"
                } eye-icon`}
                onClick={toggleVisibility}
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
              ></i>
            </div>

            <div className="card-digits">
              <p className="cardnumberdigit">
                {isVisible
                  ? formatCardNumber(dummyCardData.cardNumber)
                  : `•••• •••• •••• ${dummyCardData.cardNumber.slice(-4)}`}
              </p>
            </div>

            <div className="card-bottom">
              <p>USDC - NGN</p>
            </div>
          </div>

          {/* Spend Limit Section */}
          <div className="atmcard-card">
            <h4>Spend Limit</h4>
            <p>This is the maximum amount your ATM card can spend</p>
            {spendLimit !== null ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span id="spend-limit">
                  <img
                    style={{ borderRadius: "50%" }}
                    src={usdc}
                    alt=""
                    height="25"
                    width="25"
                    className="object-cover"
                  />{" "}
                  {spendLimit} USDC
                </span>
                <i
                  className="bi bi-pencil-square modall-button"
                  onClick={() => {
                    setSpendLimit(null);
                    setLimitInput("");
                  }}
                ></i>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <input
                  className="spend-limit-input"
                  value={limitInput}
                  onChange={(e) => setLimitInput(e.target.value)}
                  placeholder="Enter limit"
                />
                <button
                  className="modall-button"
                  onClick={() => setSpendLimit(limitInput)}
                >
                  Set Spend Limit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="atmcard-column">
          {/* Conditional Wallet/Card Buttons */}
          <div className="wallet-conditional-buttons">
            {walletConnected && !cardLinked ? (
              <>
                <button
                  className="atm-wallet-button"
                  onClick={() => window.open("https://workloob.com", "_blank")}
                >
                  Request Card
                </button>
                <button
                  className="atm-wallet-button"
                  onClick={() => setModalOpen(true)}
                >
                  Link your Card
                </button>
              </>
            ) : !walletConnected ? (
              <>
                <button className="atm-wallet-button">Connect Wallet</button>
              </>
            ) : (
              <>
                <div className="wallet-dropdown-wrapper">
                  <button
                    className="atm-wallet-button"
                    onClick={() => setWalletDropdown(!walletDropdown)}
                  >
                    0x9893.....65c148 <i className="bi bi-chevron-down"></i>
                  </button>

                  {walletDropdown && (
                    <div className="wallet-address-dropdown">
                      <button className="change-wallet-btn">
                        Change Wallet
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Card Details Section */}
          <div className="atmcard-card">
            <div className="atmcard-card-header">
              <h4>Details</h4>
              <span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    className="three-dot"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    &#8942;
                  </div>
                  {dropdownOpen && (
                    <div className="card-dropdown">
                      <button>Disable Card</button>
                      <button>Delete Card</button>
                    </div>
                  )}
                </div>
              </span>
            </div>
            <div className="bonus-details">
              <p>
                Card Holder: <span>{dummyCardData.cardHolder}</span>
              </p>
              <p>
                Address: <span>{dummyCardData.address}</span>
              </p>
              <p>
                Card Number:{" "}
                <span>
                  {isVisible
                    ? dummyCardData.cardNumber
                    : `•••• •••• •••• ${dummyCardData.cardNumber.slice(-4)}`}
                </span>
              </p>
              <p>
                CVV: <span>{isVisible ? dummyCardData.cvv : "•••"}</span>
              </p>
              <p>
                Expiry Date: <span>{dummyCardData.expiry}</span>
              </p>
            </div>
          </div>

          {/* Link Card Modal */}
          <Linkcardmodal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
      </div>
      <AtmTransactions />
    </>
  );
};

export default Atmcard;
