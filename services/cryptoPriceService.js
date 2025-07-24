// services/cryptoPriceService.js
const axios = require("axios");

let cachedPrices = null;
let lastFetched = 0;
const CACHE_DURATION = 10000; // 10 seconds

async function fetchCryptoPrices() {
  const now = Date.now();

  if (cachedPrices && now - lastFetched < CACHE_DURATION) {
    return cachedPrices;
  }

  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,ethereum",
          vs_currencies: "usd",
        },
      }
    );

    const prices = {
      BTC: res.data.bitcoin.usd,
      ETH: res.data.ethereum.usd,
    };

    cachedPrices = prices;
    lastFetched = now;

    return prices;
  } catch (error) {
    console.error("Failed to fetch crypto prices:", error.message);
    if (cachedPrices) return cachedPrices; // fallback
    throw new Error("No crypto price data available");
  }
}

async function convertUsdToCrypto(usdAmount, currency) {
  const prices = await fetchCryptoPrices();
  const price = prices[currency];

  if (!price) throw new Error("Invalid currency");
  return +(usdAmount / price).toFixed(8); // e.g., 0.00013245 BTC
}

async function convertCryptoToUsd(cryptoAmount, currency) {
  const prices = await fetchCryptoPrices();
  const price = prices[currency];

  if (!price) throw new Error("Invalid currency");
  return +(cryptoAmount * price).toFixed(2);
}

module.exports = {
  fetchCryptoPrices,
  convertUsdToCrypto,
  convertCryptoToUsd,
};
