import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles
import { Dialog } from "@headlessui/react";
import XLending from "../utils/XLending.json";
import TransactionStatus from "./TransactionStatus";
import { requestLoan } from "../utils/lendingQueries";
function RequestLoanDialog({ open, setOpen, onSubmit }) {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [deadline, setDeadline] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(loanAmount, interestRate, deadline);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 -z-50 bg-black opacity-30" />

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Request Loan</h2>

          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Loan Amount:
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="block text-white border-gray-300 rounded-md w-full mt-1"
                required
              />
            </label>

            <label className="block mb-2">
              Interest Rate:
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="block text-white border-gray-300 rounded-md w-full mt-1"
                required
              />
            </label>

            <label className="block mb-4">
              Deadline:
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="block text-white border-gray-300 rounded-md w-full mt-1"
                required
              />
            </label>

            <button
              onClick={() => {}}
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
const Borrower = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [txPending, setTxPending] = useState(false);

  async function requestLoanH() {
    handleInterestRate();
    setTxPending(true);
    let value = await requestLoan();
    console.log(value);
    setTxPending(false);
    return value;
  }

  const handleRequestLoan = async (loanAmount, interestRate, deadline) => {
    // Code to submit loan request to the contract
    console.log(`Loan Amount: ${loanAmount}`);
    console.log(`Interest Rate: ${interestRate}`);
    console.log(`Deadline: ${deadline}`);

    setTxPending(true);
    let value = await requestLoan(address, loanAmount, interestRate, deadline);
    console.log(value);
    setTxPending(false);
    return value;
  };

  return (
    <>
      <RequestLoanDialog
        open={open}
        setOpen={setOpen}
        onSubmit={handleRequestLoan}
      />
      <div class="relative w-5/6 overflow-x-auto shadow-md sm:rounded-lg">
        <p className="text-lg py-4">List of All lenders you can borrow from</p>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Lender Address{" "}
              </th>
              <th scope="col" class="px-6 py-3">
                Balance{" "}
              </th>
              <th scope="col" class="px-6 py-3">
                Interest Rate
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
                  <td class="px-6 py-4">{items.lenderAddress}</td>
                  <td class="px-6 py-4">
                    {ethers.utils.formatUnits(items.balance.toString())}
                  </td>
                  <td class="px-6 py-4">{items.interestRate.toString()}</td>
                  <td class="px-6 py-4 text-left">
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 rounded-full focus:ring-blue-300 font-medium text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => {
                        setOpen(true);
                        setAddress(items.lenderAddress);
                      }}
                    >
                      Request Loan
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

export default Borrower;
