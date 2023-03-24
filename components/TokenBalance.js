import React, { useEffect, useState, useRef } from "react";
import {
  getTokenAddress,
  getTokenBalance,
  increaseAllowance,
} from "../utils/queries";
import { ethers } from "ethers";
import TransactionStatus from "./TransactionStatus";
import toast, { Toaster } from "react-hot-toast";
import { useBalance } from "wagmi";

import {
  ClipboardIcon,
  ClipboardCheckIcon,
  PlusIcon,
} from "@heroicons/react/outline";

const TokenBalance = ({ name, walletAddress }) => {
  const [balance, setBalance] = useState("-");
  const [tokenAddress, setTokenAddress] = useState();

  const [copyIcon, setCopyIcon] = useState({ icon: ClipboardIcon });

  const [txPending, setTxPending] = useState(false);

  const notifyError = (msg) => toast.error(msg, { duration: 6000 });
  const notifySuccess = () => toast.success("Transaction completed.");

  useEffect(() => {
    if (name && walletAddress) {
      fetchTokenBalance();
    } else setBalance("-");
  }, [name, walletAddress]);

  async function fetchTokenBalance() {
    const bal = await getTokenBalance(name, walletAddress);

    const fBal = ethers.utils.formatUnits(bal.toString(), 18);

    // const output = ethers.utils.formatEther("998.531227839").slice(0, -1); // remove the " ether" suffix and take only the first 4 characters
    // console.log(output); // logs "0.036"
    // console.log("@@@@@@@@", fBal);
    console.log("@@@@@@@@", fBal.toString() / 10 ** 18);

    setBalance(
      name === "XDC"
        ? parseFloat(fBal.toString()).toFixed(1)
        : fBal.toString() / 10 ** 18
    );
  }

  const { data, isError, isLoading } = useBalance({
    address: walletAddress,
  });
  console.log(data);

  return (
    <div className="flex mx-2">
      <div className="flex items-center bg-zinc-900 text-zinc-300 w-fit p-2 px-3 rounded-l-lg">
        <p className="text-sm">{name}</p>
        <p className="bg-zinc-800 p-0.5 px-3 ml-3 rounded-lg text-zinc-100">
          {balance}
          {/* {isLoading ? "fetching balance" : data?.formatted} */}
          {/* {data?.formatted} */}
        </p>
      </div>

      <div className="flex items-center p-2 px-2 bg-[#2172e5] rounded-r-lg">
        <copyIcon.icon
          className="h-6 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(tokenAddress);
            setCopyIcon({ icon: ClipboardCheckIcon });
          }}
        />
      </div>

      {txPending && <TransactionStatus />}

      {/* <Toaster /> */}
    </div>
  );
};

export default TokenBalance;
