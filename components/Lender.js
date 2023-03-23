import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles
import { Dialog } from "@headlessui/react";
import XLending from "../utils/XLending.json";
import TransactionStatus from "./TransactionStatus";
import { approveLoan, requestLoan } from "../utils/lendingQueries";

const Lender = ({ data, loangivenout, instance }) => {
  console.log(data);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [txPending, setTxPending] = useState(false);
  const [index, setindex] = useState("");
  const [loanstatus_, setLoanStatus] = useState("");
  const [address_, setAddress_] = useState("");
  const [index_, setIndex_] = useState("");
  console.log(instance);
  const handleRequestLoan = async () => {
    setTxPending(true);
    let value = await approveLoan(address, index);
    console.log(value);
    setTxPending(false);
    return value;
  };

  const getLoanStatus = async (address, index) => {
    let value = await instance.checkLoanStatus(address, index);
    setLoanStatus(value);
  };

  useEffect(() => {
    data?.forEach((item, index) => {
      getLoanStatus(item.borrowerAddress, index);
    });
  }, [data]);

  console.log(loanstatus_);
  return (
    <>
      <div class="relative w-5/6 overflow-x-auto shadow-md sm:rounded-lg">
        <p className="text-lg py-4">List of Loans directed to you</p>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Borrower Address{" "}
              </th>
              <th scope="col" class="px-6 py-3">
                interestRate{" "}
              </th>
              <th scope="col" class="px-6 py-3">
                loanAmount
              </th>
              <th scope="col" class="px-6 py-3">
                Borrowers score
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((items, index) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="px-6 py-4">{items.borrowerAddress}</td>
                  <td class="px-6 py-4">{items.interestRate.toString()}</td>
                  <td class="px-6 py-4">
                    {ethers.utils.formatUnits(items.loanAmount.toString())}
                  </td>
                  <td class="px-6 py-4">{items.score.toString()}</td>
                  <td class="px-6 py-4 text-left">
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 rounded-full focus:ring-blue-300 font-medium text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => {
                        setOpen(true);
                        setAddress(items.borrowerAddress);
                        setindex(index);
                        handleRequestLoan();
                      }}
                    >
                      {loanstatus_ ? "Approved" : "Approve"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {txPending && <TransactionStatus />}
    </>
  );
};

export default Lender;
