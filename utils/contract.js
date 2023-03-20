import { ethers } from "ethers";
import XDCPayABI from "./XDCPay.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(
      "0xF3832132A037646837c59bB3A9dD70dCe44E7F82",
      XDCPayABI.abi,
      signer
    );

    return contractReader;
  }
};
