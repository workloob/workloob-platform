import React, { useState, useEffect, useRef } from "react";
import workloobLogo from "../../assets/img/worklob-logo-cp-no-bg.png";
import mastercardLogo from "../../assets/img/master-card.png";
import eyeOpen from "../../assets/img/smart-wallet.png";
import eyeSlash from "../../assets/img/smart-wallet.png";
import usdc from "../../assets/img/usdc.png";
import cardBG from "../../assets/img/atm-bg-use.png";
import Linkcardmodal from "./Linkcardmodal";
import AtmTransactions from "./AtmTransactions";
import { useWeb3 } from "../../Web3Provider";
import { useSmartWallet } from "../../SmartWallet";
import { useWallet } from "../WalletContext";
import "./atm.css";

const dummyCardData = {
  cardNumber: "4765367646789889",
  balance: "650.00",
  currency: "USDC",
  cardHolder: "Toluwase John",
  linked_address: "0x93893EA64dA1311c2993E08B8d92Db57B657c148",
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
  const { walletType, setWalletType } = useWallet();
  const dropdownRef = useRef();

  // Call both hooks unconditionally
  const web3 = useWeb3();
  const smartWallet = useSmartWallet();
  const { connectWallet, walletAddress, shortenAddress, connected } =
    (walletType === "metamask"
      ? web3
      : walletType === "smartwallet"
      ? smartWallet
      : {}) || {};

  const formatCardNumber = (number) => {
    return number.replace(/\d{4}(?=.)/g, "$& ");
  };

  useEffect(() => {
    if (walletAddress) {
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                <p>
                  {walletAddress?.toLowerCase() ===
                  dummyCardData.linked_address.toLowerCase()
                    ? `${dummyCardData.linked_address.slice(
                        0,
                        6
                      )}...${dummyCardData.linked_address.slice(-4)}`
                    : "••••••••••••••••••••"}
                </p>
                <div className="logo d-flex align-items-center">
                  <img
                    style={{ borderRadius: "50%" }}
                    src={usdc}
                    alt=""
                    className="h-[90px] w-[70px] object-cover"
                  />

                  <span style={{ color: "white" }} className="d-lg-block">
                    {walletAddress?.toLowerCase() ===
                      dummyCardData.linked_address.toLowerCase() && isVisible
                      ? `${dummyCardData.balance} USDC`
                      : "-- USDC"}
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
                {walletAddress?.toLowerCase() ===
                dummyCardData.linked_address.toLowerCase()
                  ? isVisible
                    ? formatCardNumber(dummyCardData.cardNumber)
                    : `•••• •••• •••• ${dummyCardData.cardNumber.slice(-4)}`
                  : "•••• •••• •••• ••••"}
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
                {walletAddress?.toLowerCase() ===
                dummyCardData.linked_address.toLowerCase() ? (
                  <button
                    className="modall-button"
                    onClick={() => setSpendLimit(limitInput)}
                  >
                    Set Spend Limit
                  </button>
                ) : (
                  <button
                    className="modall-button"
                    onClick={() => setModalOpen(true)}
                  >
                    Link Card
                  </button>
                )}
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
                <button onClick={connectWallet} className="atm-wallet-button">
                  Connect Wallet
                </button>
              </>
            ) : (
              <>
                <button className="atm-wallet-button">
                  {walletAddress
                    ? `${walletAddress.slice(
                        0,
                        Math.floor((walletAddress.length - 8) / 2)
                      )}...${walletAddress.slice(
                        Math.ceil((walletAddress.length + 8) / 2)
                      )}`
                    : "Loading..."}
                </button>
                {/* <div className="wallet-dropdown-wrapper">
                  <button
                    className="atm-wallet-button"
                    onClick={() => setWalletDropdown(!walletDropdown)}
                  >
                    {shortenAddress ? shortenAddress : "Connect Wallet"}{" "}
                    <i className="bi bi-chevron-down"></i>
                  </button>

                  {walletDropdown && (
                    <div className="wallet-address-dropdown">
                      <button className="change-wallet-btn">
                        Change Wallet
                      </button>
                    </div>
                  )}
                </div> */}
              </>
            )}
          </div>

          {/* Card Details Section */}
          <div className="atmcard-card">
            <div className="atmcard-card-header">
              <h4>Details</h4>
              <span ref={dropdownRef}>
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
                      <button id="dropbtn">Disable Card</button>
                      <button id="dropbtn">Delete Card</button>
                    </div>
                  )}
                </div>
              </span>
            </div>
            <div className="bonus-details">
              <p>
                Card Holder:{" "}
                <span>
                  {walletAddress?.toLowerCase() ===
                  dummyCardData.linked_address.toLowerCase()
                    ? dummyCardData.cardHolder
                    : "•••• ••••••••"}
                </span>
              </p>
              <p>
                Address:{" "}
                <span>
                  {walletAddress?.toLowerCase() ===
                  dummyCardData.linked_address.toLowerCase()
                    ? `${dummyCardData.linked_address.slice(
                        0,
                        6
                      )}...${dummyCardData.linked_address.slice(-4)}`
                    : "••••••••••••••••••••"}
                </span>
              </p>
              {walletAddress?.toLowerCase() ===
              dummyCardData.linked_address.toLowerCase() ? (
                <>
                  <p>
                    Card Number:{" "}
                    <span>
                      {isVisible
                        ? dummyCardData.cardNumber
                        : `•••• •••• •••• ${dummyCardData.cardNumber.slice(
                            -4
                          )}`}
                    </span>
                  </p>
                  <p>
                    CVV:
                    <span>{isVisible ? dummyCardData.cvv : "•••"}</span>
                  </p>
                  <p>
                    Expiry Date: <span>{dummyCardData.expiry}</span>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Card Number: <span>•••• •••• •••• ••••</span>
                  </p>
                  <p>
                    CVV: <span>•••</span>
                  </p>
                  <p>
                    Expiry Date: <span>••/••</span>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Link Card Modal */}
          <Linkcardmodal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
      </div>
      <AtmTransactions
        walletAddress={walletAddress}
        linked_address={dummyCardData.linked_address}
      />
    </>
  );
};

export default Atmcard;
