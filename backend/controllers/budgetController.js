const Budget = require("../models/budgetModel");

exports.setBudget = (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;

    Budget.setBudget(userId, amount, (err) => {
        if (err) return res.status(500).json({ error: "DB Error" });
        res.json({ message: "Budget updated" });
    });
};

exports.getBudget = (req, res) => {
    const userId = req.user.id;

    Budget.getBudget(userId, (err, results) => {
        if (err) return res.status(500).json({ error: "DB Error" });

        if (results.length === 0)
            return res.json({ monthly_limit: 0 });

        res.json(results[0]);
    });
};
