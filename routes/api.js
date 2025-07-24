const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");
const gameController = require("../controllers/gameController");

// Wallet
router.get("/wallet/:playerId", walletController.getBalance);

// Game
router.post("/bet", gameController.placeBet);
router.post("/cashout", gameController.cashOut);

module.exports = router;
