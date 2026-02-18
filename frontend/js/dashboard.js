const API = "http://localhost:5000/api/expenses";
const BUDGET_API = "http://localhost:5000/api/budget";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

// ===== Currency Formatter =====
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(amount);
}

let categoryChart = null;
let monthlyChart = null;
let budgetAlertShown = false; // prevent repeated alerts

// ===============================
// LOAD BUDGET
// ===============================
async function loadBudget() {
    try {
        const res = await fetch(BUDGET_API, {
            headers: { "Authorization": token }
        });

        if (!res.ok) return 0;

        const data = await res.json();

        const budget = parseFloat(data?.monthly_limit || 0);

        document.getElementById("budgetAmount").innerText =
            formatCurrency(budget);

        return budget;

    } catch (err) {
        console.error("Budget load error:", err);
        return 0;
    }
}


// ===============================
// UPDATE BUDGET PROGRESS
// ===============================
function updateBudgetProgress(monthlyTotal, budget) {

    const progressBar = document.getElementById("budgetProgress");

    if (!progressBar) return;

    if (budget > 0) {

        const percentage = Math.min((monthlyTotal / budget) * 100, 100);

        progressBar.style.width = percentage + "%";

        if (monthlyTotal > budget) {

            progressBar.classList.remove("bg-red-500");
            progressBar.classList.add("bg-red-700");

            if (!budgetAlertShown) {
                alert("⚠ You have exceeded your monthly budget!");
                budgetAlertShown = true;
            }

        } else {
            progressBar.classList.remove("bg-red-700");
            progressBar.classList.add("bg-red-500");
            budgetAlertShown = false;
        }
    } else {
        progressBar.style.width = "0%";
    }
}


// ===============================
// LOAD EXPENSES
// ===============================
async function loadExpenses() {

    try {
        const res = await fetch(API, {
            headers: { "Authorization": token }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch expenses");
        }

        const expenses = await res.json();

        let total = 0;
        let monthlyTotal = 0;

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const list = document.getElementById("expenseList");
        list.innerHTML = "";

        expenses.forEach(e => {

            const amount = parseFloat(e.amount);
            total += amount;

            const expenseDate = new Date(e.date);

            if (
                expenseDate.getMonth() === currentMonth &&
                expenseDate.getFullYear() === currentYear
            ) {
                monthlyTotal += amount;
            }

            list.innerHTML += `
                <div class="flex justify-between items-center border-b py-2">
                    <div>
                        <p class="font-semibold">${formatCurrency(amount)}</p>
                        <p class="text-sm text-gray-500">${e.category}</p>
                    </div>
                    <button 
                        onclick="deleteExpense(${e.id})"
                        class="text-red-500 hover:text-red-700 text-sm">
                        Delete
                    </button>
                </div>
            `;
        });

        document.getElementById("totalAmount").innerText = formatCurrency(total);
        document.getElementById("monthlyTotal").innerText = formatCurrency(monthlyTotal);
        document.getElementById("transactionCount").innerText = expenses.length;

        const budget = await loadBudget();
        updateBudgetProgress(monthlyTotal, budget);

        renderCategoryChart(expenses);
        renderMonthlyChart(expenses);

    } catch (err) {
        console.error("Expense load error:", err);
    }
}


// ===============================
// ADD EXPENSE
// ===============================
async function addExpense() {

    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    if (!amount || !category || !date) {
        alert("Please fill required fields");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ amount, category, description, date })
    });

    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";

    loadExpenses();
}


// ===============================
// SET BUDGET
// ===============================
async function setBudget() {

    const amount = parseFloat(document.getElementById("budgetInput").value);

    if (!amount || amount <= 0) {
        alert("Budget must be a positive number");
        return;
    }

    await fetch(BUDGET_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ amount })
    });

    loadExpenses();
}



// ===============================
// DELETE EXPENSE
// ===============================
async function deleteExpense(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
    });

    loadExpenses();
}


// ===============================
// CATEGORY CHART
// ===============================
function renderCategoryChart(expenses) {

    const categories = {};

    expenses.forEach(e => {
        categories[e.category] =
            (categories[e.category] || 0) + parseFloat(e.amount);
    });

    const ctx = document.getElementById("expenseChart").getContext("2d");

    if (categoryChart) categoryChart.destroy();

    categoryChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#14b8a6"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" } }
        }
    });
}


// ===============================
// MONTHLY CHART
// ===============================
function renderMonthlyChart(expenses) {

    const monthlyTotals = {};

    expenses.forEach(e => {
        const date = new Date(e.date);
        const key = date.getFullYear() + "-" + (date.getMonth() + 1);

        monthlyTotals[key] =
            (monthlyTotals[key] || 0) + parseFloat(e.amount);
    });

    const labels = Object.keys(monthlyTotals);
    const data = Object.values(monthlyTotals);

    const ctx = document.getElementById("monthlyChart").getContext("2d");

    if (monthlyChart) monthlyChart.destroy();

    monthlyChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Monthly Expenses",
                data: data,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.1)",
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}


// ===============================
// LOGOUT
// ===============================
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}


// ===============================
// INITIAL LOAD
// ===============================
document.addEventListener("DOMContentLoaded", loadExpenses);
