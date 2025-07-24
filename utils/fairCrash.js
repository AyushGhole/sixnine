// utils/fairCrash.js
const crypto = require("crypto");

/**
 * Generates a provably fair crash multiplier and hash.
 * @param {string} serverSeed - Secret server seed (can be random each round).
 * @param {string} roundId - Acts as client seed to vary per round.
 * @returns {{ crashPoint: number, hash: string, seed: string }}
 */
function generateCrashPoint(serverSeed, roundId) {
  const hmac = crypto
    .createHmac("sha256", serverSeed)
    .update(roundId)
    .digest("hex");

  const hexSlice = hmac.slice(0, 13); // Take first 52 bits
  const randInt = parseInt(hexSlice, 16);
  const e = 2 ** 52;
  const crash = Math.floor((100 * e - randInt) / (e - randInt)) / 100;

  return {
    crashPoint: Math.max(crash, 1.01), // Ensure minimum crash point
    hash: hmac,
    seed: serverSeed,
  };
}

module.exports = { generateCrashPoint };
