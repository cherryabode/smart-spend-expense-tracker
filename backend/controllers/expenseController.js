const Expense = require("../models/expenseModel");

exports.addExpense = (req, res) => {
  const { amount, category, description, date } = req.body;

  Expense.addExpense(
    [req.user.id, amount, category, description, date],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to add expense" });
      res.json({ message: "Expense added successfully" });
    }
  );
};

exports.getExpenses = (req, res) => {
  Expense.getExpensesByUser(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch expenses" });
    res.json(results);
  });
};

exports.updateExpense = (req, res) => {
  const { amount, category, description, date } = req.body;

  Expense.updateExpense(
    req.params.id,
    [amount, category, description, date],
    (err) => {
      if (err) return res.status(500).json({ error: "Update failed" });
      res.json({ message: "Expense updated successfully" });
    }
  );
};

exports.deleteExpense = (req, res) => {
  Expense.deleteExpense(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ message: "Expense deleted successfully" });
  });
};
