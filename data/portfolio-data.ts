export const siteConfig = {
  name: "Ankit Kumar Singh",
  initials: "AKS",
  title: "Strategic Marketing & AI | 3D Portfolio",
  description:
    "Strategic Marketing Professional, AI Integration Specialist, and Full-Stack Web/App Developer",
  url: "https://ankitkumarsingh.dev",
  resumeUrl: "/resume.pdf",
  phone: "+91 8126353972",
  email: "ankitsingh2632@gmail.com",
  whatsapp: "https://wa.me/918126353972",
  social: {
    linkedin: "https://linkedin.com/in/ankitsingh2632",
    github: "https://github.com/ankitsingh-gif",
    whatsapp: "https://wa.me/918126353972",
  },
};

export const heroRoles = [
  "Strategic Marketer",
  "AI Integration Specialist",
  "Full-Stack Web Developer",
  "Prompt Engineer",
  "Digital Product Builder",
];

export const heroSubtitle =
  "Assistant Manager at Resurgent India Limited | Building at the intersection of Marketing, AI & Technology";

export const aboutText = `Strategic Marketing Professional and Full-Stack Web Developer with 6+ years of experience in end-to-end branding, executive event promotion, and hands-on web application development. Currently driving marketing operations and digital product innovation at Resurgent India Limited — a SEBI-registered Category I Merchant Bank.

Google-certified in Generative AI & Prompt Engineering, I specialize in bridging marketing vision with technical execution. From architecting event platforms and fintech applications to managing large-scale email campaigns targeting C-suite executives — I build things that make an impact.

My domain expertise spans Merchant Banking, Stressed Asset Resolution, Insolvency & Bankruptcy, Fintech, and M&A Advisory — giving me a unique edge in understanding both the business and the technology behind it.`;

export const stats = [
  { value: 6, suffix: "+", label: "Years of Experience" },
  { value: 3, suffix: "", label: "Live Products Built" },
  { value: 6, suffix: "", label: "Google Certifications" },
  { value: 1000, suffix: "+", label: "Campaigns Executed" },
];

export interface ExperienceEntry {
  title: string;
  company: string;
  companyNote?: string;
  period: string;
  location?: string;
  highlights: string[];
  active?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    title: "Assistant Manager — Marketing & AI Integration",
    company: "Resurgent India Limited",
    companyNote: "SEBI Registered Category I Merchant Bank",
    period: "Oct 2021 — Present",
    location: "Delhi NCR",
    active: true,
    highlights: [
      "Architected end-to-end branding & promotional strategy for Executive Roundtables and webinars, significantly growing lead pipeline and brand authority",
      "Designed, developed & deployed the Resurgent Events Platform — a full-stack web app with event listings, online registration, and WhatsApp integration",
      "Led complete corporate website redesign with dynamic 3D visuals, admin panel, AI chatbot, M&A feed — benchmarked against McKinsey & BCG India",
      "Integrated AI prompt engineering and generative AI into the marketing lifecycle, automating content creation and campaign personalization",
      "Managed large-scale email campaigns via Mailwizz & Netcore targeting C-suite executives, driving measurable conversion improvements",
      "Built and mentored a high-performing marketing team exceeding digital marketing and business development targets",
    ],
  },
  {
    title: "Digital Marketing Executive",
    company: "PCPatchers Web Services",
    period: "Apr 2021 — Sep 2021",
    highlights: [
      "Directed comprehensive on-site/off-site SEO analysis improving search rankings and organic visibility",
      "Led keyword research and content optimization driving high-quality organic traffic growth",
      "Developed robust backlink acquisition strategies strengthening domain authority",
    ],
  },
  {
    title: "SEO Executive",
    company: "SimonTech Way Pvt. Ltd.",
    period: "Nov 2019 — Dec 2020",
    highlights: [
      "Executed technical SEO audits and keyword optimization for diverse client portfolios",
      "Built high-quality backlink profiles and implemented on-page best practices for sustained organic growth",
    ],
  },
];

export interface Project {
  name: string;
  url: string;
  description: string;
  techStack: string[];
  accentColor: string;
}

export const projects: Project[] = [
  {
    name: "Resurgent Events Platform",
    url: "https://resurgentevents.com",
    description:
      "Full-stack event management platform for Resurgent India's executive roundtables and weekly webinars. Features dynamic event listings with rich descriptions, online registration, WhatsApp and email integration, and a responsive modern UI. Serves as the primary event engagement hub for industry leaders and C-suite decision-makers.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    accentColor: "#00E5FF",
  },
  {
    name: "Resurgent India — Corporate Website Redesign",
    url: "https://resurgent-website.vercel.app",
    description:
      "Complete digital transformation of a SEBI-registered Category I Merchant Bank's web presence. Features dynamic 3D visual elements, an admin panel for content management, an AI-powered chatbot for visitor engagement, a webinar/roundtable section, and a weekly M&A opportunities feed. Design benchmarked against BCG India and McKinsey India.",
    techStack: [
      "Next.js",
      "React",
      "Three.js",
      "AI Chatbot",
      "Admin Panel",
      "Database",
      "Vercel",
    ],
    accentColor: "#FFD700",
  },
  {
    name: "DebtGoFlow — Financial Debt Tracker",
    url: "https://financial-debt.vercel.app",
    description:
      "A fintech web application designed to help users navigate complex multi-lender debt situations. Features multi-lender debt tracking, EMI cashflow waterfall projections, prioritized repayment strategies, lender negotiation scripts, and actionable step-by-step debt freedom plans.",
    techStack: [
      "Next.js",
      "React",
      "Vercel",
      "Financial Engine",
      "Data Modeling",
      "UI/UX",
    ],
    accentColor: "#2E86C1",
  },
];

export interface SkillCategory {
  name: string;
  color: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Marketing & Strategy",
    color: "#00E5FF",
    skills: [
      "Strategic Branding",
      "Webinar & Roundtable Management",
      "Email Marketing",
      "Social Media Engagement",
      "Community Management",
      "Lead Generation",
      "Campaign Analytics",
    ],
  },
  {
    name: "AI & Automation",
    color: "#FFD700",
    skills: [
      "Prompt Engineering",
      "Generative AI for Marketing",
      "AI Productivity Tools",
      "Claude AI",
      "Workflow Automation",
      "AI Chatbot Development",
    ],
  },
  {
    name: "Web Development",
    color: "#FF006E",
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "HTML/CSS",
      "Three.js",
      "Vercel",
      "Full-Stack Development",
      "Responsive Design",
    ],
  },
  {
    name: "Development Tools",
    color: "#A855F7",
    skills: [
      "VS Code",
      "Claude Code",
      "Git",
      "Vercel",
      "Admin Panel Development",
      "Database Integration",
    ],
  },
  {
    name: "MarTech Platforms",
    color: "#00FF88",
    skills: [
      "Mailwizz",
      "Netcore",
      "LinkedIn Sales Navigator",
      "Canva",
      "StreamYard",
      "CRM Systems",
      "Google Analytics",
    ],
  },
  {
    name: "SEO & Content",
    color: "#FF8C00",
    skills: [
      "On-site/Off-site SEO",
      "Technical SEO Audits",
      "Keyword Research",
      "Backlink Strategy",
      "Content Optimization",
    ],
  },
  {
    name: "Domain Expertise",
    color: "#2E86C1",
    skills: [
      "Merchant Banking",
      "Stressed Asset Resolution",
      "Insolvency & Bankruptcy",
      "Fintech & Lending",
      "M&A Advisory",
    ],
  },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export const certifications: Certification[] = [
  {
    name: "Discover the Art of Prompting",
    issuer: "Google",
    date: "January 2026",
  },
  {
    name: "Maximize Productivity with AI Tools",
    issuer: "Google",
    date: "January 2026",
  },
  {
    name: "Introduction to AI",
    issuer: "Google",
    date: "January 2026",
  },
  {
    name: "Create a High-Performing Team",
    issuer: "Google",
    date: "January 2026",
  },
  {
    name: "Google Search Ads",
    issuer: "Google",
    date: "January 2026",
  },
  {
    name: "Executive Office Professional Certificate Program",
    issuer: "Google",
    date: "January 2026",
  },
];

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export const education: Education[] = [
  {
    degree: "Bachelor's Degree in Science",
    institution: "Dr. Bhimrao Ambedkar University, Agra",
    period: "2019 — 2022",
  },
  {
    degree: "Diploma in Digital Marketing & Web Development",
    institution: "Green Box Institute",
    period: "2018 — 2019",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
