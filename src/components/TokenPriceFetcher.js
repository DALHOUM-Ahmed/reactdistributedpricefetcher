import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { networkConfig } from "../networkConfig";

const TokenPriceFetcher = ({ tokenAddress, network, tokenName }) => {
  const [price, setPrice] = useState(null);
  const [ethValue, setEthValue] = useState(null);

  const fetchEthValue = async () => {
    try {
      const { rpcUrls, uniswapRouter, wethAddress, usdtAddress } =
        networkConfig[network];
      const rpcUrl = rpcUrls[Math.floor(Math.random() * rpcUrls.length)];
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(
        uniswapRouter,
        [
          "function getAmountsOut(uint amountIn, address[] path) external view returns (uint[])",
        ],
        provider
      );

      const oneEth = ethers.utils.parseUnits("1.0", "18");

      console.log("eth price params", network, oneEth, [
        wethAddress,
        usdtAddress,
      ]);
      const amountOut = await contract.getAmountsOut(oneEth, [
        wethAddress,
        usdtAddress,
      ]);
      setEthValue(amountOut[1]);
    } catch (error) {
      console.error("Error fetching ETH value:", error);
    }
  };

  const fetchPrice = async () => {
    try {
      const { rpcUrls, uniswapRouter, wethAddress } = networkConfig[network];
      const rpcUrl = rpcUrls[Math.floor(Math.random() * rpcUrls.length)];
      console.log("chosen rpc", rpcUrl);
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(
        uniswapRouter,
        [
          "function getAmountsOut(uint amountIn, address[] path) external view returns (uint[])",
        ],
        provider
      );

      // assuming the token has 18 decimal places
      const oneTokenInSmallestUnit = ethers.utils.parseUnits(
        "1.0",
        networkConfig[network].wethDecimals
      );

      // get the amount of ETH for 1 unit of the token
      console.log("price params", network, oneTokenInSmallestUnit, [
        tokenAddress,
        wethAddress,
      ]);
      const amountOut = await contract.getAmountsOut(oneTokenInSmallestUnit, [
        tokenAddress,
        wethAddress,
      ]);
      const ethAmount = ethers.utils.formatUnits(amountOut[1], "24");

      console.log("ethAmount", ethAmount);
      console.log("ethValue", ethValue);

      const tokenPriceInUsd = ethAmount * ethValue;

      setPrice(tokenPriceInUsd);
    } catch (error) {
      console.error("Error fetching token price:", error);
    }
    setTimeout(fetchPrice, 10000 + Math.random() * 5000);
  };

  useEffect(() => {
    fetchEthValue();
    const interval = setInterval(fetchEthValue, 600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (ethValue) {
      fetchPrice();
    }
  }, [ethValue]);

  return (
    <div>
      {price ? (
        <p>
          Price of Token {tokenName} - {network}: {price.toString()}
        </p>
      ) : (
        <p>Fetching price...</p>
      )}
    </div>
  );
};

export default TokenPriceFetcher;
