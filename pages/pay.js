import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";

import Footer from "../components/Footer";
import Header from "../components/Header";
import PaymentComponent from "../components/Payment";
import SwapComponent from "../components/SwapComponent";
import XPayment from "../utils/XDCPay.json";
import { LogDescription } from "ethers/lib/utils";
export default function Home() {
  const [history, sethistory] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // Connect to the Ethereum network using MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { ethereum } = window;

      if (ethereum) {
        const signer = provider.getSigner();

        const xlendingInstance = new ethers.Contract(
          "0xb11dd1e60D576F371e3458b788f0562e0add545D",
          XPayment.abi,
          signer
        );

        // Call the getAllLenders function to get the list of all lenders
        const paymentHistory = await xlendingInstance.getAllPaymentHistory();
        console.log(paymentHistory);
        sethistory(paymentHistory);
      }
    }
    fetchData();
  }, []);

  const [tabactivepay, settabactivepay] = useState(true);
  const [tabactivehis, settabactivehis] = useState("");
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
      <Header />
      {/* <SwapComponent /> */}
      <div className="tabs tabs-boxed mb-9">
        <a
          className={`tab ${tabactivepay && "tab-active"}`}
          onClick={() => {
            settabactivehis(false);
            settabactivepay(true);
          }}
        >
          Payment
        </a>
        <a
          className={`tab ${tabactivehis && "tab-active"}`}
          onClick={() => {
            settabactivehis(true);
            settabactivepay(false);
          }}
        >
          Payment History
        </a>
      </div>
      {tabactivepay ? (
        <PaymentComponent paymenthistory={history} />
      ) : (
        <div className="  p-4 px-6 rounded-xl h-max">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>To Address</th>
                <th>Token</th>
                <th>Amount</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((items, index) => (
                <tr>
                  <th>{index}</th>
                  <th>{ellipseAddress(items.recipient)}</th>
                  <td>{items.token}</td>
                  <td>{ethers.utils.formatUnits(items?.amount?.toString())}</td>
                  <td>
                    {new Date(
                      items?.timestamp?.toString() * 1000
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Footer />
    </div>
  );

  function ellipseAddress(address) {
    const start = address.slice(0, 6); // Get the first 6 characters
    const end = address.slice(-4); // Get the last 4 characters
    return `${start}...${end}`; // Combine the start, ellipsis, and end
  }
}
