"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Feedback = {
  type: "success" | "error";
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactItems = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email anytime.",
    value: "support@devassessment.com",
    href: "mailto:support@devassessment.com",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Contact our support team.",
    value: "Email us for assistance",
    href: "mailto:support@devassessment.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "Our typical support hours.",
    value: "Sunday – Thursday",
    href: undefined,
  },
  {
    icon: MapPin,
    title: "Our Platform",
    description: "Technical assessment platform.",
    value: "DevAssessment",
    href: undefined,
  },
];

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFeedback(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    const trimmedForm: ContactForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (
      !trimmedForm.name ||
      !trimmedForm.email ||
      !trimmedForm.subject ||
      !trimmedForm.message
    ) {
      setFeedback({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    if (trimmedForm.message.length < 10) {
      setFeedback({
        type: "error",
        message: "Your message must contain at least 10 characters.",
      });
      return;
    }

    // Contact API ekhono connect kora hoyni.
    setFeedback({
      type: "error",
      message:
        "Contact service is not connected yet. Please email support@devassessment.com directly.",
    });
  };

  const inputClass =
    "w-full min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-gray-700 dark:bg-gray-950 dark:text-white";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300";

  return (
    <main className="min-h-screen overflow-hidden bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-700/20" />

        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-700/20" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 md:px-8 md:py-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300 sm:text-sm">
            <Sparkles size={16} />
            Contact DevAssessment
          </div>

          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Let&apos;s Start a{" "}
            <span className="text-violet-600 dark:text-violet-400">
              Conversation
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base sm:leading-8 md:text-lg">
            Have a question, need support, or want to share feedback? We&apos;re
            here to help you get the most out of DevAssessment.
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 sm:py-14 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:py-20">
        {/* Contact Information */}
        <aside className="flex min-w-0 flex-col gap-6">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Get In Touch
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              We&apos;d Love to Hear From You
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
              Our team is here to help with platform questions, technical
              issues, and general inquiries.
            </p>
          </div>

          <div className="space-y-4">
            {contactItems.map((item) => {
              const Icon = item.icon;

              const card = (
                <div className="flex min-w-0 items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-violet-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-violet-800 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 sm:h-12 sm:w-12">
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold">{item.title}</h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>

                    <p className="mt-2 break-words text-sm font-semibold text-violet-600 dark:text-violet-400">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              if (item.href) {
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    {card}
                  </a>
                );
              }

              return <div key={item.title}>{card}</div>;
            })}
          </div>

          {/* Privacy Card */}
          <div className="rounded-2xl bg-violet-600 p-5 text-white sm:p-6">
            <div className="flex items-start gap-3">
              <div className="shrink-0 rounded-xl bg-white/15 p-3">
                <ShieldCheck size={24} />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold">Your Privacy Matters</h3>

                <p className="mt-2 text-sm leading-6 text-violet-100">
                  Never include passwords, access tokens, or other sensitive
                  account information in your message.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Contact Form */}
        <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:rounded-3xl sm:p-7 md:p-9">
          <div className="mb-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <MessageSquare size={24} />
            </div>

            <h2 className="text-2xl font-bold">Send Us a Message</h2>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Fill in the form below and tell us how we can help.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name and Email */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="name" className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  maxLength={100}
                  required
                />
              </div>

              <div className="min-w-0">
                <label htmlFor="email" className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  maxLength={254}
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject <span className="text-red-500">*</span>
              </label>

              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Assessment Issue">Assessment Issue</option>
                <option value="Company Partnership">
                  Company Partnership
                </option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClass}>
                Your Message <span className="text-red-500">*</span>
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} min-h-36 resize-y`}
                maxLength={3000}
                required
              />

              <p className="mt-2 text-right text-xs text-gray-500 dark:text-gray-400">
                {form.message.length}/3000 characters
              </p>
            </div>

            {/* Feedback */}
            {feedback && (
              <output
                aria-live="polite"
                className={`flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
                  feedback.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <MessageSquare
                    size={19}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                )}

                <span>{feedback.message}</span>
              </output>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 font-semibold text-white transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={17} />
                </>
              )}
            </button>

            <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
              Fields marked with <span className="text-red-500">*</span> are
              required.
            </p>
          </form>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center md:px-8">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Want to explore DevAssessment?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Discover assessments and take the next step in your journey.
            </p>
          </div>

          <a
            href="/assessments"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 sm:w-auto"
          >
            Browse Assessments
            <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </main>
  );
}