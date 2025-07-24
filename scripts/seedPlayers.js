// scripts/seedPlayers.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Player = require("../models/Player");

dotenv.config();

const samplePlayers = [
  {
    username: "satoshi",
    wallet: { BTC: 0.01, ETH: 0.2 },
  },
  {
    username: "vitalik",
    wallet: { BTC: 0.005, ETH: 0.5 },
  },
  {
    username: "ayush",
    wallet: { BTC: 0.002, ETH: 0.15 },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Player.deleteMany();
    const players = await Player.insertMany(samplePlayers);
    console.log(
      "✅ Players seeded:",
      players.map((p) => p.username)
    );
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
