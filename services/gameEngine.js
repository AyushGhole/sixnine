// services/gameEngine.js

const { generateCrashPoint } = require("../utils/fairCrash");
const Round = require("../models/Round");
const Bet = require("../models/Bet");

const TICK_INTERVAL = 100; // 100ms
const ROUND_INTERVAL = 10000; // 10s between rounds

let ioGlobal = null; // Store injected io instance
let currentRound = null;
let multiplier = 1;
let multiplierTimer = null;

function initGameEngine(io) {
  ioGlobal = io;
  startGameLoop();
}

function startGameLoop() {
  setInterval(() => {
    launchNewRound();
  }, ROUND_INTERVAL);
}

async function launchNewRound() {
  const roundId = Date.now().toString();
  const { crashPoint, seed, hash } = generateCrashPoint(seedGen(), roundId);

  currentRound = await Round.create({
    roundId,
    crashPoint,
    seed,
    hash,
    startTime: new Date(),
    ended: false,
  });

  multiplier = 1;
  console.log(`🎮 New Round Started: ${roundId} | Crash at ${crashPoint}x`);

  // Emit round start
  if (ioGlobal) {
    ioGlobal.emit("roundStart", {
      roundId,
      hash,
      startTime: currentRound.startTime,
    });
  }

  multiplierTimer = setInterval(async () => {
    multiplier = +(multiplier + 0.01).toFixed(2);

    if (ioGlobal) {
      ioGlobal.emit("multiplierUpdate", { multiplier });
    }

    if (multiplier >= crashPoint) {
      clearInterval(multiplierTimer);

      await Round.findByIdAndUpdate(currentRound._id, { ended: true });

      console.log(`💥 Round Crashed at ${multiplier}x`);

      if (ioGlobal) {
        ioGlobal.emit("roundCrash", {
          roundId,
          crashPoint,
          seed,
        });
      }
    }
  }, TICK_INTERVAL);
}

// Helper for seed
function seedGen() {
  return require("crypto").randomBytes(16).toString("hex");
}

module.exports = {
  initGameEngine, // Inject io from server.js
  getCurrentRound: () => currentRound,
  getCurrentMultiplier: () => multiplier,
};
