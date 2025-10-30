import React from "react";

type Tier = "Free" | "Pro";

const features: { name: string; tier: Tier; description: string }[] = [
  {
    name: "Excel & voice quick add",
    tier: "Free",
    description: "Add transactions via Excel (2/mo) or voice (10/mo).",
  },
  {
    name: "Recurring detection",
    tier: "Free",
    description: "Detect subscriptions and bills automatically.",
  },
  {
    name: "Safe-to-spend indicator",
    tier: "Free",
    description: "Know what you can safely spend after bills and goals.",
  },
  {
    name: "Category rules (auto-tag)",
    tier: "Free",
    description: "Auto-tag transactions by category rules.",
  },
  {
    name: "Bill reminders",
    tier: "Free",
    description: "Get notified before bills are due.",
  },
  {
    name: "CSV/Excel export",
    tier: "Free",
    description: "Export your data anytime.",
  },
  {
    name: "PDF/CSV uploads",
    tier: "Free",
    description: "Upload up to 3 PDF/CSV files per month.",
  },
  {
    name: "Unlimited OCR uploads",
    tier: "Pro",
    description: "No limits on document uploads.",
  },
  {
    name: "Background SMS/Email sync",
    tier: "Pro",
    description: "Sync transactions from SMS and email automatically.",
  },
  {
    name: "AI Smart Categorization",
    tier: "Pro",
    description: "AI tags transactions for you.",
  },
  {
    name: "Multi-account dashboard & reconciliation",
    tier: "Pro",
    description: "See all accounts, reconcile balances easily.",
  },
  {
    name: "Smart alerts",
    tier: "Pro",
    description: "Get notified for overspend, duplicates, unusual activity.",
  },
  {
    name: "Custom automations",
    tier: "Pro",
    description: "Set up if/then rules for your money.",
  },
  {
    name: "Net worth & trends",
    tier: "Pro",
    description: "Track your net worth and financial trends.",
  },
  {
    name: "Subscription manager",
    tier: "Pro",
    description: "Manage and cancel subscriptions easily.",
  },
  {
    name: "Priority support",
    tier: "Pro",
    description: "Get help fast from our team.",
  },
];

const badgeStyles: Record<Tier, string> = {
  Free: "bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 text-white border border-gray-500",
  Pro: "bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 text-black border border-yellow-500",
};

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature) => (
        <div
          key={feature.name}
          className="rounded-xl p-6 shadow-lg border border-gray-700 bg-[#111112] flex flex-col gap-2"
        >
          <span
            className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-2 ${badgeStyles[feature.tier as Tier]}`}
          >
            {feature.tier}
          </span>
          <h3 className="font-semibold text-lg text-silver mb-1">{feature.name}</h3>
          <p className="text-gray-400 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
