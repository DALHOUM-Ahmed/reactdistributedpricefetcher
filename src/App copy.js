import React, { useState } from "react";
import TokenPriceFetcher from "./components/TokenPriceFetcher";
const defaultTokens = [
  {
    tokenAddress: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    network: "ethereum",
    tokenName: "AAVE",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
    network: "ethereum",
    tokenName: "BAT",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
    network: "ethereum",
    tokenName: "COMP",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    network: "ethereum",
    tokenName: "LINK",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    network: "ethereum",
    tokenName: "SHIB",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x967da4048cD07aB37855c090aAF366e4ce1b9F48",
    network: "ethereum",
    tokenName: "OCEAN",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x4575f41308EC1483f3d399aa9a2826d74Da13Deb",
    network: "ethereum",
    tokenName: "OXT",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x408e41876cCCDC0F92210600ef50372656052a38",
    network: "ethereum",
    tokenName: "REN",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x0000000000085d4780B73119b644AE5ecd22b376",
    network: "ethereum",
    tokenName: "TUSD",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
    network: "ethereum",
    tokenName: "REP",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x221657776846890989a759BA2973e427DfF5C9bB",
    network: "ethereum",
    tokenName: "REPv2",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x0000000000095413afC295d19EDeb1Ad7B71c952",
    network: "ethereum",
    tokenName: "LON",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x4fE83213D56308330EC302a8BD641f1d0113A4Cc",
    network: "ethereum",
    tokenName: "NU",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    network: "ethereum",
    tokenName: "UNI",
    tokenDecimals: "18",
  },
  {
    tokenAddress: "0x0000000000085d4780B73119b644AE5ecd22b376",
    network: "ethereum",
    tokenName: "YFI",
    tokenDecimals: "18",
  },
];

const App = () => {
  const [tokens, setTokens] = useState(defaultTokens);

  const handleTokenChange = (index, field, value) => {
    const newTokens = [...tokens];
    newTokens[index][field] = value;
    setTokens(newTokens);
  };

  const addToken = () => {
    setTokens([
      ...tokens,
      { tokenAddress: "", network: "", tokenName: "", tokenDecimals: "" },
    ]);
  };

  const removeToken = (index) => {
    const newTokens = tokens.filter((_, i) => i !== index);
    setTokens(newTokens);
  };

  return (
    <div>
      <h2>Token Price Fetcher</h2>
      <button onClick={addToken}>Add Token</button>
      <table>
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Token Address</th>
            <th>Network</th>
            <th>Token decimals</th>
            <th>Price</th>
            <th>Last fetched</th>
            <th>Router address</th>
            <th>Fetched RPC</th>
            <th>Last Fails</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr
              key={`${token.tokenAddress}-${token.network}-${token.tokenDecimals}-${index}`}
            >
              <td>
                <input
                  type="text"
                  value={token.tokenName}
                  onChange={(e) =>
                    handleTokenChange(index, "tokenName", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={token.tokenAddress}
                  onChange={(e) =>
                    handleTokenChange(index, "tokenAddress", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={token.network}
                  onChange={(e) =>
                    handleTokenChange(index, "network", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={token.tokenDecimals}
                  onChange={(e) =>
                    handleTokenChange(index, "tokenDecimals", e.target.value)
                  }
                />
              </td>
              <TokenPriceFetcher
                tokenAddress={token.tokenAddress}
                network={token.network}
                tokenName={token.tokenName}
                tokenDecimals={token.tokenDecimals}
              />
              <td>
                <button onClick={() => removeToken(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
