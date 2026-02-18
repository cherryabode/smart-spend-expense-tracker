# Smart Spend

Smart Spend is a full-stack Expense Tracker web application that allows users to manage expenses, monitor spending trends, and track a monthly budget with visual insights.

---

## Features

### Authentication
- User Registration & Login  
- Password hashing using **bcrypt**  
- JWT-based authentication  
- Protected API routes  

### Expense Management
- Add new expenses  
- Delete expenses  
- View total expenses  
- Monthly expense calculation  

### Analytics Dashboard
- Category-wise expense distribution (Chart.js)
- Monthly spending trend graph
- Dynamic UI updates  

### Budget Tracking
- Set monthly budget  
- Visual budget progress bar  
- Alert when budget is exceeded  

---

## Tech Stack

### Backend
- Node.js  
- Express.js  
- MySQL  
- JWT (jsonwebtoken)  

### Frontend
- HTML  
- Tailwind CSS  
- Chart.js  
- Vanilla JavaScript  

---

## 📂 Project Structure
expense_tracker/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── css/
│ ├── js/
│ ├── dashboard.html
│ └── index.html
│
├── .gitignore
└── README.md


---

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/anandita-n/smart-spend-expense-tracker.git
cd smart-spend-expense-tracker

### Backend setup
cd backend
npm install


