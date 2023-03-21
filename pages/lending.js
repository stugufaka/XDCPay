import Footer from "../components/Footer";
import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import PaymentComponent from "../components/payment";
import SwapComponent from "../components/SwapComponent";
import {
  becomeABorrower,
  becomeALender,
  getAllLenders,
  isLender,
} from "../utils/lendingQueries";
import { useAccount } from "wagmi";
import TransactionStatus from "../components/TransactionStatus";
export default function Home() {
  const { address } = useAccount();
  const [txPending, setTxPending] = useState(false);

  async function isLenderFnc() {
    setTxPending(true);
    let value = await getAllLenders(address);
    setTxPending(false);
    console.log(value);
    return value;
  }

  async function becomeLender() {
    setTxPending(true);
    let value = await becomeALender();
    setTxPending(false);
    return value;
  }

  async function becomeBorrower() {
    let value = await becomeABorrower();
    return value;
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
      <Header />
      {/* <SwapComponent /> */}
      {/* <Footer /> */}
      <button
        onClick={() => {
          isLenderFnc();
          // becomeLender();
        }}
      >
        Become a lender
      </button>
      <button>Become a borrower</button>
      {txPending && <TransactionStatus />}

      <PaymentComponent />
    </div>
  );
}
