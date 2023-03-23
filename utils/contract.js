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
      "0xa0A992E755C9034C38F4b345434E053F474E2378",
      XLending.abi,
      signer
    );
    return contractReader;
  }
};
