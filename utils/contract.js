import { ethers } from "ethers";
import XDCPayABI from "./XDCPay.json";
import XLending from "./XLending.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(
      "0x85b2FD5f1e413168f131A41EB0c8b858642314c2",
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
      "0x27f928399Ed5EE0266104323CBE11967B97a8c46",
      XLending.abi,
      signer
    );
    return contractReader;
  }
};
