import Footer from "../components/Footer";
import Header from "../components/Header";
import SwapComponent from "../components/SwapComponent";
import React, { useState } from "react";
import { ethers } from "ethers";
import XDCPay from "../utils/XDCPay.json";
import XSWAP from "../utils/XSWAP.json";

function SwapForm() {
  const [fromToken, setFromToken] = useState("XDC");
  const [toToken, setToToken] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSwap = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const xdcPayAddress = "0x0e4BC588743103FC081Be66F8A6c6b421061fD80"; // address of the deployed XDCPay smart contract
    const xswapAddress = "0x3f7C5bd0e7413cE0671Ee2398AD95F4C1dD2BbE3"; // address of the deployed XSWAP smart contract
    const xdcPay = new ethers.Contract(xdcPayAddress, XDCPay.abi, signer);
    const xswap = new ethers.Contract(xswapAddress, XSWAP.abi, provider);
    const fromTokenId = xdcPay.supportedTokens[fromToken];
    const toTokenId = xdcPay.supportedTokens[toToken];
    const amountInWei = ethers.utils.parseEther(amount);
    const xdcAmountInWei = await xdcPay.swap(amountInWei, fromToken, toToken);
    console.log(amountInWei);
    const xdcAmount = ethers.utils.formatEther(amountInWei);
    setMessage(`Swapped ${amount} ${fromToken} for ${xdcAmount} XDC.`);
  };

  return (
    <form onSubmit={handleSwap}>
      <label>
        Swap from:
        <select
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value)}
        >
          <option value="XDC">XDC</option>
          <option value="ETH">ETH</option>
          <option value="BSC">BSC</option>
          <option value="USD">USD</option>
        </select>
      </label>
      <label>
        Swap to:
        <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
          <option value="XDC">XDC</option>
          <option value="ETH">ETH</option>
          <option value="BSC">BSC</option>
          <option value="USD">USD</option>
        </select>
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button type="submit">Swap</button>
      <p>{message}</p>
    </form>
  );
}
export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
      <Header />
      <SwapComponent />
      {/* <Footer /> */}

      {/* <SwapForm /> */}
    </div>
  );
}
