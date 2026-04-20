export const siteConfig = {
  name: "Ram Pravesh",
  title: "Full Stack Engineer",
  tagline:
    "Building end-to-end payment, checkout, booking, and lifecycle systems across ecommerce and travel-tech.",
  description:
    "I build complete product systems across frontend, backend, payments, persistence, and operational workflows, turning transaction-heavy journeys into clear, reliable user experiences.",
  availability: "Open to full stack and product engineering roles",
  contactHeading:
    "Open to full stack and product engineering roles.",
  contactDescription:
    "Especially strong fit for teams building checkout, payments, booking, and lifecycle-heavy systems where end-to-end ownership and product judgment both matter.",
  footerNote:
    "Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
  links: {
    projects: "#projects",
    resume: "/resume",
    portfolio: "https://rampravesh-dev.vercel.app",
    github: "https://github.com/rampravesh19-96",
    linkedin: "https://www.linkedin.com/in/ram-pravesh-singh-619000186",
    email: "mailto:praveshram1204@gmail.com",
  },
  featuredProjects: {
    ecommerce: {
      live: "https://commerce-checkout-system.vercel.app",
      code: "https://github.com/rampravesh19-96/commerce-checkout-system",
    },
    travel: {
      live: "https://flight-booking-system-frontend-xi.vercel.app",
      code: "https://github.com/rampravesh19-96/flight-booking-system",
    },
  },
} as const;
