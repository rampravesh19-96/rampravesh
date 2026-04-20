export type ProjectLink = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
  disabled?: boolean;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  label: string;
  caption: string;
};

export type ProjectHighlight = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  domain: string;
  title: string;
  cardSummary: string;
  deepDiveSummary: string;
  focus: string;
  stack: string[];
  capabilities: string[];
  journey: string[];
  engineeringDepth: string[];
  productDepth: string[];
  highlights: ProjectHighlight[];
  screenshots: ProjectScreenshot[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "commerce-checkout",
    domain: "Ecommerce System",
    title: "Commerce Checkout and Order Lifecycle System",
    cardSummary:
      "A production-style ecommerce application focused on high-intent flows from discovery and cart state to payment confirmation and post-purchase visibility.",
    deepDiveSummary:
      "This project is positioned as a serious commerce build, not just a storefront. The core value is handling the conversion-critical moments where UX clarity, authentication rules, payment flow confidence, and order visibility all need to work together cleanly.",
    focus: "Checkout, payment confirmation, and order operations",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Prisma",
      "MySQL / TiDB",
      "Razorpay Sandbox",
      "Vercel",
      "Render",
    ],
    capabilities: [
      "Catalog discovery with search, sorting, and category filters",
      "Product detail views with a clean cart-building flow",
      "Coupon logic and protected checkout gating",
      "Razorpay sandbox payment and order confirmation",
      "My Orders with lifecycle status visibility",
      "Admin-lite order operations dashboard",
    ],
    journey: [
      "Browse the catalog, refine through filters and sorting, and move into detailed product exploration.",
      "Add items to cart, apply coupon logic, authenticate, and continue into a protected checkout path.",
      "Complete Razorpay sandbox payment, confirm order creation, and preserve order history for later visibility.",
    ],
    engineeringDepth: [
      "Checkout state has to stay consistent across authentication, coupon handling, payment initiation, and confirmation screens.",
      "Order lifecycle logic spans customer-facing history views and operational tracking for fulfillment-style workflows.",
      "Payment handling raises the quality bar because the flow must feel trustworthy before and after the transaction moment.",
    ],
    productDepth: [
      "Clear summaries, pricing context, and friction-aware UI for cart and checkout.",
      "Post-purchase confidence through confirmation states and easy order lookup.",
      "Operational visibility that makes the app feel closer to a real commerce system than a demo catalog.",
    ],
    highlights: [
      { label: "Core Journey", value: "Catalog to payment" },
      { label: "Protected Flow", value: "Auth-gated checkout" },
      { label: "Ops Layer", value: "Order visibility" },
    ],
    screenshots: [
      {
        src: "/images/projects/commerce-overview.svg",
        alt: "Commerce application overview showing catalog, filters, cart summary, and checkout call to action.",
        label: "Storefront + Checkout",
        caption:
          "A polished storefront flow with search, filters, product cards, cart context, and a visible path into checkout.",
      },
      {
        src: "/images/projects/commerce-operations.svg",
        alt: "Commerce order operations view showing order states, timeline, and operational insights.",
        label: "Order Lifecycle View",
        caption:
          "Order states, customer history, and admin-lite visibility turn the purchase into a complete lifecycle system.",
      },
    ],
    links: [
      {
        label: "Live Demo",
        href: "https://commerce-checkout-system.vercel.app",
        variant: "primary",
      },
      {
        label: "GitHub",
        href: "https://github.com/rampravesh19-96/commerce-checkout-system",
        variant: "secondary",
      },
      {
        label: "View Details",
        href: "#project-commerce-checkout",
        variant: "ghost",
      },
    ],
  },
  {
    slug: "flight-booking",
    domain: "Travel-Tech System",
    title: "Flight Booking and Confirmation System",
    cardSummary:
      "A production-style flight booking flow built around search, fare refinement, traveller details, payment confidence, booking persistence, and lifecycle updates.",
    deepDiveSummary:
      "This project showcases travel-tech product depth where user trust depends on fast search UX, booking precision, fare validation, confirmation states, and the ability to manage bookings after payment.",
    focus: "Search, booking persistence, and booking status flows",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Prisma",
      "MySQL / TiDB",
      "Razorpay Sandbox",
      "Vercel",
      "Render",
    ],
    capabilities: [
      "City and airport-based search input with route-style coverage",
      "Results refinement and flight detail selection",
      "Traveller data capture with auth-aware booking flow",
      "Fare recheck and Razorpay sandbox payment",
      "My Bookings with booking persistence and status timeline",
      "Cancel booking flow plus admin-lite booking dashboard",
    ],
    journey: [
      "Search by city or airport, refine results, and compare options before committing to an itinerary.",
      "Review flight details, enter traveller information, authenticate when needed, and persist booking intent.",
      "Run fare recheck, complete payment, confirm booking creation, and surface timeline and cancellation visibility.",
    ],
    engineeringDepth: [
      "Travel flows need stronger state handling because pricing, traveller data, and booking transitions are tightly coupled.",
      "Fare recheck and booking persistence increase the sense of production realism beyond a static search demo.",
      "Booking history and cancellation handling require lifecycle thinking after the payment step is complete.",
    ],
    productDepth: [
      "High-readability search and results surfaces that help users move quickly without feeling rushed.",
      "Careful form and confirmation UI to keep traveller submission and payment trustworthy.",
      "Timeline and booking-management views that make the system feel operationally complete.",
    ],
    highlights: [
      { label: "Core Journey", value: "Search to booking" },
      { label: "Validation", value: "Fare recheck flow" },
      { label: "Lifecycle", value: "Timeline + cancel" },
    ],
    screenshots: [
      {
        src: "/images/projects/travel-search.svg",
        alt: "Flight booking application showing search controls and refined flight results.",
        label: "Search + Results",
        caption:
          "A travel search surface with city-based inputs, route options, and a premium results layout focused on decision speed.",
      },
      {
        src: "/images/projects/travel-booking.svg",
        alt: "Flight booking confirmation view showing traveller details, booking timeline, and payment panel.",
        label: "Booking + Timeline",
        caption:
          "Traveller details, fare validation, confirmation states, and lifecycle visibility shape the booking experience end to end.",
      },
    ],
    links: [
      {
        label: "Live Demo",
        href: "https://flight-booking-system-frontend-xi.vercel.app",
        variant: "primary",
      },
      {
        label: "GitHub",
        href: "https://github.com/rampravesh19-96/flight-booking-system",
        variant: "secondary",
      },
      {
        label: "View Details",
        href: "#project-flight-booking",
        variant: "ghost",
      },
    ],
  },
];