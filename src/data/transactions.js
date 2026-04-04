// Mock transaction data for the Finance Dashboard
// Each transaction has: id, date, description, amount, type (income/expense), and category

const transactions = [
  // ── January 2026 ──────────────────────────────────────────
  { id: 1,  date: "2026-01-02", description: "Monthly Salary",            amount: 5200, type: "income",  category: "Salary" },
  { id: 2,  date: "2026-01-03", description: "Grocery Store",             amount: 87,   type: "expense", category: "Food" },
  { id: 3,  date: "2026-01-05", description: "Electric Bill",             amount: 142,  type: "expense", category: "Bills" },
  { id: 4,  date: "2026-01-07", description: "Bus Pass",                  amount: 65,   type: "expense", category: "Transport" },
  { id: 5,  date: "2026-01-10", description: "Freelance Web Project",     amount: 800,  type: "income",  category: "Freelance" },
  { id: 6,  date: "2026-01-12", description: "Online Shopping - Clothes", amount: 120,  type: "expense", category: "Shopping" },
  { id: 7,  date: "2026-01-15", description: "Rent Payment",              amount: 1400, type: "expense", category: "Housing" },
  { id: 8,  date: "2026-01-18", description: "Movie Tickets",             amount: 35,   type: "expense", category: "Entertainment" },
  { id: 9,  date: "2026-01-22", description: "Doctor Visit",              amount: 90,   type: "expense", category: "Health" },
  { id: 10, date: "2026-01-25", description: "Restaurant Dinner",         amount: 55,   type: "expense", category: "Food" },
  { id: 11, date: "2026-01-28", description: "Internet Bill",             amount: 60,   type: "expense", category: "Bills" },

  // ── February 2026 ─────────────────────────────────────────
  { id: 12, date: "2026-02-01", description: "Monthly Salary",            amount: 5200, type: "income",  category: "Salary" },
  { id: 13, date: "2026-02-03", description: "Grocery Store",             amount: 95,   type: "expense", category: "Food" },
  { id: 14, date: "2026-02-05", description: "Gas Bill",                  amount: 78,   type: "expense", category: "Bills" },
  { id: 15, date: "2026-02-08", description: "Uber Rides",                amount: 42,   type: "expense", category: "Transport" },
  { id: 16, date: "2026-02-10", description: "Freelance Logo Design",     amount: 450,  type: "income",  category: "Freelance" },
  { id: 17, date: "2026-02-12", description: "New Headphones",            amount: 199,  type: "expense", category: "Shopping" },
  { id: 18, date: "2026-02-15", description: "Rent Payment",              amount: 1400, type: "expense", category: "Housing" },
  { id: 19, date: "2026-02-17", description: "Concert Tickets",           amount: 75,   type: "expense", category: "Entertainment" },
  { id: 20, date: "2026-02-20", description: "Pharmacy",                  amount: 32,   type: "expense", category: "Health" },
  { id: 21, date: "2026-02-23", description: "Takeout Food",              amount: 28,   type: "expense", category: "Food" },
  { id: 22, date: "2026-02-26", description: "Phone Bill",                amount: 45,   type: "expense", category: "Bills" },

  // ── March 2026 ────────────────────────────────────────────
  { id: 23, date: "2026-03-01", description: "Monthly Salary",            amount: 5200, type: "income",  category: "Salary" },
  { id: 24, date: "2026-03-04", description: "Grocery Store",             amount: 110,  type: "expense", category: "Food" },
  { id: 25, date: "2026-03-06", description: "Electric Bill",             amount: 135,  type: "expense", category: "Bills" },
  { id: 26, date: "2026-03-08", description: "Train Tickets",             amount: 88,   type: "expense", category: "Transport" },
  { id: 27, date: "2026-03-11", description: "Freelance App Feature",     amount: 1200, type: "income",  category: "Freelance" },
  { id: 28, date: "2026-03-13", description: "Amazon Order",              amount: 67,   type: "expense", category: "Shopping" },
  { id: 29, date: "2026-03-15", description: "Rent Payment",              amount: 1400, type: "expense", category: "Housing" },
  { id: 30, date: "2026-03-18", description: "Streaming Subscription",    amount: 15,   type: "expense", category: "Entertainment" },
  { id: 31, date: "2026-03-20", description: "Gym Membership",            amount: 50,   type: "expense", category: "Health" },
  { id: 32, date: "2026-03-24", description: "Coffee & Snacks",           amount: 18,   type: "expense", category: "Food" },
  { id: 33, date: "2026-03-27", description: "Water Bill",                amount: 38,   type: "expense", category: "Bills" },

  // ── April 2026 ────────────────────────────────────────────
  { id: 34, date: "2026-04-01", description: "Monthly Salary",            amount: 5400, type: "income",  category: "Salary" },
  { id: 35, date: "2026-04-02", description: "Grocery Store",             amount: 102,  type: "expense", category: "Food" },
  { id: 36, date: "2026-04-04", description: "Electric Bill",             amount: 128,  type: "expense", category: "Bills" },
];

export default transactions;
