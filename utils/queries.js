import { BigNumber, ethers } from "ethers";
import { contract } from "./contract";
import { toEth } from "./ether-utils";

export async function swap(amount, fromToken, toToken) {
  try {
    let tx = { value: toWei(amount) };
    // console.log("@@@@@@@@@ tx", amount);
    console.log("@@@@SUPPOSED AMOUNT IN WEI", amount);
    const amountInWei = ethers.utils.parseEther(amount);

    const contractObj = await contract();
    const data = await contractObj.swap(amountInWei, fromToken, toToken);

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function pay(amount, token) {
  try {
    let tx = { value: toWei(amount) };

    const contractObj = await contract();
    const data = await contractObj.pay(tx, token);

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function convert(tokenName, amount) {
  try {
    const contractObj = await contract();
    const data = await contractObj.convert(tokenName, toWei(amount));

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function convertTokens(fromToken, toToken) {
  try {
    let tx = { value: toWei(amount) };

    const contractObj = await contract();
    const data = await contractObj.convertTokens(fromToken, toToken, tx);

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

// export async function swapTokenToToken(srcToken, destToken, amount) {
//   try {
//     const contractObj = await contract()
//     const data = await contractObj.swapTokenToToken(
//       srcToken,
//       destToken,
//       toWei(amount),
//     )

//     const receipt = await data.wait()
//     return receipt
//   } catch (e) {
//     return parseErrorMsg(e)
//   }
// }

export async function getTokenBalance(tokenName) {
  const contractObj = await contract();
  const balance = contractObj.balance(tokenName);
  return balance;
}

// export async function getTokenAddress(tokenName) {
//   try {
//     const contractObj = await contract()
//     const address = await contractObj.getTokenAddress(tokenName)
//     return address
//   } catch (e) {
//     return parseErrorMsg(e)
//   }
// }

// export async function increaseAllowance(tokenName, amount) {
//   try {
//     const contractObj = await contract()
//     const address = await contractObj.getTokenAddress(tokenName)

//     const tokenContractObj = await tokenContract(address)
//     const data = await tokenContractObj.approve(
//       '0xc7a7651483c9a62d6f7b2baa86cd4708fab66017',
//       toWei(amount),
//     )

//     const receipt = await data.wait()
//     return receipt
//   } catch (e) {
//     return parseErrorMsg(e)
//   }
// }

function toWei(amount) {
  const toWei = ethers.utils.parseUnits(amount.toString());
  // return toWei;
  return toWei;
}

function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message;
}
