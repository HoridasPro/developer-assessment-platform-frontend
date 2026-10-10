
"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  CreditCard,
  FileText,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "Assessment Management",
    description:
      "Create, organize, publish, and manage technical assessments from one dashboard.",
    color: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  },
  {
    icon: Code2,
    title: "Problem Bank",
    description:
      "Build a reusable question bank with MCQ, coding, and written questions.",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  },
  {
    icon: Users,
    title: "Candidate Management",
    description:
      "Invite candidates, manage invitations, and track their assessment progress.",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    icon: Target,
    title: "Evaluation & Scoring",
    description:
      "Review submitted answers, evaluate responses, and track assessment scores.",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  },
  {
    icon: BarChart3,
    title: "Performance Reports",
    description:
      "Review candidate performance and assessment results in one place.",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Manage assessment payments through the platform's payment workflow.",
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300",
  },
];

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Create an Assessment",
    description:
      "Companies create assessments and add questions from their problem bank.",
  },
  {
    number: "02",
    icon: Users,
    title: "Invite Candidates",
    description:
      "Invite candidates and let them access their assigned assessments.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Evaluate Results",
    description:
      "Review submissions, evaluate answers, and analyze candidate performance.",
  },
];

const benefits = [
  "Centralized assessment management",
  "Reusable technical question bank",
  "Candidate invitation tracking",
  "Assessment submission and evaluation",
  "Performance reporting",
  "Company and candidate dashboards",
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* 1. Hero Banner */}
      <section className="relative isolate overflow-hidden bg-[#080d24] text-white">
        {/* Decorative banner background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_20%,rgba(124,58,237,0.32),transparent_45%),radial-gradient(ellipse_at_90%_65%,rgba(6,182,212,0.18),transparent_40%),linear-gradient(135deg,#080d24_0%,#11163b_55%,#080d24_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />

        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:px-8 lg:grid-cols-2 lg:gap-10 lg:py-24">
          {/* Hero Content */}
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-200">
              <Sparkles size={16} />
              Smarter Technical Assessments
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Hire Better.
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Assess Smarter.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Create technical assessments, invite candidates, evaluate
              submissions, and track performance with DevAssessment — your
              platform for a smarter hiring workflow.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/assessments"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              >
                Explore Assessments
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              >
                Get Started
                <Zap size={17} />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-400" />
                Structured Assessments
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-400" />
                Candidate Tracking
              </span>
            </div>
          </div>

          {/* Hero Dashboard Illustration */}
          <div className="relative mx-auto w-full max-w-xl">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] bg-violet-500/20 blur-3xl"
            />

            <div className="relative rounded-2xl border border-white/15 bg-white/[0.07] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5">
              <div className="rounded-xl border border-white/10 bg-[#0d1430] p-4 sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                      <Code2 size={22} />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Assessment Overview
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Company Dashboard
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Dashboard
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-400">
                        Assessments
                      </span>
                      <ClipboardCheck
                        size={17}
                        className="text-violet-300"
                      />
                    </div>
                    <p className="mt-3 text-2xl font-bold">Manage</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Create & publish
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-400">
                        Candidates
                      </span>
                      <Users size={17} className="text-cyan-300" />
                    </div>
                    <p className="mt-3 text-2xl font-bold">Track</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Invitations & attempts
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">Assessment Workflow</p>
                      <p className="mt-1 text-xs text-slate-400">
                        From creation to evaluation
                      </p>
                    </div>

                    <BarChart3 size={22} className="text-violet-300" />
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      {
                        title: "Create Assessment",
                        detail: "Configure questions",
                        width: "w-full",
                        color: "bg-violet-400",
                      },
                      {
                        title: "Invite Candidates",
                        detail: "Share invitations",
                        width: "w-4/5",
                        color: "bg-cyan-400",
                      },
                      {
                        title: "Evaluate Submissions",
                        detail: "Review candidate answers",
                        width: "w-3/5",
                        color: "bg-emerald-400",
                      },
                    ].map((item) => (
                      <div key={item.title}>
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-medium text-slate-200">
                            {item.title}
                          </span>
                          <span className="text-slate-400">
                            {item.detail}
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full ${item.width} ${item.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-emerald-200">
                      One Organized Workflow
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Manage assessments and results in one platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 top-12 hidden items-center gap-3 rounded-xl border border-white/15 bg-[#151b3d] p-3 shadow-xl sm:flex md:-right-5">
              <div className="rounded-lg bg-cyan-400/15 p-2 text-cyan-300">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">Problem Bank</p>
                <p className="text-xs text-slate-400">
                  Reusable questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Features */}
      <section className="px-4 py-20 sm:px-6 md:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              Platform Features
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything You Need to Assess Talent
            </h2>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              A centralized workflow for technical assessments, candidate
              management, evaluation, and reporting.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                  >
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-600 transition group-hover:gap-3 dark:text-violet-400">
                    Built for your workflow
                    <ArrowRight size={16} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 md:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              How It Works
            </p>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Three Steps to a Better Hiring Workflow
            </h2>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              Organize the assessment process from start to finish.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                      <Icon size={23} />
                    </div>

                    <span className="text-4xl font-black text-slate-100 dark:text-slate-800">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Benefits */}
      <section className="px-4 py-20 sm:px-6 md:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              Why DevAssessment?
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Spend Less Time Managing Tests. Focus More on Talent.
            </h2>

            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
              Keep your assessment workflow organized with tools designed for
              companies and candidates. Manage questions, invitations,
              submissions, and evaluations through a unified experience.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Learn About Us
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                <CheckCircle2 size={24} />
              </div>

              <div>
                <h3 className="text-lg font-bold">A More Organized Process</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Key platform capabilities
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Company and Candidate */}
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 md:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              Made for Both Sides
            </p>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              One Platform, Two Experiences
            </h2>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              Whether you are hiring talent or proving your skills,
              DevAssessment helps keep the process organized.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-violet-200 bg-white p-7 sm:p-9 dark:border-violet-900 dark:bg-slate-950">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                <Users size={27} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">For Companies</h3>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                Build assessments, organize your question bank, invite
                candidates, evaluate submissions, and review results.
              </p>

              <Link
                href="/register"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
              >
                Get Started as a Company
                <ArrowRight size={18} />
              </Link>
            </article>

            <article className="rounded-2xl border border-cyan-200 bg-white p-7 sm:p-9 dark:border-cyan-900 dark:bg-slate-950">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                <Code2 size={27} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">For Candidates</h3>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                Access assigned assessments, complete questions, submit your
                answers, and review available results.
              </p>

              <Link
                href="/assessments"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-700 hover:text-cyan-800 dark:text-cyan-400"
              >
                Explore Assessments
                <ArrowRight size={18} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="px-4 py-20 sm:px-6 md:px-8 lg:py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-indigo-700 to-slate-900 px-6 py-14 text-center text-white sm:px-12 sm:py-16 lg:px-20 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <Sparkles size={27} />
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Ready to Make Assessments Simpler?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-violet-100">
              Start exploring DevAssessment and discover a more organized
              way to manage technical assessments.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-violet-800 transition hover:bg-violet-50"
              >
                Create an Account
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
