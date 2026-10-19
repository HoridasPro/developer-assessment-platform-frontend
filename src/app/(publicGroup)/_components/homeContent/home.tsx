"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  CreditCard,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
  Eye,
  Layers3,
  TrendingUp,
  Gauge,
  Fingerprint,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { TGetMeResponse } from "@/types/getMeResponse";
import { useGetMe } from "@/hooks";

const features = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Assessment Management",
    description:
      "Create, organize, publish, and manage technical assessments from one intuitive workspace.",
    color: "text-violet-600 dark:text-violet-400",
  },
  {
    number: "02",
    icon: Code2,
    title: "Smart Problem Bank",
    description:
      "Build a reusable library of MCQ, coding, and written questions for every hiring need.",
    color: "text-cyan-600 dark:text-cyan-400",
  },
  {
    number: "03",
    icon: Users,
    title: "Candidate Management",
    description:
      "Invite candidates, manage access, and follow assessment progress without the busywork.",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    number: "04",
    icon: Target,
    title: "Evaluation & Scoring",
    description:
      "Review submissions, evaluate answers, and understand candidate performance.",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Performance Reports",
    description:
      "Turn assessment outcomes into clear insights that support better hiring decisions.",
    color: "text-pink-600 dark:text-pink-400",
  },
  {
    number: "06",
    icon: CreditCard,
    title: "Payment Workflow",
    description:
      "Manage assessment payments through an organized platform workflow.",
    color: "text-blue-600 dark:text-blue-400",
  },
];

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Create",
    heading: "Build your assessment.",
    description:
      "Set up an assessment, choose questions, and prepare it for your candidates.",
  },
  {
    number: "02",
    icon: Users,
    title: "Invite",
    heading: "Bring talent in.",
    description:
      "Invite candidates and let them access their assigned assessments.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Evaluate",
    heading: "Discover the right fit.",
    description:
      "Review submissions, evaluate responses, and explore assessment results.",
  },
];

const benefits = [
  "Centralized assessment management",
  "Reusable technical question bank",
  "Candidate invitation tracking",
  "Organized submissions and evaluation",
  "Performance reporting",
  "Dedicated company and candidate dashboards",
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
    alt: "Analytics and business dashboard",
    label: "Performance analytics",
    tag: "01 / INSIGHTS",
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85",
    alt: "People collaborating on digital work",
    label: "Candidate experience",
    tag: "02 / PEOPLE",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=85",
    alt: "Technology team collaborating",
    label: "Team collaboration",
    tag: "03 / TEAMWORK",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=85",
    alt: "Data visualization and reporting",
    label: "Smart reporting",
    tag: "04 / ANALYTICS",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=85",
    alt: "Developer coding at a workstation",
    label: "Technical assessments",
    tag: "05 / DEVELOPMENT",
  },
];

const qualityPoints = [
  {
    number: "01",
    title: "Structured evaluation",
    description:
      "Keep assessment questions, submissions, scoring, and evaluation connected in one consistent process.",
  },
  {
    number: "02",
    title: "Clear performance insights",
    description:
      "Understand candidate performance with organized results and reporting.",
  },
  {
    number: "03",
    title: "A reusable question library",
    description:
      "Organize MCQ, coding, and written questions so your team can prepare future assessments efficiently.",
  },
];

const securityPoints = [
  {
    icon: LockKeyhole,
    title: "Controlled assessment access",
    description:
      "Use account roles and assessment invitations to organize access for companies and candidates.",
  },
  {
    icon: Fingerprint,
    title: "Role-based experiences",
    description:
      "Give companies, candidates, and administrators dedicated workflows for their responsibilities.",
  },
  {
    icon: Eye,
    title: "Visible assessment progress",
    description:
      "Follow the assessment lifecycle from publication and invitations to submissions and evaluation.",
  },
];

export default function Home() {
  const { data } = useGetMe();
  const user: TGetMeResponse = data;

  const router = useRouter();

  const handleGetStarted = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    switch (user.data.role) {
      case "CANDIDATE":
        router.push("/dashboard/candidate");
        break;

      case "COMPANY":
        router.push("/dashboard/company");
        break;

      case "ADMIN":
        router.push("/dashboard/admin");
        break;

      default:
        router.push("/login");
    }
  };
  return (
    <main className="min-h-screen overflow-x-clip bg-white text-slate-900 transition-colors duration-300 dark:bg-[#080b18] dark:text-white">
      <style jsx global>{`
        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translate3d(0, 35px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes imageFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(var(--tilt, 0deg));
          }
          25% {
            transform: translate3d(0, -13px, 0)
              rotate(calc(var(--tilt, 0deg) + 1deg));
          }
          50% {
            transform: translate3d(0, -23px, 0)
              rotate(calc(var(--tilt, 0deg) - 0.7deg));
          }
          75% {
            transform: translate3d(0, -9px, 0)
              rotate(calc(var(--tilt, 0deg) + 0.5deg));
          }
        }

        @keyframes imageEntrance {
          from {
            opacity: 0;
            transform: translate3d(0, 65px, 0) scale(0.82) rotate(5deg);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1) rotate(var(--tilt, 0deg));
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.94);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.12);
          }
        }

        @keyframes orbitSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes badgeBob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes gradientFlow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shine {
          from {
            transform: translateX(-150%) skewX(-20deg);
          }
          to {
            transform: translateX(250%) skewX(-20deg);
          }
        }

        @keyframes lineFlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .hero-reveal {
          opacity: 0;
          animation: heroReveal 850ms cubic-bezier(0.2, 0.75, 0.25, 1) forwards;
        }

        .hero-delay-1 {
          animation-delay: 100ms;
        }

        .hero-delay-2 {
          animation-delay: 220ms;
        }

        .hero-delay-3 {
          animation-delay: 340ms;
        }

        .hero-delay-4 {
          animation-delay: 460ms;
        }

        .hero-image {
          opacity: 0;
          transform-origin: center;
          animation:
            imageEntrance 950ms cubic-bezier(0.18, 0.75, 0.25, 1) forwards,
            imageFloat 7s ease-in-out 950ms infinite;
          will-change: transform;
          backface-visibility: hidden;
        }

        .hero-image-1 {
          --tilt: -5deg;
          animation-delay: 120ms, 1070ms;
        }

        .hero-image-2 {
          --tilt: 4deg;
          animation-delay: 260ms, 1210ms;
        }

        .hero-image-3 {
          --tilt: 3deg;
          animation-delay: 400ms, 1350ms;
        }

        .hero-image-4 {
          --tilt: -3deg;
          animation-delay: 540ms, 1490ms;
        }

        .hero-image-5 {
          --tilt: -4deg;
          animation-delay: 680ms, 1630ms;
        }

        .hero-image-frame {
          transition:
            border-color 350ms ease,
            box-shadow 350ms ease,
            transform 450ms cubic-bezier(0.2, 0.75, 0.25, 1);
        }

        .hero-image-frame:hover {
          z-index: 60;
          border-color: rgba(167, 139, 250, 0.8);
          box-shadow: 0 30px 90px rgba(91, 33, 182, 0.32);
          transform: translateY(-9px) scale(1.045) !important;
        }

        .hero-image-frame img {
          transition: transform 800ms cubic-bezier(0.2, 0.75, 0.25, 1);
        }

        .hero-image-frame:hover img {
          transform: scale(1.12);
        }

        .hero-glow {
          animation: glowPulse 6s ease-in-out infinite;
        }

        .hero-orbit {
          animation: orbitSpin 22s linear infinite;
        }

        .hero-badge {
          animation: badgeBob 4s ease-in-out infinite;
        }

        .hero-gradient-text {
          background-size: 200% 200%;
          animation: gradientFlow 7s ease infinite;
        }

        .hero-cta-shine {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .hero-cta-shine::after {
          position: absolute;
          inset: 0 auto 0 0;
          width: 35%;
          content: "";
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.22),
            transparent
          );
          transform: translateX(-150%) skewX(-20deg);
          animation: shine 5s ease-in-out 2s infinite;
          pointer-events: none;
        }

        .feature-row {
          transition:
            padding 250ms ease,
            background-color 250ms ease;
        }

        .feature-row:hover {
          padding-left: 12px;
          padding-right: 12px;
        }

        .editorial-link svg {
          transition: transform 250ms ease;
        }

        .editorial-link:hover svg {
          transform: translateX(5px);
        }

        .quality-line {
          background-size: 200% 100%;
          animation: lineFlow 8s linear infinite;
        }

        .text-balance {
          text-wrap: balance;
        }

        @media (max-width: 1023px) {
          .hero-collage {
            min-height: 590px;
          }
        }

        @media (max-width: 639px) {
          .hero-collage {
            min-height: 425px;
          }

          .hero-image-1 img {
            height: 145px !important;
          }

          .hero-image-2 img {
            height: 125px !important;
          }

          .hero-image-3 img {
            height: 135px !important;
          }

          .hero-image-4 img {
            height: 135px !important;
          }

          .hero-image-5 img {
            height: 115px !important;
          }

          .hero-image-frame {
            border-radius: 16px;
            padding: 4px;
          }

          .hero-image-frame > div {
            border-radius: 12px;
          }

          .hero-image-frame:hover {
            transform: translateY(-4px) scale(1.015) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-reveal,
          .hero-image,
          .hero-glow,
          .hero-orbit,
          .hero-badge,
          .hero-gradient-text,
          .hero-cta-shine::after,
          .quality-line {
            animation: none !important;
            opacity: 1;
          }

          .hero-image {
            transform: rotate(var(--tilt, 0deg));
          }

          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-[#080b1a] dark:text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_18%,rgba(109,40,217,0.12),transparent_38%),radial-gradient(ellipse_at_85%_55%,rgba(8,145,178,0.09),transparent_40%)] dark:bg-[radial-gradient(ellipse_at_12%_18%,rgba(109,40,217,0.32),transparent_38%),radial-gradient(ellipse_at_85%_55%,rgba(8,145,178,0.20),transparent_40%),linear-gradient(125deg,#080b1a,#10102b_55%,#080b1a)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(rgba(100,116,139,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.8)_1px,transparent_1px)] [background-size:52px_52px] dark:opacity-[0.065] dark:[background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]"
        />

        <div
          aria-hidden="true"
          className="hero-glow absolute -right-36 top-20 -z-10 h-80 w-80 rounded-full bg-violet-500/15 blur-[110px] dark:bg-violet-600/30 sm:h-[450px] sm:w-[450px]"
        />

        <div
          aria-hidden="true"
          className="hero-glow absolute -bottom-36 left-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px] dark:bg-cyan-500/15"
        />

        <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:min-h-[740px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-3 lg:px-14 lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <div className="hero-reveal inline-flex max-w-full items-center gap-2 rounded-full border border-violet-300 bg-violet-100/80 px-3 py-2 text-[11px] font-semibold tracking-wide text-violet-800 dark:border-violet-400/30 dark:bg-violet-400/[0.08] dark:text-violet-200 sm:px-4 sm:text-sm">
              <Sparkles
                size={15}
                className="shrink-0 text-violet-600 dark:text-violet-400"
              />
              The smarter way to assess talent
              <span className="ml-1 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </div>

            <h1 className="hero-reveal hero-delay-1 mt-7 text-balance text-[clamp(2.7rem,6.3vw,5.6rem)] font-black leading-[1.04] tracking-[-0.055em]">
              Hire with
              <br />
              <span className="hero-gradient-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-300 dark:to-cyan-300">
                confidence.
              </span>
              <br />
              <span>Assess smarter.</span>
            </h1>

            <p className="hero-reveal hero-delay-2 mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:mt-7 sm:text-lg sm:leading-8">
              From technical assessments to candidate evaluation, bring your
              entire hiring workflow together in one beautifully organized
              platform.
            </p>

            <div className="hero-reveal hero-delay-3 mt-8 flex flex-col gap-3 min-[430px]:flex-row sm:mt-9">
              <Link
                href="/publishedAssessmentCards"
                className="hero-cta-shine group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/25 transition duration-300 hover:-translate-y-1 hover:bg-violet-500 sm:min-h-14 sm:px-7 sm:py-4 sm:text-base"
              >
                Explore Assessments
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <button
                type="button"
                onClick={handleGetStarted}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-800 transition duration-300 hover:border-violet-400 hover:bg-violet-50 dark:border-white/20 dark:text-white dark:hover:border-violet-300/70 dark:hover:bg-white/[0.06] sm:min-h-14 sm:px-7 sm:py-4 sm:text-base cursor-pointer"
              >
                Get Started
                <Zap size={17} className="text-cyan-600 dark:text-cyan-300" />
              </button>
            </div>

            <div className="hero-reveal hero-delay-4 mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-600 dark:text-slate-300 sm:mt-9 sm:gap-x-6 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-emerald-600 dark:text-emerald-400"
                />
                Structured assessments
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-emerald-600 dark:text-emerald-400"
                />
                Candidate tracking
              </span>
            </div>

            <div className="hero-reveal hero-delay-4 mt-9 flex items-center gap-4 border-t border-slate-200 pt-6 dark:border-white/10 sm:mt-12">
              <div className="flex -space-x-2">
                {[
                  { letter: "H", color: "bg-violet-600" },
                  { letter: "C", color: "bg-cyan-700" },
                  { letter: "D", color: "bg-emerald-700" },
                  { letter: "A", color: "bg-fuchsia-700" },
                ].map((item) => (
                  <span
                    key={item.letter}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-50 text-[10px] font-bold text-white dark:border-[#0b0d20] sm:h-9 sm:w-9 sm:text-xs ${item.color}`}
                  >
                    {item.letter}
                  </span>
                ))}
              </div>

              <p className="text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
                Built for companies and candidates
                <br />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  One workflow. Clearer decisions.
                </span>
              </p>
            </div>
          </div>

          {/* ANIMATED IMAGE COLLAGE */}
          <div className="hero-collage relative mx-auto mt-4 w-full max-w-[690px] sm:mt-8 lg:mt-0 lg:min-h-[650px]">
            <div
              aria-hidden="true"
              className="hero-glow absolute left-1/4 top-1/4 h-56 w-56 rounded-full bg-violet-500/15 blur-[90px] dark:bg-violet-600/30 sm:h-80 sm:w-80"
            />

            <div
              aria-hidden="true"
              className="hero-glow absolute bottom-8 right-0 h-52 w-52 rounded-full bg-cyan-500/10 blur-[90px] dark:bg-cyan-500/20 sm:h-72 sm:w-72"
            />

            <div
              aria-hidden="true"
              className="hero-orbit absolute left-[17%] top-[13%] h-[65%] w-[65%] rounded-full border border-dashed border-violet-400/20 dark:border-violet-400/15"
            />

            <div className="hero-image hero-image-1 hero-image-frame absolute left-[3%] top-[5%] z-10 w-[52%] rounded-2xl border border-violet-300/60 bg-white/80 p-1.5 shadow-2xl shadow-violet-900/10 backdrop-blur-sm dark:border-violet-300/30 dark:bg-white/[0.09] dark:shadow-violet-950/40 sm:rounded-3xl sm:p-2">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={gallery[0].src}
                  alt={gallery[0].alt}
                  loading="eager"
                  fetchPriority="high"
                  className="h-36 w-full object-cover sm:h-52 lg:h-56"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b20]/95 via-[#090b20]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3 sm:p-4">
                  <p className="text-[9px] font-bold tracking-[0.18em] text-violet-200 sm:text-[10px]">
                    {gallery[0].tag}
                  </p>
                  <p className="mt-1 text-xs font-bold text-white sm:text-sm">
                    {gallery[0].label}
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-image hero-image-2 hero-image-frame absolute right-[2%] top-[1%] z-20 w-[40%] rounded-2xl border border-cyan-300/60 bg-white/80 p-1.5 shadow-2xl shadow-cyan-900/10 backdrop-blur-sm dark:border-cyan-300/30 dark:bg-white/[0.09] dark:shadow-cyan-950/30 sm:rounded-3xl sm:p-2">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={gallery[1].src}
                  alt={gallery[1].alt}
                  loading="eager"
                  className="h-32 w-full object-cover sm:h-44 lg:h-48"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b20]/95 to-transparent" />
                <div className="absolute bottom-0 left-0 p-2.5 sm:p-3">
                  <p className="text-[8px] font-semibold tracking-widest text-cyan-200 sm:text-[9px]">
                    {gallery[1].tag}
                  </p>
                  <p className="mt-1 text-[10px] font-bold text-white sm:text-xs">
                    {gallery[1].label}
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-image hero-image-3 hero-image-frame absolute left-[0%] top-[40%] z-30 w-[44%] rounded-2xl border border-violet-300/60 bg-white/80 p-1.5 shadow-2xl shadow-violet-900/10 backdrop-blur-sm dark:border-violet-300/30 dark:bg-white/[0.09] dark:shadow-violet-950/30 sm:rounded-3xl sm:p-2">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={gallery[2].src}
                  alt={gallery[2].alt}
                  loading="eager"
                  className="h-36 w-full object-cover sm:h-48 lg:h-52"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b20]/95 to-transparent" />
                <div className="absolute bottom-0 left-0 p-2.5 sm:p-3">
                  <p className="text-[8px] font-semibold tracking-widest text-violet-200 sm:text-[9px]">
                    {gallery[2].tag}
                  </p>
                  <p className="mt-1 text-[10px] font-bold text-white sm:text-xs">
                    {gallery[2].label}
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-image hero-image-4 hero-image-frame absolute bottom-[7%] right-[0%] z-20 w-[49%] rounded-2xl border border-emerald-300/60 bg-white/80 p-1.5 shadow-2xl shadow-emerald-900/10 backdrop-blur-sm dark:border-emerald-300/30 dark:bg-white/[0.09] dark:shadow-emerald-950/25 sm:rounded-3xl sm:p-2">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={gallery[3].src}
                  alt={gallery[3].alt}
                  loading="eager"
                  className="h-36 w-full object-cover sm:h-48 lg:h-52"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b20]/95 to-transparent" />
                <div className="absolute bottom-0 left-0 p-2.5 sm:p-3">
                  <p className="text-[8px] font-semibold tracking-widest text-emerald-200 sm:text-[9px]">
                    {gallery[3].tag}
                  </p>
                  <p className="mt-1 text-[10px] font-bold text-white sm:text-xs">
                    {gallery[3].label}
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-image hero-image-5 hero-image-frame absolute bottom-[0%] left-[12%] z-40 w-[39%] rounded-2xl border border-slate-300/70 bg-white/80 p-1.5 shadow-2xl shadow-violet-900/10 backdrop-blur-sm dark:border-white/25 dark:bg-white/[0.09] dark:shadow-violet-950/40 sm:rounded-3xl sm:p-2">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={gallery[4].src}
                  alt={gallery[4].alt}
                  loading="eager"
                  className="h-32 w-full object-cover sm:h-40 lg:h-44"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b20]/95 to-transparent" />
                <div className="absolute bottom-0 left-0 p-2.5 sm:p-3">
                  <p className="text-[8px] font-semibold tracking-widest text-cyan-200 sm:text-[9px]">
                    {gallery[4].tag}
                  </p>
                  <p className="mt-1 text-[10px] font-bold text-white sm:text-xs">
                    {gallery[4].label}
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-badge absolute right-[1%] top-[39%] z-40 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-3 py-3 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-[#131832]/95 sm:flex lg:right-[-1%]">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                <ShieldCheck size={20} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Organized workflow
                </p>
                <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                  From creation to evaluation
                </p>
              </div>
            </div>

            <div className="hero-badge absolute left-[43%] top-[48%] z-40 flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-300/60 bg-violet-600/95 text-white shadow-xl shadow-violet-950/30 sm:h-14 sm:w-14">
              <Sparkles size={22} />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/10">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-5 py-4 sm:px-8 sm:py-5 lg:px-14">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-500 sm:text-xs sm:tracking-[0.18em]">
              Everything in one place
            </p>
            <Link
              href="#features"
              className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-violet-600 dark:text-slate-300 dark:hover:text-white"
            >
              Discover the platform <ArrowDown size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">
                What you can do
              </p>
              <h2 className="mt-5 max-w-xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Everything you need.
                <span className="block text-slate-400 dark:text-slate-500">
                  Nothing you don&apos;t.
                </span>
              </h2>
            </div>

            <p className="max-w-xl pb-2 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base lg:justify-self-end">
              A complete workspace for technical assessments, candidate
              management, evaluation, and reporting — thoughtfully connected
              from beginning to end.
            </p>
          </div>

          <div className="mt-12 border-t border-slate-200 dark:border-white/10 sm:mt-16">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.number}
                  className="feature-row group grid gap-3 border-b border-slate-200 py-6 dark:border-white/10 sm:grid-cols-[45px_42px_0.8fr_1.2fr_24px] sm:items-center sm:gap-5 sm:py-8 lg:grid-cols-[70px_60px_0.8fr_1.2fr_32px] lg:gap-6"
                >
                  <span className="text-xs font-semibold tracking-widest text-slate-400">
                    {feature.number}
                  </span>
                  <Icon
                    size={24}
                    strokeWidth={1.6}
                    className={`${feature.color} transition-transform duration-300 group-hover:scale-110`}
                  />
                  <h3 className="text-base font-bold tracking-tight sm:text-lg lg:text-xl">
                    {feature.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                  <ArrowRight
                    size={19}
                    className="hidden text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-500 sm:block"
                  />
                </article>
              );
            })}
          </div>

          <div className="mt-9">
            <Link
              href="/register"
              className="editorial-link inline-flex items-center gap-3 text-sm font-bold text-violet-600 dark:text-violet-400"
            >
              Explore all capabilities
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-200 transition hover:bg-violet-600 hover:text-white dark:border-violet-500/30">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* WORKFLOW - LIGHT/DARK MODE FIXED */}
      <section
        id="workflow"
        className="scroll-mt-20 border-y border-slate-200 bg-slate-50 px-5 py-20 text-slate-900 transition-colors duration-300 dark:border-white/10 dark:bg-[#0b0e20] dark:text-white sm:px-8 sm:py-24 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
                A simpler process
              </p>
              <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                From first question
                <span className="block text-slate-400 dark:text-slate-500">
                  to final decision.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base lg:justify-self-end">
              Keep every stage connected. Build your assessment, bring in
              candidates, and evaluate their work through one consistent
              process.
            </p>
          </div>

          <div className="relative mt-14 grid gap-12 sm:mt-20 md:grid-cols-3 md:gap-8">
            <div
              aria-hidden="true"
              className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-violet-500/70 via-cyan-400/70 to-emerald-400/70 md:block"
            />

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.number} className="relative">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white text-cyan-700 shadow-[0_0_35px_rgba(124,58,237,0.08)] dark:border-white/15 dark:bg-[#0b0e20] dark:text-cyan-300 dark:shadow-[0_0_35px_rgba(124,58,237,0.15)]">
                    <Icon size={23} strokeWidth={1.6} />
                  </div>

                  <p className="mt-8 text-xs font-bold tracking-[0.22em] text-violet-600 dark:text-violet-300">
                    STEP {step.number}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                    {step.title}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    {step.heading}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>

                  <div className="mt-7 flex items-center gap-3 text-xs text-slate-500">
                    <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
                    {index === 0
                      ? "Prepare"
                      : index === 1
                        ? "Connect"
                        : "Make decisions"}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">
              Why DevAssessment?
            </p>

            <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              More clarity.
              <span className="block text-slate-400 dark:text-slate-500">
                Better decisions.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:mt-7 sm:text-base">
              Bring assessments, candidates, submissions, and results into a
              unified workflow. Give your team more visibility throughout the
              technical evaluation process.
            </p>

            <Link
              href="/aboutPage"
              className="editorial-link mt-8 inline-flex items-center gap-3 rounded-full   px-6 py-4 text-sm font-semibold dark:text-white transition bg-violet-600 dark:text-slate-950 dark:hover:bg-violet-500 text-white"
            >
              Learn About Us <ArrowRight size={17} />
            </Link>
          </div>

          <div>
            <div className="mb-7 flex items-center gap-4 sm:mb-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                <ShieldCheck size={24} />
              </span>
              <div>
                <h3 className="text-lg font-bold">One organized workflow</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Designed around your assessment process
                </p>
              </div>
            </div>

            <ul className="border-t border-slate-200 dark:border-white/10">
              {benefits.map((benefit, index) => (
                <li
                  key={benefit}
                  className="flex items-center gap-4 border-b border-slate-200 py-4 dark:border-white/10 sm:py-5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Check size={15} strokeWidth={2.5} />
                  </span>

                  <span className="flex-1 text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">
                    {benefit}
                  </span>

                  <span className="text-xs font-medium text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* NEW SECTION 01: ASSESSMENT QUALITY & INSIGHTS */}
      <section className="relative isolate overflow-hidden border-y border-slate-200 bg-slate-50 px-5 py-20 transition-colors duration-300 dark:border-white/10 dark:bg-[#0b0e20] sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 -z-10 h-80 w-80 rounded-full bg-violet-500/[0.06] blur-[100px] dark:bg-violet-600/[0.12]"
        />

        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">
              Quality meets insight
            </p>

            <h2 className="mt-5 max-w-2xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Go beyond answers.
              <span className="block text-slate-400 dark:text-slate-500">
                Understand ability.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
              A technical assessment is more than a score. Organize questions,
              review candidate submissions, and bring meaningful evaluation
              information together to support better decisions.
            </p>

            <Link
              href="/publishedAssessmentCards"
              className="editorial-link mt-8 inline-flex items-center gap-3 text-sm font-bold text-violet-600 dark:text-violet-400"
            >
              Explore assessments
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-200 transition hover:bg-violet-600 hover:text-white dark:border-violet-500/30">
                <ArrowRight size={16} />
              </span>
            </Link>

            <div className="quality-line mt-10 h-px max-w-md bg-gradient-to-r from-violet-500 via-cyan-400 to-transparent sm:mt-12" />
          </div>

          <div>
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-6 dark:border-white/10 sm:mb-10 sm:pb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Assessment lifecycle
                </p>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                  From questions to insights
                </h3>
              </div>

              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                <TrendingUp size={24} />
              </span>
            </div>

            <div className="space-y-8 sm:space-y-10">
              {qualityPoints.map((point) => (
                <article
                  key={point.number}
                  className="group grid grid-cols-[44px_1fr] gap-4 sm:grid-cols-[54px_1fr] sm:gap-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 text-xs font-bold text-violet-700 transition-colors group-hover:bg-violet-600 group-hover:text-white dark:border-violet-400/30 dark:text-violet-300 sm:h-12 sm:w-12">
                    {point.number}
                  </span>

                  <div>
                    <h4 className="text-lg font-bold tracking-tight sm:text-xl">
                      {point.title}
                    </h4>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {point.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 02: SECURITY & TRANSPARENCY */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
                Built around your workflow
              </p>

              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Every role has
                <span className="block text-slate-400 dark:text-slate-500">
                  a clear purpose.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base lg:justify-self-end">
              Companies need tools to manage assessments. Candidates need a
              clear way to access assigned tests. Administrators need visibility
              into platform activity. DevAssessment brings these workflows
              together with role-based experiences.
            </p>
          </div>

          <div className="mt-12 border-t border-slate-200 dark:border-white/10 sm:mt-16">
            {securityPoints.map((point, index) => {
              const Icon = point.icon;

              return (
                <article
                  key={point.title}
                  className="feature-row group grid gap-4 border-b border-slate-200 py-7 dark:border-white/10 sm:grid-cols-[54px_0.8fr_1.2fr_24px] sm:items-center sm:gap-6 sm:py-9 lg:grid-cols-[70px_0.8fr_1.2fr_32px]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 transition-transform duration-300 group-hover:scale-105 dark:bg-cyan-400/10 dark:text-cyan-300">
                    <Icon size={23} strokeWidth={1.7} />
                  </span>

                  <div>
                    <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-slate-400 sm:text-xs">
                      PRINCIPLE / {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                      {point.title}
                    </h3>
                  </div>

                  <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {point.description}
                  </p>

                  <ArrowRight
                    size={19}
                    className="hidden text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-500 sm:block"
                  />
                </article>
              );
            })}
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              A more organized assessment experience for every participant.
            </p>

            <Link
              href="/aboutPage"
              className="editorial-link inline-flex shrink-0 items-center gap-3 text-sm font-bold text-cyan-700 dark:text-cyan-300"
            >
              Learn more about us <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* COMPANIES AND CANDIDATES */}
      <section className="border-y border-slate-200 bg-slate-50 px-5 py-20 transition-colors duration-300 dark:border-white/10 dark:bg-[#0b0e20] sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1320px]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">
            Made for both sides
          </p>

          <div className="mt-5 grid gap-7 lg:grid-cols-2 lg:items-end">
            <h2 className="max-w-2xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              One platform.
              <span className="block text-slate-400 dark:text-slate-500">
                Two experiences.
              </span>
            </h2>

            <p className="max-w-xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base lg:justify-self-end">
              Whether you are building a hiring pipeline or demonstrating your
              technical skills, get an experience designed for your role.
            </p>
          </div>

          <div className="mt-12 grid gap-12 sm:mt-16 md:grid-cols-2 md:gap-16">
            <article className="border-t-2 border-violet-500 pt-6 sm:pt-7">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                  <Users size={24} />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 sm:text-xs sm:tracking-[0.18em]">
                  For hiring teams
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-bold sm:text-3xl">
                For Companies
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-400">
                Create technical assessments, manage your question bank, invite
                candidates, evaluate submissions, and review results from your
                company workspace.
              </p>

              <Link
                href="/dashboard/company"
                className="editorial-link mt-7 inline-flex items-center gap-3 text-sm font-bold text-violet-600 dark:text-violet-400"
              >
                Get started as a company <ArrowRight size={17} />
              </Link>
            </article>

            <article className="border-t-2 border-cyan-500 pt-6 sm:pt-7">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                  <Code2 size={24} />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 sm:text-xs sm:tracking-[0.18em]">
                  For technical talent
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-bold sm:text-3xl">
                For Candidates
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-400">
                Discover published assessments, access the assessments assigned
                to you, submit your answers, and review available results.
              </p>

              <Link
                href="/publishedAssessmentCards"
                className="editorial-link mt-7 inline-flex items-center gap-3 text-sm font-bold text-cyan-700 dark:text-cyan-400"
              >
                Explore assessments <ArrowRight size={17} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-28">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 px-6 py-12 text-slate-950 transition-colors duration-300 dark:border-white/10 dark:bg-[#0b0e20] dark:text-white sm:rounded-[2rem] sm:px-12 sm:py-16 lg:px-20 lg:py-24">
          <div
            aria-hidden="true"
            className="hero-glow absolute -right-20 -top-32 h-64 w-64 rounded-full bg-violet-500/15 blur-[100px] dark:bg-violet-600/40 sm:h-80 sm:w-80"
          />

          <div
            aria-hidden="true"
            className="hero-glow absolute -bottom-36 left-[25%] h-64 w-64 rounded-full bg-cyan-500/10 blur-[110px] dark:bg-cyan-500/20 sm:h-80 sm:w-80"
          />

          <div className="relative grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-300">
                <Sparkles size={17} /> Your next step starts here
              </div>

              <h2 className="mt-6 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                Ready to assess
                <span className="hero-gradient-text block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-300 dark:to-cyan-300">
                  a little smarter?
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:mt-6 sm:text-base">
                Discover a more organized way to create assessments, evaluate
                technical skills, and manage the hiring workflow.
              </p>
            </div>

            <div className="flex flex-col gap-3 min-[430px]:flex-row lg:flex-col">
              <Link
                href="/register"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-500 sm:min-h-14 sm:px-7 sm:py-4 sm:text-base"
              >
                Create an Account
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contactPage"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-violet-400 hover:bg-violet-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10 sm:min-h-14 sm:px-7 sm:py-4 sm:text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-500 sm:mt-16 sm:flex-row sm:items-center sm:gap-5 sm:pt-7">
            <span>DevAssessment · Technical assessment platform</span>

            <Link
              href="/assessments"
              className="editorial-link inline-flex items-center gap-2 transition hover:text-violet-600 dark:hover:text-white"
            >
              Explore assessments <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
