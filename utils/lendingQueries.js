import { ethers } from "ethers";
import {} from "./contract";

export async function becomeALender() {
  try {
    const data = await contract.becomeALender();
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function becomeABorrower() {
  try {
    const data = await contract.becomeABorrower();
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function addInterestRate(interestRate) {
  try {
    const data = await contract.addInterestRate(interestRate);
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
    const data = await contract.requestLoan(
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
    const data = await contract.getPendingLoans();
    return data;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getAllUnpaidLoans() {
  try {
    const data = await contract.getAllUnpaidLoans();
    return data;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function isLender(address) {
  try {
    const data = await contract.isLender(address);
    return data;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function isBorrower(address) {
  try {
    const data = await contract.isBorrower(address);
    return data;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getAllLenders() {
  try {
    const data = await contract.getAllLenders();
    return data;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getAllBorrowers() {
  try {
    const data = await contract.getAllBorrowers();
    return data;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function approveLoan(borrowerAddress, loanId) {
  try {
    const data = await contract.approveLoan(borrowerAddress, loanId);
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function repay(loanId, amount) {
  try {
    const valueInWei = ethers.utils.parseEther(amount.toString());
    const data = await contract.repay(loanId, { value: valueInWei });
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function isLoanPaid(loanId) {
  try {
    const data = await contract.isLoanPaid(loanId);
    return data;
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
