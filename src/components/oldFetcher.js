import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { networkConfig } from "../networkConfig";

let globalEthValue;

const TokenPriceFetcher = ({ tokenAddress, network, tokenName }) => {
  const [price, setPrice] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());
  // const [ethValue, setEthValue] = useState(null);

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
      globalEthValue = amountOut[1];
    } catch (error) {
      console.error("Error fetching ETH value:", error);
    }
  };

  const fetchPrice = async () => {
    try {
      if (!globalEthValue) {
        throw "no ethValue";
      }
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
      console.log("ethValue", globalEthValue);

      const tokenPriceInUsd = ethAmount * globalEthValue;

      setPrice(tokenPriceInUsd);
      setLastFetchTime(Date.now());
    } catch (error) {
      console.error("Error fetching token price:", error);
    }
    console.log("setting timer");
    setTimeout(fetchPrice, 1000 + Math.random() * 5000);
  };
  const timeElapsed = () => {
    const now = Date.now();
    const elapsed = now - lastFetchTime;
    return (elapsed / 1000).toFixed(2); // Time in seconds
  };

  useEffect(() => {
    fetchEthValue();
    const interval = setInterval(fetchEthValue, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <div>
      {price ? (
        <p>
          Price of {tokenName} ({network}): ${price}
          <br />
          Time elapsed since last fetch: {timeElapsed()} seconds
        </p>
      ) : (
        <p>Fetching price...</p>
      )}
    </div>
  );
};

export default TokenPriceFetcher;
