const Player = require("../models/Player");
const { fetchCryptoPrices } = require("../services/cryptoPriceService");

exports.getBalance = async (req, res) => {
  try {
    const { playerId } = req.params;

    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ error: "Player not found" });

    const prices = await fetchCryptoPrices();

    const balances = {
      BTC: {
        amount: player.wallet.BTC,
        usd: +(player.wallet.BTC * prices.BTC).toFixed(2),
      },
      ETH: {
        amount: player.wallet.ETH,
        usd: +(player.wallet.ETH * prices.ETH).toFixed(2),
      },
    };

    res.json({ playerId, balances });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
