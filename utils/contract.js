import { ethers } from "ethers";
import XDCPayABI from "./XDCPay.json";
import XLending from "./XLending.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(
      "0xb11dd1e60D576F371e3458b788f0562e0add545D",
      XDCPayABI.abi,
      signer
    );

    return contractReader;
  }
};

export const lendingContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(
      "0xFB751FFf9Af97EE517BcBeC04C6A8384e3C8eB2B",
      XLending.abi,
      signer
    );
    return contractReader;
  }
};
