const mongoose = require("mongoose");

const betSchema = new mongoose.Schema(
  {
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    roundId: { type: String, required: true },
    usdAmount: { type: Number, required: true },
    cryptoAmount: { type: Number, required: true },
    currency: { type: String, enum: ["BTC", "ETH"], required: true },
    multiplierAtCashout: { type: Number, default: null }, // null if player didn't cash out
    won: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bet", betSchema);
