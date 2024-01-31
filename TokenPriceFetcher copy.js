import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { networkConfig } from "../networkConfig";

let globalEthValue;

const TokenPriceFetcher = ({
  tokenAddress,
  network,
  tokenName,
  tokenDecimals,
}) => {
  const [price, setPrice] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState("0.00");
  const [routerAddress, setRouterAddress] = useState("");
  const [rpcUrl, setRpcUrl] = useState("");
  const [lastFails, setLastFails] = useState(0);
  // const [ethValue, setEthValue] = useState(null);

  const fetchEthValue = async () => {
    try {
      const { rpcUrls, uniswapRouter, wethAddress, usdtAddress } =
        networkConfig[network];
      setRouterAddress(uniswapRouter);
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
      setRpcUrl(rpcUrl);
      console.log("chosen rpc", rpcUrl);
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(
        uniswapRouter,
        [
          "function getAmountsOut(uint amountIn, address[] path) external view returns (uint[])",
        ],
        provider
      );

      const oneTokenInSmallestUnit = ethers.utils.parseUnits(
        "1.0",
        tokenDecimals
      );
      // console.log("tokenAddress", tokenAddress);
      // console.log("oneTokenInSmallestUnit", parseFloat(oneTokenInSmallestUnit));

      const amountOut = await contract.getAmountsOut(oneTokenInSmallestUnit, [
        tokenAddress,
        wethAddress,
      ]);

      console.log("amountOut", parseInt(amountOut[1]));

      const ethAmount = ethers.utils.formatUnits(amountOut[1], "24");

      // console.log("ethAmount", ethAmount);
      // console.log("ethValue", parseFloat(globalEthValue));

      const tokenPriceInUsd = ethAmount * globalEthValue;

      setPrice(tokenPriceInUsd);
      setLastFails(0);
      setLastFetchTime(Date.now());
    } catch (error) {
      setLastFails(lastFails + 1);
      console.error("Error fetching token price:", error);
    }
    console.log("setting timer");
    setTimeout(fetchPrice, 1000 + Math.random() * 5000);
  };
  // useEffect(() => {
  //   fetchPrice();
  // }, [tokenAddress, network, tokenDecimals]);

  useEffect(() => {
    fetchEthValue();
    const interval = setInterval(fetchEthValue, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateElapsedTime = () => {
    const now = Date.now();
    const elapsed = now - lastFetchTime;
    setElapsedTime((elapsed / 1000).toFixed(2));
  };

  useEffect(() => {
    const timer = setInterval(updateElapsedTime, 200);
    return () => clearInterval(timer);
  }, [lastFetchTime]);

  useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <>
      <td>
        &nbsp;{price ? `$${price.toFixed(6)}` : "Fetching price..."}&nbsp;
      </td>
      <td>&nbsp;{elapsedTime} seconds&nbsp;</td>
      <td>&nbsp;{routerAddress}&nbsp;</td>
      <td>&nbsp;{rpcUrl}&nbsp;</td>
      <td>&nbsp;{lastFails}&nbsp;</td>
    </>
  );
};

export default TokenPriceFetcher;
