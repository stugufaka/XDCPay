import { ethers } from "ethers";
import XDCPayABI from "./XDCPay.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(
      "0xf5a5bF2A97637B2406DC860e0D5Bca710593Aa2a",
      XDCPayABI.abi,
      signer
    );

    return contractReader;
  }
};
