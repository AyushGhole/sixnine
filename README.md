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


<h2>TECH STACK: </h2>
<span><img src="https://camo.githubusercontent.com/94d83dc5838e2784bee25fe9e019bc2fda128676f32cef2f06baa0f6f3849b8c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769742d2532334630353033332e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974266c6f676f436f6c6f723d7768697465"></span>
<span><img src="https://camo.githubusercontent.com/7e282220b8ec0dd29cf99be1c0f5e82d74a42bc84ed834ee6afd86b4bad3bfee/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465" ></span>
<span><img src="https://camo.githubusercontent.com/ec9b2bbaccf6915a29050ce24c10cd9b481b0c41b0bf5194add3e69f49a9be3c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d2532333465613934622e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465"></span>
<span><img src="https://camo.githubusercontent.com/e3aef779877ecfad97fc1e213d3c449a685e6766c0c7fdca210802d4a1f59302/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f536f636b65742e696f2d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f3d736f636b65742e696f266261646765436f6c6f723d303130313031"></span>
<span><img src="https://img.shields.io/badge/RESTFULL_API--eeff6e?style=flat-square"" height="30px" width="120px" ></span>
