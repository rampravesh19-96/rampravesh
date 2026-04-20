export type Strength = {
  title: string;
  summary: string;
  points: string[];
};

export const strengths: Strength[] = [
  {
    title: "End-to-End Product Systems",
    summary:
      "Complete product systems shaped across interface, application logic, payments, persistence, and operational follow-through.",
    points: [
      "Search, filtering, cart, checkout, and booking journeys designed as connected systems rather than isolated screens.",
      "User flows shaped to keep trust-sensitive actions clear from discovery through confirmation and post-action visibility.",
      "Responsive product experiences that preserve hierarchy, clarity, and confidence across desktop and mobile.",
      "System-minded implementation that keeps complex journeys understandable for users, recruiters, and product teams.",
    ],
  },
  {
    title: "Transaction Workflows and Integrations",
    summary:
      "Full stack execution around the moments users care about most: protected actions, payments, persistence, and lifecycle state management.",
    points: [
      "Auth-aware workflows connected cleanly to checkout and booking paths.",
      "Payment initiation and confirmation steps designed around correctness and user confidence.",
      "Orders and bookings persisted beyond the transaction moment instead of ending at a single success screen.",
      "Operational views and status systems that make the products feel production-oriented rather than demo-only.",
    ],
  },
  {
    title: "Ecommerce and Travel-Tech Depth",
    summary:
      "Domain experience in two categories where product quality, system accuracy, and lifecycle visibility directly shape trust and conversion.",
    points: [
      "Ecommerce coverage across catalog, coupon flow, checkout, order history, and admin-lite operations.",
      "Travel-tech coverage across city search, fare recheck, traveller capture, booking timeline, and cancellation.",
      "Comfort with lifecycle-heavy products where post-purchase and post-booking states matter just as much as conversion.",
      "Built around business-critical user flows rather than isolated UI exercises.",
    ],
  },
];
