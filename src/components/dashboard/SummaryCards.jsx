import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import SummaryCard from "../common/SummaryCard";

function SummaryCards({ totalIncome, totalExpenses, balance, savingsRate }) {
  // Format a number as currency: 23650 → "$23,650"
  const formatCurrency = (amount) =>
    "$" + amount.toLocaleString("en-US");

  // Define each card's display configuration
  // Adding a new card? Just add another object to this array.
  const cards = [
    {
      id: "balance",
      title: "Total Balance",
      value: formatCurrency(balance),
      icon: <Wallet size={20} />,
      trend: balance >= 0 ? "Positive" : "Negative",
      trendLabel: "overall",
      trendDirection: balance >= 0 ? "up" : "down",
      accentColor: "bg-indigo-500/20",
      iconColor: "text-indigo-400",
    },
    {
      id: "income",
      title: "Total Income",
      value: formatCurrency(totalIncome),
      icon: <TrendingUp size={20} />,
      trend: `${((totalIncome / (totalIncome + totalExpenses)) * 100).toFixed(0)}%`,
      trendLabel: "of total flow",
      trendDirection: "up",
      accentColor: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      id: "expenses",
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      icon: <TrendingDown size={20} />,
      trend: `${((totalExpenses / (totalIncome + totalExpenses)) * 100).toFixed(0)}%`,
      trendLabel: "of total flow",
      trendDirection: "down",
      accentColor: "bg-red-500/20",
      iconColor: "text-red-400",
    },
    {
      id: "savings",
      title: "Savings Rate",
      value: `${savingsRate}%`,
      icon: <PiggyBank size={20} />,
      trend: savingsRate >= 20 ? "Healthy" : "Low",
      trendLabel: savingsRate >= 20 ? "above 20% target" : "below 20% target",
      trendDirection: savingsRate >= 20 ? "up" : "down",
      accentColor: "bg-amber-500/20",
      iconColor: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <SummaryCard
          key={card.id}
          title={card.title}
          value={card.value}
          icon={card.icon}
          trend={card.trend}
          trendLabel={card.trendLabel}
          trendDirection={card.trendDirection}
          accentColor={card.accentColor}
          iconColor={card.iconColor}
        />
      ))}
    </div>
  );
}

export default SummaryCards;
