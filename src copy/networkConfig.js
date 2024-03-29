export const networkConfig = {
  ethereum: {
    rpcUrls: [
      "https://ethereum.publicnode.com",
      "https://eth.llamarpc.com",
      "https://rpc.lokibuilder.xyz/wallet",
    ],
    uniswapRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    wethAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    usdtAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    wethDecimals: "18",
  },
  polygon: {
    rpcUrls: ["https://polugon_rpc1", "https://polugon_rpc2"],
    uniswapRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    wethAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    usdtAddress: "0x...PolygonUSDTAddress",
    wethDecimals: "18",
  },
  bsc: {
    rpcUrls: [
      "https://bsc-dataseed2.bnbchain.org",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed.bnbchain.org",
    ],
    uniswapRouter: "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F",
    wethAddress: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
    usdtAddress: "0x55d398326f99059fF775485246999027B3197955",
    wethDecimals: "18",
  },
  optimism: {
    rpcUrls: ["https://optimism.publicnode.com"],
    uniswapRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    wethAddress: "0x4200000000000000000000000000000000000006",
    usdtAddress: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    wethDecimals: "18",
  },
  // add other networks as needed
};
