<h1 align="center">🌟 XDCPay 🌟</h1>
<p align="center">Start your project with Single Command</p>

<p align="center">
<a href="https://github.com/stugufaka/XDCPay/blob/master/LICENSE" title="License">
<img src="https://img.shields.io/github/license/stugufaka/XDCPay" alt="XDCPay"/>
</a>
<a href="https://github.com/stugufaka/XDCPay/fork" title="Forks">
<img src="https://img.shields.io/github/forks/stugufaka/XDCPay" alt="XDCPay Forks"/>
</a>
<a href="https://github.com/stugufaka/XDCPay" title="Stars">
<img src="https://img.shields.io/github/stars/stugufaka/XDCPay" alt="XDCPay Stars"/>
</a>

</a>
</p>

<p align="center" title="Project Initiator"><img src="/land.png" alt="Project Initiator"/></p>

<h2 align="center">🌐 Links 🌐</h2>
<p align="center">
    <a href="https://www.youtube.com/watch?v=8enz6PT-jro" title="">🖥️ Video</a>
    .
    <a href="https://xdcpay.netlify.app/" title="">🔗 Website</a>
    ·
    <a href="https://github.com/stugufaka/XDCPay" title="">📂 Repo</a>
    ·
    <a href="https://github.com/stugufaka/XDCPay" title="🐛Report Bug/🎊Request Feature">🚀 Got Issue</a>
</p>

## 💪 Motivation

Our app is designed to provide financial services that cater to the needs of everyone, regardless of their location or financial status. The payment app allows individuals to send and receive payments using a range of cryptocurrencies, promoting financial inclusion and making it easier for people to pay for goods and services regardless of their location. The exchange provides a seamless experience for individuals to convert between different cryptocurrencies, enabling people to access the benefits of the crypto economy.

We have gone further by building a peer-to-peer lending platform that provides access to credit in a secure and transparent manner. Traditional lending institutions can be opaque and biased towards certain groups, making it difficult for many people to access the credit they need. By removing intermediaries and enabling borrowers and lenders to transact directly, we can reduce fees and promote financial inclusion for underserved communities.

Our app is a tool for empowerment and social change. By leveraging blockchain technology, we can create a financial ecosystem that is transparent, decentralized, and accessible to everyone. We believe that everyone should have the opportunity to achieve their financial goals and build a better future for themselves and their families. Join us in our mission to build a more just and equitable society, one transaction at a time.

## 🚀 How it works

Connect your account: Users then connect their cryptocurrency wallets to the app.

Cryptocurrency payments: Users can send and receive payments using a range of cryptocurrencies, including XDC, USDT, ETH, and BNB. To make a payment, they would need to select the appropriate cryptocurrency, enter the recipient's wallet address, and specify the amount they want to send. The app would process the transaction and update the users' wallet balances accordingly.

Cryptocurrency exchange: Users can also exchange one cryptocurrency for another using the app. They would need to select the appropriate currencies and specify the amount they want to exchange. The app would process the transaction and update the users' wallet balances accordingly.

Peer-to-peer lending: The app's peer-to-peer lending platform enables borrowers and lenders to transact directly using XDC, USDT, ETH, or BNB. Borrowers would need to create an account on the app and provide information about their creditworthiness. Lenders would also need to create an account and provide information about the funds they are willing to lend. Borrowers and lenders can then transact directly on the app, with the app facilitating the transaction and providing a secure and transparent platform.

## 🦋 Prerequisite

- [Nodejs](https://nodejs.org/en// "Node") Installed

- [Git](https://git-scm.com/ "Git OFficial") Installed

- [npm](https://www.npmjs.com/ "npm ") Installed

- [Hardhat](https://hardhat.org/ "Hardhat ") Installed

## 🛠️ Installation Steps

1. Clone the repository

```Bash
git clone https://github.com/stugufaka/XDCPay
```

2. Change the working directory

```Bash
cd XDCPay
```

3. Start the local Hardhat node

```Bash
npx hardhat node
```

4. With the network running, deploy the contracts to the local network in a separate terminal window

```Bash
npx hardhat run scripts/deploy.js --network localhost
```

5. Start the app

```Bash
npm run start
```

**🎇 You are Ready to Go!**

## ⚙️ Configuration

The chain ID should be 80001. If you have a localhost rpc set up, you may need to overwrite it.

<p align="center" title="Project Initiator"><img src="./src/assets/rpc.jpg" alt="Project Initiator"/></p>

To deploy to Polygon test or main networks, update the configurations located in hardhat.config.js to use a private key and, optionally, deploy to a private RPC like Infura.

```Bash
require('@nomiclabs/hardhat-waffle');
const privateKey = 'xxx';
const projectId = 'xx';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    xdc: {
      url: "https://erpc.apothem.network",
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 8000000000,
      network_id: 51,
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
```

## 👷 Built with

- [Solidity](https://docs.soliditylang.org/en/v0.8.17/ "Solidity"): as Main Coding Language for writing smart contract

- [ReactJs](https://reactjs.org/ "React Js"): as Main Coding Language for Creating The UI components (Front End)

- [TailwindCss](https://tailwindcss.com/ "Tailwind Css"): as Main Coding Language for styling UI components

- [IPFS](https://ipfs.tech/ "IPFS"): For Storing of files

- [Web3 Storage](https://www.google.com/search?q=web3storage "Web3 Storage"): For Storing of files

- [Moralis](https://moralis.io/ "Moralis"): as Tool for creating the chat section

- [Github](https://github.com/ "Github") : For Repo Storage and source code management

- [Git](https://git-scm.com/ "Git") : For Version Control System

- [Quick Node](https://www.quicknode.com "QuickNode") : Blockchain APIs

## 📂 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

- Fork the Project

- Create your Feature Branch (git checkout -b feature/AmazingFeature)

- Commit your Changes (git commit -m 'Add some AmazingFeature')

- Push to the Branch (git push origin feature/AmazingFeature)

- Open a Pull Request

## 🎊 Future Updates

- [ ] We are working on our adding more web3 storage platforms

- [ ] NFTs for all media type (Videos, Audio and PDFs)

- [ ] Working of creating our own decentralize storage system

- [ ] Get tokens as your share files

## 🧑🏻 Author

**Stugu Faka**

- 🌌 [Profile](https://github.com/stugufaka "Stugu Faka")

- 🏮 [Email](stugufaka@gmail.com "Hi!")

<h2 align="center">🤝 Support</h2>

<p align="center">🎀 Contributions (<a href="https://guides.github.com/introduction/flow" title="GitHub flow">GitHub Flow</a>), 🔥 issues, and 🥮 feature requests are most welcome!</p>

<p align="center">💙 If you like this project, Give it a ⭐ and Share it with friends!</p>

<p align="center">Made with Solidity and Javascript & ❤️ </p>
