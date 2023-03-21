import { ethers } from "ethers";
import XDCPayABI from "./XDCPay.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(
      "0xE075629Ce7509974C337975e159F84bdEC323930",
      XDCPayABI.abi,
      signer
    );

    return contractReader;
  }
};
