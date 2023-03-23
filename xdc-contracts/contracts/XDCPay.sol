pragma solidity ^0.8.0;

import "./XSWAP.sol";

contract XDCPay {
    // State variables
    address owner;
    mapping(address => mapping(string => uint)) public balances;
    mapping(string => uint) public supportedTokens;
    mapping(address => mapping(string => PaymentSchedule[])) public paymentSchedules;
    mapping(address => uint256) public loanBalances;
    mapping(address => uint256) public loanAmounts;
    mapping(address => uint256) public loanTimes;
    mapping(address => uint256) public loanRates;
    mapping(address => Payment[]) public paymentHistory;
    XSWAP xswap;

    // Events
    event PaymentReceived(address payer, uint amount, string token);
    event PaymentSent(address recipient, uint amount, string token);
    event PaymentScheduled(address payer, uint amount, string token, uint interval);
    event PaymentScheduleCreated(address payer, address recipient, uint amount, string token, uint interval);

    // Structs
    struct PaymentSchedule {
        address recipient;
        string token;
        uint amount;
        uint interval;
        uint lastPaymentTime;
    }

    struct Payment {
        address sender;
        address recipient;
        string token;
        uint amount;
        uint timestamp;
    }

    // Constructor
    constructor(address _xswap) {
        owner = msg.sender;
        xswap = XSWAP(_xswap);
        supportedTokens["XDC"] = 1;
        supportedTokens["ETH"] = 2;
        supportedTokens["BSC"] = 3;
        supportedTokens["USDT"] = 4;
        balances[msg.sender]["XDC"] = msg.sender.balance;
    }

    // Public functions

    function schedulePayment(string memory token, uint amount, uint interval) public {
        require(supportedTokens[token] > 0, "Unsupported token");
        require(balances[msg.sender][token] >= amount, "Insufficient balance");
        require(interval > 0, "Interval must be greater than zero");

        PaymentSchedule memory newSchedule = PaymentSchedule({
            recipient: owner,
            token: token,
            amount: amount,
            interval: interval,
            lastPaymentTime: block.timestamp
        });

        paymentSchedules[msg.sender][token].push(newSchedule);

        emit PaymentScheduled(msg.sender, amount, token, interval);
    }

    function makeScheduledPayment(string memory token, address recipient) public {
        require(supportedTokens[token] > 0, "Unsupported token");

        PaymentSchedule[] storage schedules = paymentSchedules[msg.sender][token];
        uint scheduleIndex = getScheduleIndex(schedules, recipient);
        require(scheduleIndex < schedules.length, "No payment scheduled");

        PaymentSchedule storage schedule = schedules[scheduleIndex];
        uint paymentAmount = schedule.amount;
        uint paymentInterval = schedule.interval;
        uint lastPaymentTime = schedule.lastPaymentTime;

        require(block.timestamp >= lastPaymentTime + paymentInterval, "Payment not yet due");

        uint xdcAmount = xswap.getXswapRate(supportedTokens[token], supportedTokens["XDC"], paymentAmount);

        require(balances[msg.sender]["XDC"] >= xdcAmount, "Insufficient balance");

        balances[msg.sender]["XDC"] -= xdcAmount;
        balances[recipient][token] += paymentAmount;
        schedule.lastPaymentTime = block.timestamp;

        Payment memory payment = Payment({
            sender: msg.sender,
            recipient: owner,
            token: token,
            amount: paymentAmount,
            timestamp: block.timestamp
        });
        paymentHistory[msg.sender].push(payment);
        emit PaymentSent(msg.sender, paymentAmount, token);
        emit PaymentReceived(recipient, paymentAmount, token);
    }

    function getScheduleIndex(PaymentSchedule[] storage schedules, address recipient) internal view returns (uint) {
        for (uint i = 0; i < schedules.length; i++) {
            if (schedules[i].recipient == recipient) {
                return i;
            }
        }
        return schedules.length;
    }

    function swap(string memory fromToken, uint amount, string memory toToken) public returns (uint) {
        require(supportedTokens[fromToken] > 0 && supportedTokens[toToken] > 0, "Unsupported token");
        uint toAmount = xswap.getXswapRate(supportedTokens[fromToken], supportedTokens[toToken], amount);
        balances[msg.sender][fromToken] -= amount;
        balances[msg.sender][toToken] += toAmount;
        return toAmount;
    }

    function pay(string memory token, uint amount, address payable recipient) public  payable{
        require(supportedTokens[token] > 0, "Unsupported token");
        require(balances[msg.sender][token] >= amount, "Insufficient balance");
        payable(recipient).transfer(msg.value);
        balances[msg.sender][token] -= amount;
        emit PaymentSent(recipient, amount, token);
        uint xdcAmount = xswap.getXswapRate(supportedTokens[token], supportedTokens["XDC"], amount);
        balances[recipient]["XDC"] += xdcAmount;
        
        emit PaymentReceived(msg.sender, amount, token);

        Payment memory payment = Payment({
            sender: msg.sender,
            recipient: owner,
            token: token,
            amount: amount,
            timestamp: block.timestamp
        });
        paymentHistory[msg.sender].push(payment);
    }

    function convert(string memory fromToken, string memory toToken, uint amount) public {
        require(supportedTokens[fromToken] > 0 && supportedTokens[toToken] > 0, "Unsupported token");
        require(balances[msg.sender][fromToken] >= amount, "Insufficient balance");
        uint toAmount = xswap.getXswapRate(supportedTokens[fromToken], supportedTokens[toToken], amount);
        balances[msg.sender][fromToken] -= amount;
        balances[msg.sender][toToken] += toAmount;
    }

    function balance(string memory token) public view returns (uint) {
        require(supportedTokens[token] > 0, "Unsupported token");
        return balances[msg.sender][token];
    }

    function getAllPaymentHistory() public view returns (Payment[] memory) {
         return paymentHistory[msg.sender];
    }

    function lend(uint256 amount, uint256 rate) public {
        require(amount > 0, "Amount must be greater than zero.");
        require(rate > 0, "Interest rate must be greater than zero.");
        require(loanBalances[msg.sender] >= amount, "Insufficient funds.");
        loanBalances[msg.sender] -= amount;
        loanAmounts[msg.sender] += amount;
        loanTimes[msg.sender] = block.timestamp;
        loanRates[msg.sender] = rate;
    }

    function repay() public {
        uint256 amountOwed = (block.timestamp - loanTimes[msg.sender]) * loanAmounts[msg.sender] * loanRates[msg.sender] / 31536000; // 1 year in seconds
        require(amountOwed > 0, "No loan to repay.");
        require(loanBalances[msg.sender] >= amountOwed, "Insufficient funds.");
        loanBalances[msg.sender] -= amountOwed;
        loanAmounts[msg.sender] = 0;
        loanTimes[msg.sender] = 0;
        loanRates[msg.sender] = 0;
    }

    function deposit() public payable {
        loanBalances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(loanBalances[msg.sender] >= amount, "Insufficient funds.");
        loanBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getBalance() public view returns (uint256) {
         return loanBalances[msg.sender];
    }
}