import Footer from "../components/Footer";
import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import PaymentComponent from "../components/payment";
import SwapComponent from "../components/SwapComponent";
import { ethers } from "ethers";
import XLending from "../utils/XLending.json";
import {
  becomeABorrower,
  becomeALender,
  getAllBorrowers,
  getAllLenders,
  isLender,
} from "../utils/lendingQueries";
import { useAccount } from "wagmi";
import TransactionStatus from "../components/TransactionStatus";
import { getPaymentHistory, getTokenBalance } from "../utils/queries";
import Lender from "../components/Lender";
import Borrower from "../components/Borrowers";
export default function Home() {
  const { address } = useAccount();
  const [txPending, setTxPending] = useState(false);
  const [lenders, setLenders] = useState("");
  const [isLender, setIsLender] = useState("");
  const [isBorrower, setIsBorrower] = useState("");
  const [interestRate, setInterestRate] = useState(0);
  const [pendingLoans, setpendingLoans] = useState([]);
  const [loangivenout, setAllLoansGivenOut] = useState("");
  const [borrowerpendingloan, setborrowerpendingLoan] = useState("");
  const [instance, setinstance] = useState("");
  useEffect(() => {
    async function fetchData() {
      // Connect to the Ethereum network using MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { ethereum } = window;

      if (ethereum) {
        const signer = provider.getSigner();

        const xlendingInstance = new ethers.Contract(
          "0xa0A992E755C9034C38F4b345434E053F474E2378",
          XLending.abi,
          signer
        );

        setinstance(xlendingInstance);
        // Call the getAllLenders function to get the list of all lenders
        const allLenders = await xlendingInstance.getAllLenders();
        const isLender = await xlendingInstance.isLender(address);
        const isBorrower = await xlendingInstance.isBorrower(address);
        const pendingloans = await xlendingInstance.getPendingLoans();

        const borrowerPendingloan =
          await xlendingInstance.borrowerPendingLoans();

        setborrowerpendingLoan(borrowerPendingloan);
        // setAllLoansGivenOut(allloansgiveout);
        setpendingLoans(pendingloans);
        setIsLender(isLender);
        setIsBorrower(isBorrower);
        setLenders(allLenders);
      }
    }

    fetchData();
  }, []);

  console.log(isLender == false && isBorrower == false);
  console.log(pendingLoans);

  function handleInterestRate() {
    const rate = window.prompt("Enter your interest rate:");
    if (rate !== null && rate !== "") {
      setInterestRate(parseFloat(rate));
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
      <Header />
      {isLender == false && isBorrower == false ? (
        // <div className="flex flex-col justify-center items-center h-screen">
        //   <div className="flex justify-center">
        //     <button
        //       onClick={() => {
        //         becomeLender();
        //       }}
        //       className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full mr-2"
        //     >
        //       I want to lend
        //     </button>
        //     <button
        //       onClick={() => {
        //         becomeBorrower();
        //       }}
        //       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-full"
        //     >
        //       I want to borrow
        //     </button>
        //   </div>
        // </div>
        <div className="card lg:card-side bg-base-100 shadow-xl m-7">
          <figure>
            <img
              src="https://i.ibb.co/cL4h5T6/pexels-alesia-kozik-6771607.jpg"
              alt="Album"
            />
          </figure>
          <div className="card-body ">
            <h2 className="card-title">XLending</h2>
            <p>
              XLending is the peer-to-peer XDC lending platform that puts you in
              control.
              <br />
              Whether you're looking to borrow money or earn interest as a
              lender
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-accent"
                onClick={() => {
                  becomeLender();
                }}
              >
                Lender
              </button>
              <button
                onClick={() => {
                  becomeBorrower();
                }}
                className="btn btn-primary"
              >
                Borrower
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {isLender == true ? (
        <Lender data={pendingLoans} instance={instance} />
      ) : (
        ""
      )}
      {isBorrower == true ? (
        <Borrower
          data={lenders}
          borrowerpendingloan={borrowerpendingloan}
          instance={instance}
        />
      ) : (
        ""
      )}

      {txPending && <TransactionStatus />}
    </div>
  );

  async function becomeLender() {
    handleInterestRate();
    setTxPending(true);
    let value = await becomeALender(interestRate);
    console.log(value);
    setTxPending(false);
    return value;
  }

  async function becomeBorrower() {
    setTxPending(true);
    let value = await becomeABorrower();
    setTxPending(false);
    return value;
  }
}
