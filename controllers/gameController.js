const Bet = require("../models/Bet");
const Round = require("../models/Round");
const Player = require("../models/Player");
const Transaction = require("../models/Transaction");
const {
  convertUsdToCrypto,
  fetchCryptoPrices,
} = require("../services/cryptoPriceService");
const {
  getCurrentRound,
  getCurrentMultiplier,
} = require("../services/gameEngine");

// Place Bet
exports.placeBet = async (req, res) => {
  const { playerId, usdAmount, currency } = req.body;

  try {
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ error: "Player not found" });

    const round = getCurrentRound();
    if (!round || round.ended)
      return res.status(400).json({ error: "No active round" });

    const cryptoAmount = await convertUsdToCrypto(usdAmount, currency);
    if (player.wallet[currency] < cryptoAmount)
      return res.status(400).json({ error: "Insufficient funds" });

    // Deduct from wallet
    player.wallet[currency] -= cryptoAmount;
    await player.save();

    // Save bet
    await Bet.create({
      playerId,
      roundId: round.roundId,
      usdAmount,
      cryptoAmount,
      currency,
    });

    // Log transaction
    await Transaction.create({
      playerId,
      usdAmount,
      cryptoAmount,
      currency,
      transactionType: "bet",
      transactionHash: Math.random().toString(36).substr(2, 12),
      priceAtTime: (await fetchCryptoPrices())[currency],
      roundId: round.roundId,
    });

    res.json({ success: true, cryptoAmount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cash Out
exports.cashOut = async (req, res) => {
  const { playerId } = req.body;

  try {
    const round = getCurrentRound();
    const multiplier = getCurrentMultiplier();

    const bet = await Bet.findOne({
      playerId,
      roundId: round.roundId,
      multiplierAtCashout: null,
    });
    if (!bet) return res.status(404).json({ error: "Active bet not found" });

    if (multiplier >= round.crashPoint)
      return res.status(400).json({ error: "Too late! Round crashed" });

    const payout = +(bet.cryptoAmount * multiplier).toFixed(8);
    bet.multiplierAtCashout = multiplier;
    bet.won = true;
    await bet.save();

    // Credit wallet
    const player = await Player.findById(playerId);
    player.wallet[bet.currency] += payout;
    await player.save();

    // Log transaction
    await Transaction.create({
      playerId,
      usdAmount: +(payout * (await fetchCryptoPrices())[bet.currency]).toFixed(
        2
      ),
      cryptoAmount: payout,
      currency: bet.currency,
      transactionType: "cashout",
      transactionHash: Math.random().toString(36).substr(2, 12),
      priceAtTime: (await fetchCryptoPrices())[bet.currency],
      roundId: round.roundId,
    });

    res.json({ success: true, payout, multiplier });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
