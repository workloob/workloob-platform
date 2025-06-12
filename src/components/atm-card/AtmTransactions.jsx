import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const AtmTransactions = () => {
  const [transactions] = useState([
    {
      date: "2024-08-30",
      amount_usdc: 100,
      amount_ngn: 170000,
      exchange_rate: 1700,
      fees: 0.2,
      transactionId: "0x9893A7C4D5E65C148FBA9345C87D0AE23A1BC8765",
      status: "success",
    },
    {
      date: "2024-08-28",
      amount_usdc: 50,
      amount_ngn: 80000,
      exchange_rate: 1650,
      fees: 0.1,
      transactionId: "0x1234B8F6G9H65C148BC92DE34A983FEAC7B1C54F3",
      status: "Declined",
    },
    {
      date: "2024-08-27",
      amount_usdc: 25,
      amount_ngn: 38000,
      exchange_rate: 1600,
      fees: 0.05,
      transactionId: "0x5678C9D8E2F65C1489AC3BF29384930FF12ACD5AB",
      status: "success",
    },
    {
      date: "2024-08-26",
      amount_usdc: 200,
      amount_ngn: 370000,
      exchange_rate: 1580,
      fees: 0.25,
      transactionId: "0x9012E3F4G5H65C148FEAB1298F37BC920ADB7345F",
      status: "success",
    },
  ]);

  // Center truncate longer
  const truncateTransactionId = (id) => {
    if (id.length <= 20) return id;
    return `${id.slice(0, 6)}...${id.slice(-6)}`;
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      toast.success("Transaction ID copied successfully!");
    });
  };

  return (
    <section className="tablecss">
      <Toaster richColors position="top-right" />
      <h1>Card Transaction History</h1>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead className="tableheadd">
            <tr>
              <th>Date</th>
              <th>Amount (USDC)</th>
              <th>Amount (NGN)</th>
              <th>Ex Rate</th>
              <th>Fees</th>
              <th>Hash</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.date}</td>
                <td>{tx.amount_usdc} USDC</td>
                <td>{tx.amount_ngn} NGN</td>
                <td>{tx.exchange_rate} NGN</td>
                <td>{tx.fees} USDC</td>
                <td>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ whiteSpace: "nowrap" }}>
                      {truncateTransactionId(tx.transactionId)}
                    </span>
                    <button
                      onClick={() => copyToClipboard(tx.transactionId)}
                      style={{
                        marginLeft: "8px",
                        border: "none",
                        background: "transparent",
                        color: "white",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      title="Copy Transaction ID"
                    >
                      <i className="bi bi-clipboard"></i>
                    </button>
                  </span>
                </td>
                <td>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AtmTransactions;
