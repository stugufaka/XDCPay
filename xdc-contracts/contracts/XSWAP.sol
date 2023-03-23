pragma solidity ^0.8.0;

contract XSWAP {
    mapping(uint => mapping(uint => uint256)) exchangeRates;
    
    // function safeDiv(uint256 numerator, uint256 denominator) public pure returns (uint256) {
    //     if (denominator == 0) {
    //         return 0;
    //     }
    //     uint256 result = numerator * (10 ** 18) / denominator;
    //     return result / (10 ** 18);
    // }

    function safeDiv(uint256 numerator, uint256 denominator) internal pure returns (uint256) {
    if (denominator == 0) {
        return 0;
    }
    return numerator * (10 ** 18) / denominator;
}


    constructor() {
        // Initialize exchange rates
        //1 = xdc
        //2 = eth
        //3 = bsc
        //4 = usdt

        exchangeRates[1][1] = 1;  //XDC TO XDC
        exchangeRates[1][2] = safeDiv(199,10000000); //XDC TO ETH
        exchangeRates[1][3] = safeDiv(9459,100000000); //XDC TO BSC
        exchangeRates[1][4] = safeDiv(9,250); // XDC TO USDT
        exchangeRates[2][1] = 52639; //ETH T0 XDC
        exchangeRates[2][3] = safeDiv(107,20); // ETH TO BSC
        exchangeRates[2][4] = safeDiv(90029,50); // ETH TO USDT
        exchangeRates[3][1] = safeDiv(1910334,200); // BSC TO XDC
        exchangeRates[3][2] = safeDiv(19,100); //BSC TO ETH
        exchangeRates[3][4] = safeDiv(33590,100); //BSC TO USDT
        exchangeRates[4][1] = safeDiv(2832,100); // USDT TO XDC
        exchangeRates[4][2] = safeDiv(11,20000); // USDT TO ETH
        exchangeRates[4][3] = safeDiv(30,10000); // USDT TO BSC

    }

    function getXswapRate(uint fromToken, uint toToken, uint amount) public view returns (uint) {
        uint rate = exchangeRates[fromToken][toToken];
        require(rate > 0, "Unsupported token pair");
        return amount * rate;
    }
}
