const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/monthly", require("./routes/monthlyRoutes"));

app.get("/api", (req, res) => {
  res.json({ status: "API running" });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});