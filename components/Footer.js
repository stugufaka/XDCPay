import React from "react";
import TokenBalance from "./TokenBalance";
import { useAccount } from "wagmi";

const Footer = () => {
  const { address } = useAccount();

  return (
    <div className="flex fixed bottom-4 left-1/2 -translate-x-1/2">
      <TokenBalance name={"XDC"} walletAddress={address} />
      <TokenBalance name={"ETH"} walletAddress={address} />
      <TokenBalance name={"BSC"} walletAddress={address} />
      <TokenBalance name={"USDT"} walletAddress={address} />
    </div>
  );
};

export default Footer;
