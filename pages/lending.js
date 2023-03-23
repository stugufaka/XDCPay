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
  useEffect(() => {
    async function fetchData() {
      // Connect to the Ethereum network using MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { ethereum } = window;

      if (ethereum) {
        const signer = provider.getSigner();

        const xlendingInstance = new ethers.Contract(
          "0x33bCAcf9F250072E36382A492358109C5B159568",
          XLending.abi,
          signer
        );

        // Call the getAllLenders function to get the list of all lenders
        const allLenders = await xlendingInstance.getAllLenders();
        const isLender = await xlendingInstance.isLender(address);
        const isBorrower = await xlendingInstance.isBorrower(address);
        const pendingloans = await xlendingInstance.getPendingLoans();
        const allloansgiveout = await xlendingInstance.getAllLoansGivenOut(
          address
        );

        const borrowerPendingloan =
          await xlendingInstance.borrowerPendingLoans();

        // console.log(upaidLoans);
        setborrowerpendingLoan(borrowerPendingloan);
        setAllLoansGivenOut(allloansgiveout);
        setAllLoansGivenOut(allloansgiveout);
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
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex justify-center">
            <button
              onClick={() => {
                becomeLender();
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full mr-2"
            >
              I want to lend
            </button>
            <button
              onClick={() => {
                becomeBorrower();
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-full"
            >
              I want to borrow
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {isLender == true ? (
        <Lender data={pendingLoans} loangivenout={loangivenout} />
      ) : (
        ""
      )}
      {isBorrower == true ? (
        <Borrower data={lenders} borrowerpendingloan={borrowerpendingloan} />
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

// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import XLending from "../utils/XLending.json";

// function App() {
//   const [lenders, setLenders] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       // Connect to the Ethereum network using MetaMask
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const { ethereum } = window;

//       if (ethereum) {
//         const signer = provider.getSigner();

//         const xlendingInstance = new ethers.Contract(
//           "0x0729d0199AdEc19A6b9C8Ed24225591F989d9544",
//           XLending.abi,
//           signer
//         );

//         // Call the getAllLenders function to get the list of all lenders
//         const allLenders = await xlendingInstance.getAllLenders();

//         // Set the state to the list of all lenders
//         setLenders(allLenders);
//       }
//     }

//     fetchData();
//   }, []);

//   console.log(lenders);
//   return (
//     <div>
//       <h1>All Lenders:</h1>
//       <ul>
//         {lenders.map((lender) => (
//           <li key={lender} className="text-white">
//             {lender}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
