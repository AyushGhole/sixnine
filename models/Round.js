const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema(
  {
    roundId: { type: String, required: true, unique: true },
    startTime: { type: Date, required: true },
    crashPoint: { type: Number, required: true },
    seed: { type: String, required: true },
    hash: { type: String, required: true },
    ended: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Round", roundSchema);
