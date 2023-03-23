import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";

import Footer from "../components/Footer";
import Header from "../components/Header";
import PaymentComponent from "../components/payment";
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

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
      <Header />
      {/* <SwapComponent /> */}
      {/* <Footer /> */}
      <PaymentComponent paymenthistory={history} />
      <p>Payment History</p>

      <table class="w-[60%] text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Token
            </th>
            <th scope="col" class="px-6 py-3">
              Amount
            </th>
            <th scope="col" class="px-6 py-3">
              Recipient Address{" "}
            </th>
            <th scope="col" class="px-6 py-3">
              Time{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {history?.map((items, index) => {
            return (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">{items.token}</td>
                <td class="px-6 py-4">{items.recipient}</td>
                <td class="px-6 py-4">
                  {ethers.utils.formatUnits(items?.amount?.toString())}
                </td>
                <td class="px-6 py-4">
                  {new Date(
                    items?.timestamp?.toString() * 1000
                  ).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
