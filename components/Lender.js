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

        <div className="  p-4 px-6 rounded-xl h-max">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th> Borrower Address</th>
                <th>InterestRatet</th>
                <th> LoanAmount</th>
                <th> Borrowers score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((items, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <th>{items.borrowerAddress}</th>
                  <td>{items.interestRate.toString()}</td>
                  <td>
                    {ethers.utils.formatUnits(items.loanAmount.toString())}
                  </td>
                  <td>{items.score.toString()}</td>
                  <td>
                    <label
                      htmlFor="my-modal"
                      className="btn-primary rounded-full px-3 py-2"
                      onClick={() => {
                        setOpen(true);
                        setAddress(items.borrowerAddress);
                        setindex(index);
                        handleRequestLoan();
                      }}
                    >
                      {loanstatus_ ? "Approved" : "Approve"}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {txPending && <TransactionStatus />}
    </>
  );
};

export default Lender;
