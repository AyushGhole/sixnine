// services/gameRoundService.js
const { generateCrashPoint } = require("../utils/fairCrash");
const Round = require("../models/Round");
const crypto = require("crypto");

async function createNewRound() {
  const serverSeed = crypto.randomBytes(16).toString("hex");
  const roundId = Date.now().toString(); // simple unique ID
  const { crashPoint, hash, seed } = generateCrashPoint(serverSeed, roundId);

  const round = await Round.create({
    roundId,
    startTime: new Date(),
    crashPoint,
    seed,
    hash,
    ended: false,
  });

  return round;
}

module.exports = { createNewRound };
