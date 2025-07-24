// websocket/socketHandler.js
const Bet = require("../models/Bet");
const Player = require("../models/Player");
const Transaction = require("../models/Transaction");
const {
  getCurrentRound,
  getCurrentMultiplier,
} = require("../services/gameEngine");
const { fetchCryptoPrices } = require("../services/cryptoPriceService");

async function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    // 🔁 Cashout Event
    socket.on("cashout", async ({ playerId }) => {
      try {
        const round = getCurrentRound();
        const multiplier = getCurrentMultiplier();

        const bet = await Bet.findOne({
          playerId,
          roundId: round.roundId,
          multiplierAtCashout: null,
        });
        if (!bet) return socket.emit("error", "No active bet found");

        if (multiplier >= round.crashPoint)
          return socket.emit("error", "Too late, round already crashed");

        const payout = +(bet.cryptoAmount * multiplier).toFixed(8);
        bet.multiplierAtCashout = multiplier;
        bet.won = true;
        await bet.save();

        const player = await Player.findById(playerId);
        player.wallet[bet.currency] += payout;
        await player.save();

        const usd = +(
          payout * (await fetchCryptoPrices())[bet.currency]
        ).toFixed(2);

        await Transaction.create({
          playerId,
          usdAmount: usd,
          cryptoAmount: payout,
          currency: bet.currency,
          transactionType: "cashout",
          transactionHash: Math.random().toString(36).substring(2),
          priceAtTime: (await fetchCryptoPrices())[bet.currency],
          roundId: round.roundId,
        });

        // ✅ Notify sender
        socket.emit("cashoutSuccess", {
          multiplier,
          payout,
          currency: bet.currency,
          usd,
        });

        // 🌐 Notify all
        io.emit("playerCashout", {
          playerId,
          multiplier,
          payout,
          usd,
        });
      } catch (err) {
        console.error("Cashout error:", err.message);
        socket.emit("error", "Cashout failed");
      }
    });

    // Clean up on disconnect
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket };
