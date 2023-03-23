import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles
import { Dialog } from "@headlessui/react";
import XLending from "../utils/XLending.json";
import TransactionStatus from "./TransactionStatus";
import { requestLoan, repay } from "../utils/lendingQueries";

const Borrower = ({ data, borrowerpendingloan, instance }) => {
  console.log(borrowerpendingloan);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [txPending, setTxPending] = useState(false);
  const [loanstatus_, setLoanStatus] = useState("");
  const [tabactivelenders, settabactivelenders] = useState(true);
  const [tabactivependingloans, settabactivependingloans] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [deadline, setDeadline] = useState("");

  async function repayLoan(loanId) {
    setTxPending(true);
    let value = await instance.repay(loanId);
    console.log(value);
    setTxPending(false);
    return value;
  }

  const getLoanStatus = async (address, index) => {
    let value = await instance.checkLoanStatus(address, index);
    setLoanStatus(value);
  };

  useEffect(() => {
    borrowerpendingloan?.forEach((item, index) => {
      getLoanStatus(item.borrowerAddress, index);
    });
  }, [data]);

  const handleRequestLoan = async () => {
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
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg ">
            Fill in the details below to request for a loan{" "}
          </h3>
          <input
            type="number"
            placeholder="Loan Amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="input input-bordered w-full mt-4"
          />
          <input
            type="number"
            placeholder="Interest Rate:"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="input input-bordered w-full mt-4"
          />

          <input
            type="datetime-local"
            placeholder="Interest Rate:"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input input-bordered w-full mt-4"
          />
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn"
              onClick={() => {
                handleRequestLoan();
              }}
            >
              Submit{" "}
            </label>
          </div>
        </div>
      </div>
      <div className="tabs tabs-boxed mb-9">
        <a
          className={`tab ${tabactivelenders && "tab-active"}`}
          onClick={() => {
            settabactivependingloans(false);
            settabactivelenders(true);
          }}
        >
          Lenders{" "}
        </a>
        <a
          className={`tab ${tabactivependingloans && "tab-active"}`}
          onClick={() => {
            settabactivependingloans(true);
            settabactivelenders(false);
          }}
        >
          Pending Loans{" "}
        </a>
      </div>
      {tabactivelenders ? (
        <div className="  p-4 px-6 rounded-xl h-max">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Lender Address</th>
                <th>Balance</th>
                <th> Interest Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((items, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <th>{items.lenderAddress}</th>
                  <td>{ethers.utils.formatUnits(items.balance.toString())}</td>
                  <td>{items.interestRate.toString()}</td>
                  <td>
                    <label
                      htmlFor="my-modal"
                      className="btn-primary rounded-full px-3 py-2"
                      onClick={() => {
                        setAddress(items.lenderAddress);
                      }}
                    >
                      Request Loan{" "}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      {tabactivependingloans ? (
        <div className="  p-4 px-6 rounded-xl h-max">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Your Address</th>
                <th>Loan amount</th>
                <th> Interest Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowerpendingloan?.map((items, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <th>{items.borrowerAddress}</th>
                  <td>
                    {ethers.utils.formatUnits(items?.loanAmount?.toString())}
                  </td>
                  <td>{items.interestRate.toString()}</td>
                  <td>
                    <label
                      htmlFor="my-modal"
                      className="btn-primary rounded-full px-3 py-2"
                      onClick={() => {
                        repayLoan(index);
                      }}
                    >
                      {loanstatus_ ? "Repay" : "Pending"}{" "}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}

      {txPending && <TransactionStatus />}
    </>
  );
};

export default Borrower;
