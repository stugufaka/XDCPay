import { ethers } from "ethers";
import XDCPayABI from "./XDCPay.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(
      "0xebeA723bb10a367b2Dd4f8AF9B8b9b874e4647DD",
      XDCPayABI.abi,
      signer
    );

    return contractReader;
  }
};
