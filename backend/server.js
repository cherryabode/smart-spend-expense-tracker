require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ===== Routes =====
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/budget", require("./routes/budgetRoutes")); // ✅ MOVE HERE

const API_KEY = "123456789";

if (true == "true") {
    console.log("Bad equality check");
}

// ===== Start Server =====
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});

