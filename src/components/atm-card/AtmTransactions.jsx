import React, { useState, useEffect } from "react";

const AtmTransactions = () => {
  const [transactions, setTransactions] = useState([
    {
      type: "Deposit",
      date: "2024-08-30",
      cryptocurrency: "ETH",
      transactionId: "oxs123456789abcdef",
      amount: "100 ETH",
    },
    {
      type: "Withdrawal",
      date: "2024-08-28",
      cryptocurrency: "LOB",
      transactionId: "oxsa1b2c3d4e5f67890",
      amount: "50 LOB",
    },
    {
      type: "Swap",
      date: "2024-08-27",
      cryptocurrency: "ETH to LOB",
      transactionId: "oxsabcdef123456789",
      amount: "25 ETH",
    },
    {
      type: "Deposit",
      date: "2024-08-26",
      cryptocurrency: "USDT",
      transactionId: "oxs0f9e8d7c6b5a4321",
      amount: "200 USDT",
    },
  ]);

  return (
    <>
      {/* Transaction History */}
      <section className="tablecss">
        {/* for demo wrap */}
        <h1>Transaction History</h1>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead className="tableheadd">
              <tr>
                <th>Type & Date</th>
                <th>Cryptocurrency</th>
                <th>Transaction ID</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr>
                  <td>
                    {" "}
                    {transaction.type} - {transaction.date}
                  </td>
                  <td>{transaction.cryptocurrency}</td>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AtmTransactions;
