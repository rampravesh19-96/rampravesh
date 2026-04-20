export type StackGroup = {
  title: string;
  description: string;
  items: string[];
};

export const stackGroups: StackGroup[] = [
  {
    title: "Frontend",
    description:
      "Modern app routing, component architecture, responsive UI, and subtle motion for product-facing experiences.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    description:
      "API and workflow layers that support auth-aware flows, bookings, orders, and transaction states.",
    items: ["Node.js", "Express", "REST APIs", "Protected Routes"],
  },
  {
    title: "Database",
    description:
      "Persistence and data modeling for orders, bookings, user history, and operational visibility.",
    items: ["MongoDB", "Mongoose", "Schema Design"],
  },
  {
    title: "Payments / Integrations",
    description:
      "Transaction-focused integrations that support payment confidence and lifecycle updates.",
    items: ["Razorpay Sandbox", "Checkout Flows", "Payment Confirmation", "Status Handling"],
  },
  {
    title: "Deployment / Tooling",
    description:
      "Product-style delivery with hosted frontends, deployable services, and a clean iteration workflow.",
    items: ["Vercel", "Render", "Git", "Postman", "npm"],
  },
];
