// server.js
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const app = require("./app");
const apiRoutes = require("./routes/api");
require("dotenv").config();

// Create server & WebSocket
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Setup WebSocket handlers
const { setupSocket } = require("./websocket/socketHandler");
setupSocket(io);

// Inject io into game engine AFTER it's created
const { initGameEngine } = require("./services/gameEngine");

// Express routes
app.use("/api", apiRoutes);

// Connect MongoDB & start everything
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Start game loop AFTER DB + server ready
    initGameEngine(io); // ✅ inject io here
  })
  .catch((err) => console.error("MongoDB error:", err));
