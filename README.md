# 🚀 Crypto Crash Game Backend
<br>
A real-time multiplayer backend for a "Crash" betting game where players place USD bets (converted to BTC/ETH), watch a growing multiplier, and try to cash out before the game crashes. Built with Node.js, MongoDB, WebSocket, and CoinGecko API.
<br>
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
<br>
3.POST /api/cashout <br>
{ <br>
  "playerId": "string" <br>
} <br>
RES : 
{ Triggers cashout before crash , Calculates payout using current multiplier, Adds crypto back to wallet } <br>


TECH STACK: <br>
<br>
<span><img src="https://camo.githubusercontent.com/94d83dc5838e2784bee25fe9e019bc2fda128676f32cef2f06baa0f6f3849b8c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769742d2532334630353033332e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974266c6f676f436f6c6f723d7768697465"></span>
<span><img src="https://camo.githubusercontent.com/7e282220b8ec0dd29cf99be1c0f5e82d74a42bc84ed834ee6afd86b4bad3bfee/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465" ></span>
<span><img src="https://camo.githubusercontent.com/ec9b2bbaccf6915a29050ce24c10cd9b481b0c41b0bf5194add3e69f49a9be3c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d2532333465613934622e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465"></span>
<span><img src="https://camo.githubusercontent.com/e3aef779877ecfad97fc1e213d3c449a685e6766c0c7fdca210802d4a1f59302/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f536f636b65742e696f2d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f3d736f636b65742e696f266261646765436f6c6f723d303130313031"></span>
<span><img src="https://img.shields.io/badge/RESTFULL_API--eeff6e?style=flat-square" height="30px" width="120px" ></span>
<span><img src="https://camo.githubusercontent.com/f93e05694a6f01f2f6a37713a454a942442a5ff2b33083891096a6f7e57842f8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642"></span>
<span><img src="https://camo.githubusercontent.com/fd00f5fb76a02f6093a50142c52193fa6353f4a1b5199827c57cbe99d611b532/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e504d2d2532334342333833372e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6e706d266c6f676f436f6c6f723d7768697465"></span>
<span><img src="https://camo.githubusercontent.com/ec9b2bbaccf6915a29050ce24c10cd9b481b0c41b0bf5194add3e69f49a9be3c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d2532333465613934622e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465"></span>
<span><img src="https://img.shields.io/badge/Socket.io.client-e164e3?style=flat-square&logo=tailwindcss&logoColor=white" height="30px" width="160px" ></span> 
<span><img src="https://camo.githubusercontent.com/e01b1cfdcc52e26519db194c2a7b4b93eafe7a614a0dab69cfe967864a8f1119/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f657870726573732e6a732d2532333430346435392e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d253233363144414642"></span>
<span><img src="https://camo.githubusercontent.com/8477a50d7210f0f3bf15fbe5b44809296b75f2101a2927818599d72c8ea72cef/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3644413535463f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465"></span>
<span><img src="https://img.shields.io/badge/-RENDER-f23400?style=flat-square" height="30px" width="80px" ></span>

✅ Step 1: Project Setup <br>
    Initialize Node.js project<br>
    Install dependencies<br>
    Setup folder structure<br>
    
│<br>
├── controllers/<br>
├── models/<br>
├── routes/<br>
├── services/<br>
├── utils/<br>
├── websocket/<br>
│<br>
├── .env<br>
├── app.js <br>
├── server.js <br>
├── package.json<br>

   Create .env<br>
   Create Express app (app.js)<br>

✅ Step 2: MongoDB Models
<br>
   Player.js: username, wallet (BTC/ETH)<br>
   Round.js: roundId, startTime, crashPoint, seed, hash, ended<br>
   Bet.js: playerId, usdAmount, cryptoAmount, roundId, currency, won, multiplierAtCashout<br>
   Transaction.js: playerId, cryptoAmount, usdAmount, type (bet/cashout), hash, roundId, priceAtTime<br>

✅ Step 3: Provably Fair Crash Logic
<br>
    Use crypto to generate seed + HMAC hash<br>
    Derive a multiplier based on the hash<br>
    Ensure it's transparent and verifiable<br>
    Utility in: utils/fairCrash.js<br>

✅ Step 3: Provably Fair Crash Logic
<br>
   Use crypto to generate seed + HMAC hash<br>
   Derive a multiplier based on the hash<br>
   Ensure it's transparent and verifiable<br>
   Utility in: utils/fairCrash.js<br>

✅ Step 4: Crypto Price Service<br>
    Use CoinGecko API (simple/price) to fetch BTC/ETH price<br>
    Cache results for 10 seconds<br>
    Utility in: services/cryptoPriceService.js<br>
    Functions<br>
      convertUsdToCrypto<br>
      convertCryptoToUsd<br>
      fetchCryptoPrices<br>

✅ Step 5: Game Engine & Round Loop
   <br>
   Start a round every 10 seconds<br>
   Generate crash point<br>
   Emit:<br>
   roundStart (send hash)<br>
   multiplierUpdate (every 100ms)<br>
   roundCrash (reveal seed)<br>
   File: services/gameEngine.js<br>
   Export: initGameEngine(io)<br>

✅ Step 6: REST API Endpoints<br>
   GET /api/wallet/:playerId: show wallet<br>
   POST /api/bet: convert USD → crypto, deduct wallet, log transaction<br>
   POST /api/cashout: payout based on current multiplier, update wallet, log<br>
   Controllers:<br>
   walletController.js<br>
   gameController.js<br>
   Routes:<br>
   routes/api.js<br>

✅ Step 7: WebSocket Integration (Socket.IO) <br>
   Broadcast:
   roundStart, multiplierUpdate, roundCrash<br>
   Client can emit:<br>
   cashout { playerId }<br>
   Server emits back:<br>
   cashoutSuccess, playerCashout, error<br>
   Socket handler in:<br>
   websocket/socketHandler.js<br>
✅ Step 8: Seeder + Dev Tools <br>
   scripts/seedPlayers.js to create test players<br>
   public/test-client.html to test WebSocket in browser<br>
   crypto-crash.postman_collection.json for API testing<br>

✅ Step 9: Testing the Application
   Use Postman to hit:<br>
    /api/wallet/:id<br>
    /api/bet<br>
     /api/cashout<br>
   Use WebSocket client to:<br>
    Watch events live<br>
    Cash out in real-time<br>

✅ Step 10: Final Touches<br>
  Add README.md with:<br>
  Project intro<br>
  Setup steps<br>
  Testing methods<br>
  API route docs<br>
  Push to GitHub<br>
  Optionally deploy via Railway / Render (backend only)
