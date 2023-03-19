import { ethers } from "ethers";
import XDCPayABI from "./XDCPay.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(
      "0x21b5A28AfAcEf4a7B803945B110be02f76fb006D",
      XDCPayABI.abi,
      signer
    );

    return contractReader;
  }
};
