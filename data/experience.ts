export type ExperienceMetric = {
  value: string;
  label: string;
  description: string;
};

export const experienceMetrics: ExperienceMetric[] = [
  {
    value: "3 years",
    label: "Experience",
    description: "Product-focused engineering across real user-facing systems.",
  },
  {
    value: "2 years",
    label: "Ecommerce",
    description: "Checkout, coupon, order, payment, and post-purchase flows.",
  },
  {
    value: "1 year",
    label: "Travel-Tech",
    description: "Search, traveller capture, fare validation, and booking lifecycle work.",
  },
  {
    value: "Transaction-critical",
    label: "Systems",
    description: "Built for flows where clarity and correctness both matter.",
  },
];

export const experienceHighlights = [
  "Strong full stack profile with product judgment across UI, backend workflows, payments, and operational systems.",
  "Comfortable owning journeys that span interface design, authentication, payment state, persistence, and lifecycle visibility.",
  "Best fit for teams building ecommerce, checkout, booking, payments, and other trust-sensitive product systems.",
] as const;
