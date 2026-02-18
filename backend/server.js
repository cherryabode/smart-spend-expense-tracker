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

// ===== Start Server =====
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});

