"use client";

import {
  Bell,
  Building2,
  Check,
  Eye,
  EyeOff,
  Globe,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

export default function CompanySettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [candidateNotifications, setCandidateNotifications] = useState(true);
  const [assessmentNotifications, setAssessmentNotifications] = useState(true);

  return (
    <div className="min-h-full bg-background p-4 sm:p-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        {/* =========================================
            PAGE HEADER
        ========================================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Settings
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your company profile, account and preferences.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-card shadow-sm">
            <Building2 className="h-5 w-5 text-blue-500" />
          </div>
        </div>

        {/* =========================================
            COMPANY PROFILE
        ========================================= */}
        <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="border-b bg-muted/20 px-4 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Building2 className="h-5 w-5 text-blue-500" />
              </div>

              <div>
                <h2 className="font-semibold">Company Profile</h2>

                <p className="text-sm text-muted-foreground">
                  Update your company information.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-4 sm:p-6">
            {/* Company Name */}
            <div className="space-y-2">
              <label
                htmlFor="companyName"
                className="text-sm font-medium"
              >
                Company Name
              </label>

              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="companyName"
                  type="text"
                  defaultValue="DevAssessment Company"
                  placeholder="Enter company name"
                  className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="companyEmail"
                  className="text-sm font-medium"
                >
                  Company Email
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="companyEmail"
                    type="email"
                    defaultValue="company@example.com"
                    placeholder="company@example.com"
                    className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium"
                >
                  Phone
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="phone"
                    type="tel"
                    defaultValue="+880 1700-000000"
                    placeholder="+880 1XXXXXXXXX"
                    className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="space-y-2">
                <label
                  htmlFor="website"
                  className="text-sm font-medium"
                >
                  Website
                </label>

                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="website"
                    type="url"
                    defaultValue="https://example.com"
                    placeholder="https://example.com"
                    className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="text-sm font-medium"
                >
                  Location
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="location"
                    type="text"
                    defaultValue="Dhaka, Bangladesh"
                    placeholder="Company location"
                    className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium"
              >
                Company Description
              </label>

              <textarea
                id="description"
                rows={4}
                defaultValue="We create modern assessment solutions for companies and candidates."
                placeholder="Write something about your company..."
                className="w-full resize-none rounded-lg border bg-background p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Save */}
            <div className="flex justify-end border-t pt-5">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </section>

        {/* =========================================
            ACCOUNT INFORMATION
        ========================================= */}
        <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="border-b bg-muted/20 px-4 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                <User className="h-5 w-5 text-violet-500" />
              </div>

              <div>
                <h2 className="font-semibold">Account Information</h2>

                <p className="text-sm text-muted-foreground">
                  Manage your account information.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium"
              >
                Account Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="name"
                  type="text"
                  defaultValue="Company Admin"
                  className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="accountEmail"
                className="text-sm font-medium"
              >
                Account Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="accountEmail"
                  type="email"
                  defaultValue="admin@example.com"
                  className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECURITY
        ========================================= */}
        <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="border-b bg-muted/20 px-4 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Shield className="h-5 w-5 text-emerald-500" />
              </div>

              <div>
                <h2 className="font-semibold">Security</h2>

                <p className="text-sm text-muted-foreground">
                  Keep your account secure.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-4 sm:p-6">
            {/* Current Password */}
            <div className="space-y-2">
              <label
                htmlFor="currentPassword"
                className="text-sm font-medium"
              >
                Current Password
              </label>

              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  className="h-11 w-full rounded-lg border bg-background pl-10 pr-11 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* New Password */}
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium"
                >
                  New Password
                </label>

                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="h-11 w-full rounded-lg border bg-background pl-10 pr-11 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(!showNewPassword)
                    }
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm New Password
                </label>

                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="h-11 w-full rounded-lg border bg-background pl-10 pr-11 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t pt-5">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                <Shield className="h-4 w-4" />
                Update Password
              </button>
            </div>
          </div>
        </section>

        {/* =========================================
            NOTIFICATIONS
        ========================================= */}
        <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="border-b bg-muted/20 px-4 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Bell className="h-5 w-5 text-amber-500" />
              </div>

              <div>
                <h2 className="font-semibold">Notifications</h2>

                <p className="text-sm text-muted-foreground">
                  Choose which notifications you want to receive.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {/* Email Notifications */}
            <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
              <div className="min-w-0">
                <p className="font-medium">Email Notifications</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Receive important updates through email.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEmailNotifications(!emailNotifications)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  emailNotifications
                    ? "bg-blue-600"
                    : "bg-muted-foreground/30"
                }`}
                aria-label="Toggle email notifications"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    emailNotifications
                      ? "left-[22px]"
                      : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Candidate Notifications */}
            <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
              <div className="min-w-0">
                <p className="font-medium">
                  Candidate Notifications
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Get notified when candidates take action.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setCandidateNotifications(!candidateNotifications)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  candidateNotifications
                    ? "bg-blue-600"
                    : "bg-muted-foreground/30"
                }`}
                aria-label="Toggle candidate notifications"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    candidateNotifications
                      ? "left-[22px]"
                      : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Assessment Notifications */}
            <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
              <div className="min-w-0">
                <p className="font-medium">
                  Assessment Notifications
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Receive updates about your assessments.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setAssessmentNotifications(
                    !assessmentNotifications,
                  )
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  assessmentNotifications
                    ? "bg-blue-600"
                    : "bg-muted-foreground/30"
                }`}
                aria-label="Toggle assessment notifications"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    assessmentNotifications
                      ? "left-[22px]"
                      : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================
            DANGER ZONE
        ========================================= */}
        <section className="overflow-hidden rounded-2xl border border-red-200 bg-card shadow-sm dark:border-red-900/50">
          <div className="border-b border-red-200 bg-red-50/50 px-4 py-5 dark:border-red-900/50 dark:bg-red-950/20 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>

              <div>
                <h2 className="font-semibold text-red-600 dark:text-red-400">
                  Danger Zone
                </h2>

                <p className="text-sm text-muted-foreground">
                  Irreversible and destructive actions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="font-medium">Delete Company Account</p>

              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Permanently delete your company account and all
                associated data. This action cannot be undone.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-red-300 px-4 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </button>
          </div>
        </section>

        {/* =========================================
            BOTTOM INFO
        ========================================= */}
        <div className="flex items-center justify-center gap-2 pb-4 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span>Your settings are stored securely.</span>
        </div>
      </div>
    </div>
  );
}