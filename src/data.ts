import { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    title: "Invade Tech Solutions",
    description:
      "Full-stack SaaS platform with dual JWT auth, Paystack payments, Cloudinary file storage, Daily.co webinar integration, AI-powered chatbot integration, and a student portal. Built end-to-end from zero.",
    tech: ["Node.js", "Express", "MongoDB", "React", "Paystack", "Cloudinary"],
    liveUrl: "https://invadetechsolutionz.com",
    codeUrl: "https://github.com/mbunabojohn-glitch",
    image: "/invade.png",
    status: "live",
  },
  {
    title: "Eagle International Group",
    description:
      "Corporate website for an Oil & Gas, Renewable Energy & Civil Engineering conglomerate. React frontend with a Node.js/MongoDB CMS backend using OTP admin auth via Resend & JWT.",
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Node.js", "MongoDB", "Resend"],
    liveUrl: "https://eagle-international-website.vercel.app/",
    codeUrl: "#",
    image: "/eagle.png",
    status: "building",
  },
  {
    title: "Aaronic E-Commerce",
    description:
      "Seller dashboard with live MongoDB aggregations replacing all hardcoded data. Full backend takeover from Julius. TanStack Query on the frontend, Express APIs on the back.",
    tech: ["React 19", "TypeScript", "TanStack Query", "Express", "MongoDB"],
    liveUrl: "https://aaronic-e-commerce.vercel.app/",
    codeUrl: "#",
    image: "/aaronics.png",
    status: "building",
  },
  {
    title: "Pivot Grid",
    description:
      "Automated MT5 trading platform executing Fibonacci pullback strategies on EURUSD, BTCUSD, and XAUUSD. Private beta, friends-only testing before any commercial phase.",
    tech: ["MT5", "React", "Node.js"],
    liveUrl: "https://pivot-grid-jjjz.vercel.app/",
    codeUrl: "https://github.com/mbunabojohn-glitch",
    image: "/pivotgrid.png",
    status: "building",
  },
];

export const SKILLS = [
  "React 19",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "TanStack Query",
  "Vite",
  "Vercel",
  "Render",
  "JWT Auth",
  "REST APIs",
  "Git & GitHub",
  "Postman",
  "Cloudinary",
  "Resend",
  "Paystack",
];
