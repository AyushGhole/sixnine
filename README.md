# 🚀 Crypto Crash Game Backend
<br>
A real-time multiplayer backend for a "Crash" betting game where players place USD bets (converted to BTC/ETH), watch a growing multiplier, and try to cash out before the game crashes. Built with Node.js, MongoDB, WebSocket, and CoinGecko API.
<br>

✅ How to Test the Application
<br>
📦 REST API (via Postman)
<br>
1. Import the included crypto-crash.postman_collection.json<br>
2. Replace {{playerId}} with a valid player _id from your MongoDB<br>
3. Use the following endpoints:<br>

📡 WebSocket (via test-client.html)<br>

1. Open public/test-client.html in browser <br>
2. Enter your player ID &nbsp;
{ "68824be3a5b1f04dd69009d8" , "6877e4d46e2a0ed0aebc52e1" , "68824be3a5b1f04dd69009d7" } 
3.Click “Cash Out” before the round crashes<br>
4.Watch real-time updates:<br>
   roundStart, multiplierUpdate, playerCashout, roundCrash
<br>

🛣️ API Endpoints Overview<br>

1. GET /api/wallet/:playerId <br>
RES: {Returns current wallet balance in BTC/ETH + USD equivalent}
<br>

2.POST /api/bet <br>
{ <br>
  "playerId": "string", <br>
  "usdAmount": 10, <br>
  "currency": "BTC"  // or "ETH" <br>
} <br>
RES: <br>
{ Places a bet using USD (converted to selected crypto) } <br>
{ Deducts crypto from wallet at current price } <br>

3.POST /api/cashout <br>
{ <br>
  "playerId": "string" <br>
} <br>
RES : 
{ Triggers cashout before crash , Calculates payout using current multiplier, Adds crypto back to wallet } <br>

4.



