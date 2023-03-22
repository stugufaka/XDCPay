import { ethers } from "ethers";
import { lendingContract, contract } from "./contract";

export async function becomeALender(interestRate) {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.becomeALender(interestRate);
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function becomeABorrower() {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.becomeABorrower();
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function addInterestRate(interestRate) {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.addInterestRate(interestRate);
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function requestLoan(
  lenderAddress,
  loanAmount,
  interestRate,
  deadline
) {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.requestLoan(
      lenderAddress,
      loanAmount,
      interestRate,
      deadline
    );
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getPendingLoans() {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.getPendingLoans();
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getAllUnpaidLoans() {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.getAllUnpaidLoans();
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function isLender(address) {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.isLender(address);
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function isBorrower(address) {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.isBorrower(address);
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getAllLenders() {
  try {
    // const contractObj = await lendingContract();
    const data = await lendingContract.getAllLenders();
    const receipt = await data.wait();
    console.log(receipt);
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getAllBorrowers() {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.getAllBorrowers();
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function approveLoan(borrowerAddress, loanId) {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.approveLoan(borrowerAddress, loanId);
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function repay(loanId, amount) {
  try {
    const valueInWei = ethers.utils.parseEther(amount.toString());
    const contractObj = await lendingContract();
    const data = await contractObj.repay(loanId, { value: valueInWei });
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function isLoanPaid(loanId) {
  try {
    const contractObj = await lendingContract();
    const data = await contractObj.isLoanPaid(loanId);
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

function toWei(amount) {
  const toWei = ethers.utils.parseUnits(amount.toString());
  // return toWei;
  return toWei;
}

function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message;
}
