import React, { useEffect, useState, useRef } from "react";
import {
  hasValidAllowance,
  increaseAllowance,
  pay,
  swap,
  swapEthToToken,
  swapTokenToEth,
  swapTokenToToken,
} from "../utils/queries";

import { CogIcon, ArrowSmDownIcon } from "@heroicons/react/outline";
import SwapField from "./SwapField";
import TransactionStatus from "./TransactionStatus";
import toast, { Toaster } from "react-hot-toast";
import { DEFAULT_VALUE, XDC } from "../utils/SupportedCoins";
import { toEth, toWei } from "../utils/ether-utils";
import { useAccount } from "wagmi";
import Selector from "./Selector";

const PaymentComponents = () => {
  const [txPending, setTxPending] = useState(false);

  const notifyError = (msg) => toast.error(msg, { duration: 6000 });
  const notifySuccess = () => toast.success("Transaction completed.");

  const { address } = useAccount();

  const [amount, setamount] = useState("");
  const [token, settoken] = useState("");
  const [recipient, setrecipient] = useState("");
  return (
    <div className="bg-zinc-900 w-[35%] p-4 px-6 rounded-xl">
      <div className="flex items-center justify-between py-4 px-1">
        <p>XPayment - Make payment accross the globe</p>
        <CogIcon className="h-6" />
      </div>
      <div className="relative bg-[#212429] p-4 py-6 rounded-xl mb-2 border-[2px] border-transparent hover:border-zinc-600">
        {/* {srcTokenComp} */}
        <input
          placeholder="enter amount you want to send"
          type={"text"}
          value={amount}
          onChange={(e) => {
            setamount(e.target.value);
          }}
          className="bg-[#212429] w-full outline-none focus:outline-none px-2 "
        />
      </div>
      <div className="bg-[#212429] p-4 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-zinc-600">
        <input
          placeholder="enter reciepient address"
          type={"text"}
          value={recipient}
          onChange={(e) => {
            setrecipient(e.target.value);
          }}
          className="bg-[#212429] w-full outline-none focus:outline-none px-2 "
        />{" "}
      </div>

      <div className="bg-[#212429] p-4 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-zinc-600">
        <select
          value={token}
          onChange={(e) => {
            settoken(e.target.value);
          }}
          id="countries"
          className="bg-[#212429] border border-[#212429] text-white text-sm rounded-lg focus:ring-0 block w-full"
        >
          <option selected>Choose a token</option>
          <option value="XDC">XDC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="BNB">BNB</option>
        </select>
      </div>
      <button
        className={"p-4 w-full my-2 rounded-xl bg-blue-700 text-white"}
        onClick={() => {
          handlePay();
        }}
      >
        send
      </button>
      {txPending && <TransactionStatus />}
      <Toaster />
    </div>
  );

  async function handlePay() {
    setTxPending(true);

    let receipt;

    // if (srcToken === XDC && destToken !== XDC)
    // receipt = await swapEthToToken(destToken, inputValue);
    // else if (srcToken !== XDC && destToken === XDC)
    // receipt = await swapTokenToEth(srcToken, inputValue);
    // else
    receipt = await pay(amount, token, recipient);

    setTxPending(false);

    console.log("@@@@@@@@@@-Reciept", receipt);
    if (receipt && !receipt.hasOwnProperty("transactionHash"))
      notifyError(receipt);
    else notifySuccess();
  }
};

export default PaymentComponents;
