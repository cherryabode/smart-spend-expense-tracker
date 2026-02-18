const db = require("../config/db");

exports.setBudget = (userId, amount, callback) => {
    const sql = `
        INSERT INTO budgets (user_id, monthly_limit)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE monthly_limit = ?
    `;

    db.query(sql, [userId, amount, amount], callback);
};

exports.getBudget = (userId, callback) => {
    db.query(
        "SELECT monthly_limit FROM budgets WHERE user_id = ?",
        [userId],
        callback
    );
};
