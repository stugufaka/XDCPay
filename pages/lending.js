import Footer from "../components/Footer";
import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import PaymentComponent from "../components/payment";
import SwapComponent from "../components/SwapComponent";

import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  console.log(address);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
      <Header />
      {/* <SwapComponent /> */}
      {/* <Footer /> */}

      <PaymentComponent />
    </div>
  );
}
