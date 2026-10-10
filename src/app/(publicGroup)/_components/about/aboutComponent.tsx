"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Code2,
  Target,
  Trophy,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BookOpenCheck,
    title: "Skill-Based Assessments",
    description:
      "Explore assessments designed to evaluate your technical knowledge and practical skills.",
  },
  {
    icon: Code2,
    title: "Real-World Challenges",
    description:
      "Practice coding, solve problems, and prepare yourself for real software development challenges.",
  },
  {
    icon: Target,
    title: "Clear Evaluation",
    description:
      "Understand your performance through assessment scores and feedback.",
  },
  {
    icon: Trophy,
    title: "Career Growth",
    description:
      "Identify your strengths, improve your weaknesses, and continue growing as a developer.",
  },
];

const benefits = [
  "Assess your technical skills",
  "Practice with structured challenges",
  "Track your assessment results",
  "Improve your problem-solving abilities",
];

export default function About() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-700/20" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-700/20" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
              <Sparkles size={16} />
              About DevAssessment
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Empowering Developers to{" "}
              <span className="text-violet-600 dark:text-violet-400">
                Grow and Succeed
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-400 sm:text-lg">
              DevAssessment is an assessment platform designed to help
              developers evaluate their skills, solve technical challenges,
              and prepare for the next stage of their careers.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/assessments"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-700"
              >
                Explore Assessments
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3.5 font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Our Mission
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Making Skill Assessment Simple and Meaningful
          </h2>

          <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
            We believe that understanding your skills is an important step
            toward professional growth. DevAssessment brings candidates and
            companies together through structured technical assessments.
          </p>

          <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
            Our goal is to make the assessment process more organized,
            transparent, and useful for both developers and hiring teams.
          </p>

          <ul className="mt-7 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-9">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                <Users size={24} />
              </div>
              <h3 className="font-bold">For Candidates</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Evaluate skills and improve technical knowledge.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <Target size={24} />
              </div>
              <h3 className="font-bold">For Companies</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Organize assessments and evaluate candidates.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <Code2 size={24} />
              </div>
              <h3 className="font-bold">Practical Learning</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Focus on knowledge and problem-solving.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-950">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                <Trophy size={24} />
              </div>
              <h3 className="font-bold">Career Growth</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Build confidence through continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              What We Offer
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Move Forward
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
              Tools and features designed to support assessment, evaluation,
              and professional development.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-violet-800"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-bold">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-violet-600 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Take Your Skills Further?
            </h2>

            <p className="mt-5 leading-7 text-violet-100">
              Explore available assessments and take the next step in
              your development journey with DevAssessment.
            </p>

            <Link
              href="/assessments"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}