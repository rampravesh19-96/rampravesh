import { siteConfig } from "@/data/site";

export type ResumeLink = {
  label: string;
  value: string;
  href: string;
};

export type ResumeSkillGroup = {
  title: string;
  items: string[];
};

export type ResumeExperienceItem = {
  title: string;
  scope: string;
  duration: string;
  bullets: string[];
};

export type ResumeProject = {
  title: string;
  stack: string;
  bullets: string[];
  liveHref: string;
  codeHref: string;
};

export type ResumeData = {
  name: string;
  location: string;
  email: string;
  phone: string;
  title: string;
  headline: string;
  summary: string;
  contactLinks: ResumeLink[];
  skillGroups: ResumeSkillGroup[];
  experience: ResumeExperienceItem[];
  projects: ResumeProject[];
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  links: ResumeLink[];
};

export const resumeData: ResumeData = {
  name: "Ram Pravesh",
  location: "Noida, Uttar Pradesh, India",
  email: "praveshram1204@gmail.com",
  phone: "+91-7320863504",
  title: "Full Stack Engineer",
  headline:
    "React, Next.js, TypeScript, Node.js, Express.js, Prisma, MySQL | Payments, Checkout, Booking & Lifecycle Systems",
  summary:
    "Full Stack Engineer with 3 years of experience delivering transaction-heavy ecommerce and HOI Travel Tech across React.js, Next.js, TypeScript, JavaScript, Node.js, Express.js, Prisma, and MySQL. Strong in responsive UI, REST APIs, authentication and authorization, API integration, Razorpay payment integration and verification, checkout flow, booking flow, fare recheck, order creation, booking creation, and lifecycle visibility.",
  contactLinks: [
    {
      label: "Portfolio",
      value: "rampravesh-dev.vercel.app",
      href: siteConfig.links.portfolio,
    },
    {
      label: "LinkedIn",
      value: "ram-pravesh-singh-619000186",
      href: siteConfig.links.linkedin,
    },
    {
      label: "GitHub",
      value: "github.com/rampravesh19-96",
      href: siteConfig.links.github,
    },
  ],
  skillGroups: [
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
  ],
  experience: [
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
  ],
  projects: [
    {
      title: "Commerce Checkout and Order Lifecycle System",
      stack:
        "React.js, Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, Prisma, TiDB (MySQL-compatible)",
      bullets: [
        "Built a production-style full stack ecommerce system covering search and discovery, responsive UI, authentication, authorization, cart, coupons, protected checkout flow, and order lifecycle visibility.",
        "Implemented Razorpay payment integration, payment verification, REST APIs, order creation, and order management workflows so pricing, checkout confirmation, and post-payment state stayed reliable.",
        "Delivered My Orders and admin-lite operations views for confirmation tracking, lifecycle visibility, and post-purchase operational follow-through.",
      ],
      liveHref: siteConfig.featuredProjects.ecommerce.live,
      codeHref: siteConfig.featuredProjects.ecommerce.code,
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
      liveHref: siteConfig.featuredProjects.travel.live,
      codeHref: siteConfig.featuredProjects.travel.code,
    },
  ],
  education: {
    degree: "B.Tech - Computer Science & Engineering",
    institution: "RGPV, Bhopal",
    year: "2021",
  },
  links: [
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ram-pravesh-singh-619000186",
      href: siteConfig.links.linkedin,
    },
    {
      label: "GitHub",
      value: "github.com/rampravesh19-96",
      href: siteConfig.links.github,
    },
    {
      label: "Commerce Live",
      value: "commerce-checkout-system.vercel.app",
      href: siteConfig.featuredProjects.ecommerce.live,
    },
    {
      label: "Travel Live",
      value: "flight-booking-system-frontend-xi.vercel.app",
      href: siteConfig.featuredProjects.travel.live,
    },
  ],
};
