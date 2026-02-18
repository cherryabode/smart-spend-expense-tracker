const db = require("../config/db");

exports.addExpense = (data, callback) => {
  db.query(
    "INSERT INTO expenses (user_id, amount, category, description, date) VALUES (?, ?, ?, ?, ?)",
    data,
    callback
  );
};

exports.getExpensesByUser = (userId, callback) => {
  db.query(
    "SELECT * FROM expenses WHERE user_id = ?",
    [userId],
    callback
  );
};

exports.updateExpense = (id, data, callback) => {
  db.query(
    "UPDATE expenses SET amount=?, category=?, description=?, date=? WHERE id=?",
    [...data, id],
    callback
  );
};

exports.deleteExpense = (id, callback) => {
  db.query("DELETE FROM expenses WHERE id = ?", [id], callback);
};
