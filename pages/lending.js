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

  useEffect(() => {
    async function fetchData() {
      // Connect to the Ethereum network using MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { ethereum } = window;

      if (ethereum) {
        const signer = provider.getSigner();

        const xlendingInstance = new ethers.Contract(
          "0xFB751FFf9Af97EE517BcBeC04C6A8384e3C8eB2B",
          XLending.abi,
          signer
        );

        // Call the getAllLenders function to get the list of all lenders
        const allLenders = await xlendingInstance.getAllLenders();
        const isLender = await xlendingInstance.isLender(address);
        const isBorrower = await xlendingInstance.isBorrower(address);
        const upaidLoans = await xlendingInstance.borrowerPendingLoans();

        console.log(upaidLoans.toString());
        // Set the state to the list of all lenders
        setIsLender(isLender);
        setIsBorrower(isBorrower);
        setLenders(allLenders);
      }
    }

    fetchData();
  }, []);

  console.log(isLender == false && isBorrower == false);
  console.log(lenders);

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
        <Lender />
      ) : (
        // <div className="flex flex-col justify-center items-center h-screen">
        //   <div className="flex justify-center">
        //     <p>You are a lender</p>
        //   </div>
        // </div>
        ""
      )}
      {isBorrower == true ? (
        <Borrower data={lenders} />
      ) : (
        // <div className="flex flex-col justify-center items-center h-screen">
        //   <div className="flex justify-center">
        //     <p>You are a borrower</p>
        //   </div>
        // </div>
        ""
      )}

      {txPending && <TransactionStatus />}

      {/* <button
      // onClick={async () => {
      //   await getAllLenders();
      //   // isLenderFnc();
      //   // becomeLender();
      // }}
      >
        Become a lender
      </button>
      <button
        onClick={() => {
          becomeBorrower();
        }}
      >
        Become a borrower
      </button>
      {txPending && <TransactionStatus />}

      <PaymentComponent /> */}
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
