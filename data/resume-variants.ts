import {
  resumeData,
  type ResumeData,
  type ResumeExperienceItem,
  type ResumeProject,
  type ResumeSkillGroup,
} from "@/data/resume";

export type ResumeVariant = "fullstack" | "frontend" | "backend";

type ResumeVariantContent = Pick<
  ResumeData,
  "title" | "headline" | "summary" | "skillGroups" | "experience" | "projects"
>;

export const resumeVariantOptions: Array<{
  value: ResumeVariant;
  label: string;
  href: string;
}> = [
  { value: "fullstack", label: "Full Stack", href: "/resume" },
  { value: "frontend", label: "Frontend", href: "/resume?variant=frontend" },
  { value: "backend", label: "Backend", href: "/resume?variant=backend" },
];

const fullstackSkills: ResumeSkillGroup[] = [
  {
    title: "Frontend & Full Stack Development",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Responsive UI",
      "Full Stack Development",
    ],
  },
  {
    title: "Backend, APIs & Data",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "API Integration",
      "Authentication",
      "Authorization",
      "Prisma",
      "MySQL",
    ],
  },
  {
    title: "Payments & Workflows",
    items: [
      "Razorpay",
      "Payment Integration",
      "Payment Verification",
      "Checkout Flow",
      "Booking Flow",
      "Fare Recheck",
      "Search and Discovery",
      "Order Creation",
      "Booking Creation",
      "Order Management",
      "Booking Lifecycle",
    ],
  },
];

const fullstackExperience: ResumeExperienceItem[] = [
  {
    title: "Full Stack Engineer",
    scope: "Giottus Technology",
    duration: "2 years",
    bullets: [
      "Built customer-facing ecommerce journeys across search and discovery, product detail, cart, coupon handling, authentication, authorization, protected checkout, and post-order visibility.",
      "Implemented REST APIs and backend workflows in Node.js, Express.js, Prisma, and MySQL for cart management, order creation, order management, payment integration, and payment verification.",
      "Integrated Razorpay sandbox payments into checkout flows where pricing, auth state, order creation, and confirmation-sensitive transaction updates needed to stay aligned.",
      "Delivered lifecycle visibility through user-facing order history and admin-lite operations views so order status, confirmation, and follow-through remained clear after payment.",
    ],
  },
  {
    title: "Full Stack Engineer",
    scope: "HOI Travel Tech",
    duration: "1 year",
    bullets: [
      "Built responsive travel booking journeys across city and airport search, results refinement, traveller capture, authentication, authorization, protected booking flow, and booking confirmation.",
      "Designed REST APIs and backend workflows in Node.js, Express.js, Prisma, and MySQL for booking creation, booking persistence, cancellation handling, and booking lifecycle visibility.",
      "Added fare recheck, Razorpay payment integration, and payment verification to support confirmation-sensitive booking flows where availability, payment state, and itinerary data had to stay consistent.",
      "Improved post-booking trust through My Bookings and admin-lite operations views that surfaced booking status, timeline updates, and cancellation follow-through.",
    ],
  },
];

const fullstackProjects: ResumeProject[] = [
  {
    title: "Commerce Checkout and Order Lifecycle System",
    stack:
      "React.js, Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, Prisma, TiDB (MySQL-compatible)",
    bullets: [
      "Built a production-style full stack ecommerce system covering search and discovery, responsive UI, authentication, authorization, cart, coupons, protected checkout flow, and order lifecycle visibility.",
      "Implemented Razorpay payment integration, payment verification, REST APIs, order creation, and order management workflows so pricing, checkout confirmation, and post-payment state stayed reliable.",
      "Delivered My Orders and admin-lite operations views for confirmation tracking, lifecycle visibility, and post-purchase operational follow-through.",
    ],
    liveHref: resumeData.projects[0].liveHref,
    codeHref: resumeData.projects[0].codeHref,
  },
  {
    title: "Flight Booking and Confirmation System",
    stack:
      "React.js, Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, Prisma, TiDB (MySQL-compatible)",
    bullets: [
      "Built a production-style full stack travel-tech booking system covering city-based search, results refinement, traveller capture, responsive UI, protected booking flow, and booking lifecycle visibility.",
      "Implemented fare recheck, Razorpay payment integration, payment verification, REST APIs, booking creation, and booking persistence for confirmation-sensitive flight booking journeys.",
      "Delivered booking timeline, cancellation flow, My Bookings, and admin-lite booking operations to improve lifecycle visibility and post-confirmation user trust.",
    ],
    liveHref: resumeData.projects[1].liveHref,
    codeHref: resumeData.projects[1].codeHref,
  },
];

const frontendSkills: ResumeSkillGroup[] = [
  {
    title: "Frontend & Product UX",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Responsive UI",
      "Search and Discovery",
    ],
  },
  {
    title: "Conversion & Lifecycle Flows",
    items: [
      "Checkout Flow",
      "Booking Flow",
      "Authentication",
      "Authorization",
      "Payment Integration",
      "Payment Verification",
      "Order Management",
      "Booking Lifecycle",
    ],
  },
  {
    title: "Backend Awareness",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "API Integration",
      "Prisma",
      "MySQL",
      "Razorpay",
    ],
  },
];

const frontendExperience: ResumeExperienceItem[] = [
  {
    title: "Frontend Engineer",
    scope: "Giottus Technology",
    duration: "2 years",
    bullets: [
      "Built responsive ecommerce UI across search and discovery, product detail, cart, coupon handling, protected checkout, and post-order visibility.",
      "Improved React.js and Next.js user journeys where auth state, pricing feedback, product clarity, and checkout UX directly affected conversion and trust.",
      "Integrated frontend checkout flows with Node.js and Express.js APIs for payment initiation, verification responses, order confirmation, and lifecycle updates.",
      "Delivered My Orders and admin-lite operations views that surfaced order status, confirmation states, and post-purchase follow-through.",
    ],
  },
  {
    title: "Frontend Engineer",
    scope: "HOI Travel Tech",
    duration: "1 year",
    bullets: [
      "Built responsive travel booking experiences across city and airport search, results refinement, traveller capture, protected booking flow, and booking confirmation.",
      "Focused on search UX, editable results flows, fare recheck presentation, and lifecycle visibility in transaction-sensitive booking journeys.",
      "Connected React.js and Next.js interfaces with backend APIs for booking creation, payment verification, persistence, and cancellation handling.",
      "Improved My Bookings and admin-lite views so status timelines and post-booking updates remained clear and actionable.",
    ],
  },
];

const frontendProjects: ResumeProject[] = [
  {
    title: "Commerce Checkout and Order Lifecycle System",
    stack:
      "React.js, Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, Prisma, TiDB (MySQL-compatible)",
    bullets: [
      "Built a production-style React.js and Next.js ecommerce application covering search and discovery, responsive UI, authentication-aware cart and coupon flows, and protected checkout.",
      "Designed product detail, cart, pricing, and confirmation states that worked cleanly with Razorpay payment integration, payment verification, and order lifecycle updates.",
      "Delivered My Orders and admin-lite operations views to keep order status, confirmation, and post-purchase visibility clear.",
    ],
    liveHref: resumeData.projects[0].liveHref,
    codeHref: resumeData.projects[0].codeHref,
  },
  {
    title: "Flight Booking and Confirmation System",
    stack:
      "React.js, Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, Prisma, TiDB (MySQL-compatible)",
    bullets: [
      "Built a production-style React.js and Next.js travel booking application covering city search, results refinement, traveller capture, responsive UI, and protected booking flow.",
      "Handled fare recheck, booking review, payment states, and confirmation-aware UX while integrating with REST APIs, booking creation, and payment verification workflows.",
      "Delivered booking timeline, cancellation, and My Bookings views to improve lifecycle visibility after confirmation.",
    ],
    liveHref: resumeData.projects[1].liveHref,
    codeHref: resumeData.projects[1].codeHref,
  },
];

const backendSkills: ResumeSkillGroup[] = [
  {
    title: "Backend, APIs & Data",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "API Integration",
      "Prisma",
      "MySQL",
      "Authentication",
      "Authorization",
    ],
  },
  {
    title: "Payments & Lifecycle Logic",
    items: [
      "Razorpay",
      "Payment Integration",
      "Payment Verification",
      "Order Creation",
      "Booking Creation",
      "Order Management",
      "Booking Lifecycle",
      "Fare Recheck",
    ],
  },
  {
    title: "Full Stack Delivery",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Responsive UI",
      "Search and Discovery",
      "Full Stack Development",
    ],
  },
];

const backendExperience: ResumeExperienceItem[] = [
  {
    title: "Backend / Full Stack Engineer",
    scope: "Giottus Technology",
    duration: "2 years",
    bullets: [
      "Implemented Node.js, Express.js, Prisma, and MySQL workflows for cart state, order creation, order management, payment integration, and payment verification.",
      "Designed transaction-aware checkout logic where authentication, pricing, Razorpay callbacks, and order confirmation had to stay consistent.",
      "Supported customer-facing commerce flows across search, product detail, cart, coupons, protected checkout, and post-order visibility.",
      "Delivered lifecycle visibility through user-facing order history and admin-lite operations views for confirmation and post-payment follow-through.",
    ],
  },
  {
    title: "Backend / Full Stack Engineer",
    scope: "HOI Travel Tech",
    duration: "1 year",
    bullets: [
      "Built backend workflows in Node.js, Express.js, Prisma, and MySQL for booking creation, booking persistence, cancellation handling, and booking lifecycle visibility.",
      "Handled fare recheck, payment verification, itinerary state, and confirmation-sensitive booking logic for travel flows tied to availability and payment state.",
      "Integrated REST APIs with frontend booking journeys covering city search, traveller capture, protected booking flow, and post-booking visibility.",
      "Delivered My Bookings and admin-lite operations views so status timelines, cancellation updates, and lifecycle logic remained traceable.",
    ],
  },
];

const backendProjects: ResumeProject[] = [
  {
    title: "Commerce Checkout and Order Lifecycle System",
    stack:
      "Node.js, Express.js, Prisma, TiDB (MySQL-compatible), React.js, Next.js, TypeScript",
    bullets: [
      "Built a production-style Node.js, Express.js, and Prisma ecommerce system with REST APIs for cart management, order creation, order management, payment integration, and Razorpay payment verification.",
      "Implemented transaction-aware checkout flows tying authentication, pricing, cart state, confirmation, and post-payment lifecycle visibility together.",
      "Exposed customer and admin-lite order views so lifecycle status and operational follow-through stayed traceable after payment.",
    ],
    liveHref: resumeData.projects[0].liveHref,
    codeHref: resumeData.projects[0].codeHref,
  },
  {
    title: "Flight Booking and Confirmation System",
    stack:
      "Node.js, Express.js, Prisma, TiDB (MySQL-compatible), React.js, Next.js, TypeScript",
    bullets: [
      "Built a production-style booking backend with Node.js, Express.js, Prisma, and MySQL-compatible TiDB for booking creation, booking persistence, cancellation handling, and booking lifecycle visibility.",
      "Implemented fare recheck, payment verification, itinerary state handling, and confirmation-sensitive logic for transaction-heavy flight booking journeys.",
      "Connected booking APIs to customer-facing search, review, My Bookings, and admin-lite operations views for end-to-end lifecycle coverage.",
    ],
    liveHref: resumeData.projects[1].liveHref,
    codeHref: resumeData.projects[1].codeHref,
  },
];

const resumeVariantContent: Record<ResumeVariant, ResumeVariantContent> = {
  fullstack: {
    title: "Full Stack Engineer",
    headline:
      "React.js, Next.js, TypeScript, Node.js, Express.js, Prisma, MySQL | End-to-End Payments, Checkout, Booking & Lifecycle Systems",
    summary:
      "Full Stack Engineer with 3 years of experience delivering end-to-end product systems across ecommerce and travel-tech. Strong across React.js, Next.js, TypeScript, Node.js, Express.js, Prisma, and MySQL for payments, checkout, booking, search and discovery, and lifecycle workflows.",
    skillGroups: fullstackSkills,
    experience: fullstackExperience,
    projects: fullstackProjects,
  },
  frontend: {
    title: "Frontend Engineer",
    headline:
      "React.js, Next.js, TypeScript, Tailwind CSS | Search, Results, Checkout & Booking Experiences",
    summary:
      "Frontend Engineer with 3 years of experience building responsive ecommerce and travel-tech product experiences across React.js, Next.js, TypeScript, JavaScript, and Tailwind CSS. Strong in search and discovery, results refinement, checkout and booking flows, authentication-aware UI, and lifecycle visibility, with practical backend awareness across Node.js, Express.js, Prisma, MySQL, REST APIs, and payment verification.",
    skillGroups: frontendSkills,
    experience: frontendExperience,
    projects: frontendProjects,
  },
  backend: {
    title: "Backend / Full Stack Engineer",
    headline:
      "Node.js, Express.js, Prisma, MySQL, REST APIs | Payments, Order & Booking Lifecycle Systems",
    summary:
      "Backend / Full Stack Engineer with 3 years of experience building transaction-heavy ecommerce and HOI Travel Tech. Strong in Node.js, Express.js, Prisma, MySQL, REST APIs, API integration, payment verification, order creation, booking creation, lifecycle logic, and operational workflows, with frontend delivery experience in React.js and Next.js.",
    skillGroups: backendSkills,
    experience: backendExperience,
    projects: backendProjects,
  },
};

export function normalizeResumeVariant(
  variant?: string | string[] | undefined,
): ResumeVariant {
  const value = Array.isArray(variant) ? variant[0] : variant;

  if (value === "frontend" || value === "backend" || value === "fullstack") {
    return value;
  }

  return "fullstack";
}

export function getResumeDataForVariant(variant: ResumeVariant): ResumeData {
  return {
    ...resumeData,
    ...resumeVariantContent[variant],
  };
}
