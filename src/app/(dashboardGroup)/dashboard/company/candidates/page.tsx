"use client";

import {
  BriefcaseBusiness,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import { useGetCandidates } from "@/hooks";

export default function CompanyCandidatesPage() {
  const { data, isLoading, isError } = useGetCandidates();

  const candidates = Array.isArray(data?.data) ? data.data : [];

  const getInitials = (name: string) => {
    if (!name) return "U";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("");
  };

  const getProfileImage = (candidate: any) => {
    return (
      candidate?.profilePhoto ||
      candidate?.user?.profilePhoto ||
      candidate?.candidateProfile?.profilePhoto ||
      null
    );
  };

  const getName = (candidate: any) => {
    return candidate?.name || candidate?.user?.name || "Unknown Candidate";
  };

  const getEmail = (candidate: any) => {
    return (
      candidate?.email ||
      candidate?.user?.email ||
      candidate?.candidateProfile?.email ||
      "-"
    );
  };

  const getProfile = (candidate: any) => {
    return candidate?.candidateProfile || candidate;
  };

  const getSkills = (candidate: any): string[] => {
    const profile = getProfile(candidate);

    if (!Array.isArray(profile?.skills)) {
      return [];
    }

    return profile.skills.filter(
      (skill: unknown): skill is string =>
        typeof skill === "string" && skill.trim().length > 0,
    );
  };

  const getLink = (value: unknown): string | null => {
    if (typeof value !== "string") {
      return null;
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return null;
    }

    return trimmedValue;
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="rounded-xl border bg-background p-6">
          <p className="text-sm text-muted-foreground">Loading candidates...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            Failed to load candidates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Candidates</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View all candidates and their profile information.
          </p>
        </div>

        <div className="w-fit rounded-lg border bg-background px-4 py-2">
          <p className="text-xs text-muted-foreground">Total Candidates</p>

          <p className="text-xl font-bold">{candidates.length}</p>
        </div>
      </div>

      {/* Empty State */}
      {candidates.length === 0 ? (
        <div className="rounded-xl border bg-background p-10 text-center">
          <UserRound className="mx-auto h-10 w-10 text-muted-foreground" />

          <h2 className="mt-4 text-lg font-semibold">No candidates found</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            There are no candidates available right now.
          </p>
        </div>
      ) : (
        <>
          {/* ================= DESKTOP / TABLET ================= */}
          <div className="hidden overflow-hidden rounded-xl border bg-background md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] border-collapse">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      SI No.
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Candidate
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Email
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Phone
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Location
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Skills
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Experience
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Education
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Links
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {candidates.map((candidate: any, index: number) => {
                    const profile = getProfile(candidate);
                    const name = getName(candidate);
                    const email = getEmail(candidate);
                    const profileImage = getProfileImage(candidate);
                    const skills = getSkills(candidate);

                    const resumeUrl = getLink(profile?.resumeUrl);
                    const portfolioUrl = getLink(profile?.portfolioUrl);
                    const githubUrl = getLink(profile?.githubUrl);
                    const linkedinUrl = getLink(profile?.linkedinUrl);

                    const candidateId =
                      candidate?.id ||
                      candidate?.userId ||
                      candidate?.candidateId;

                    return (
                      <tr
                        key={candidateId}
                        className="border-b last:border-b-0 hover:bg-muted/30"
                      >
                        {/* SI NO */}
                        <td className="px-4 py-4 align-top text-sm font-medium">
                          {index + 1}
                        </td>

                        {/* CANDIDATE */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex min-w-[180px] items-center gap-3">
                            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border bg-muted">
                              {profileImage ? (
                                <img
                                  src={profileImage}
                                  alt={name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground">
                                  {getInitials(name)}
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold">{name}</p>

                              {profile?.bio && (
                                <p className="max-w-[180px] truncate text-xs text-muted-foreground">
                                  {profile.bio}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* EMAIL */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex min-w-[200px] items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />

                            <span className="break-all">{email}</span>
                          </div>
                        </td>

                        {/* PHONE */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex min-w-[150px] items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />

                            <span>{profile?.phone || "-"}</span>
                          </div>
                        </td>

                        {/* LOCATION */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex min-w-[130px] items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />

                            <span>{profile?.location || "-"}</span>
                          </div>
                        </td>

                        {/* SKILLS */}
                        <td className="px-4 py-4 align-top">
                          {skills.length > 0 ? (
                            <div className="flex max-w-[240px] flex-wrap gap-1.5">
                              {skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              -
                            </span>
                          )}
                        </td>

                        {/* EXPERIENCE */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex min-w-[100px] items-center gap-2 text-sm">
                            <BriefcaseBusiness className="h-4 w-4 shrink-0 text-muted-foreground" />

                            <span>
                              {profile?.experience !== undefined &&
                              profile?.experience !== null
                                ? `${profile.experience} ${
                                    Number(profile.experience) === 1
                                      ? "year"
                                      : "years"
                                  }`
                                : "-"}
                            </span>
                          </div>
                        </td>

                        {/* EDUCATION */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex min-w-[150px] items-start gap-2 text-sm">
                            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                            <span>{profile?.education || "-"}</span>
                          </div>
                        </td>

                        {/* LINKS */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex min-w-[180px] flex-col gap-2">
                            {resumeUrl && (
                              <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                              >
                                Resume
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}

                            {portfolioUrl && (
                              <a
                                href={portfolioUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                              >
                                Portfolio
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}

                            {githubUrl && (
                              <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                              >
                                GitHub
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}

                            {linkedinUrl && (
                              <a
                                href={linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
                              >
                                LinkedIn
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}

                            {!resumeUrl &&
                              !portfolioUrl &&
                              !githubUrl &&
                              !linkedinUrl && (
                                <span className="text-sm text-muted-foreground">
                                  No links
                                </span>
                              )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= MOBILE ================= */}
          <div className="space-y-4 md:hidden">
            {candidates.map((candidate: any, index: number) => {
              const profile = getProfile(candidate);
              const name = getName(candidate);
              const email = getEmail(candidate);
              const profileImage = getProfileImage(candidate);
              const skills = getSkills(candidate);

              const resumeUrl = getLink(profile?.resumeUrl);
              const portfolioUrl = getLink(profile?.portfolioUrl);
              const githubUrl = getLink(profile?.githubUrl);
              const linkedinUrl = getLink(profile?.linkedinUrl);

              const candidateId =
                candidate?.id || candidate?.userId || candidate?.candidateId;

              return (
                <div
                  key={candidateId}
                  className="overflow-hidden rounded-xl border bg-background"
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-3 border-b p-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border bg-muted">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground">
                          {getInitials(name)}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold">
                          #{index + 1}
                        </span>

                        <h2 className="truncate font-semibold">{name}</h2>
                      </div>

                      {profile?.bio && (
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {profile.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-4 p-4">
                    {/* Email */}
                    <div>
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>

                      <p className="break-all text-sm">{email}</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        Phone
                      </div>

                      <p className="text-sm">{profile?.phone || "-"}</p>
                    </div>

                    {/* Location */}
                    <div>
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Location
                      </div>

                      <p className="text-sm">{profile?.location || "-"}</p>
                    </div>

                    {/* Skills */}
                    <div>
                      <p className="mb-2 text-xs font-medium text-muted-foreground">
                        Skills
                      </p>

                      {skills.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          No skills added
                        </span>
                      )}
                    </div>

                    {/* Experience */}
                    <div>
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <BriefcaseBusiness className="h-4 w-4" />
                        Experience
                      </div>

                      <p className="text-sm">
                        {profile?.experience !== undefined &&
                        profile?.experience !== null
                          ? `${profile.experience} ${
                              Number(profile.experience) === 1
                                ? "year"
                                : "years"
                            }`
                          : "-"}
                      </p>
                    </div>

                    {/* Education */}
                    <div>
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        Education
                      </div>

                      <p className="text-sm">{profile?.education || "-"}</p>
                    </div>

                    {/* Links */}
                    <div>
                      <p className="mb-2 text-xs font-medium text-muted-foreground">
                        Links
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {resumeUrl && (
                          <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium hover:bg-muted"
                          >
                            Resume
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}

                        {portfolioUrl && (
                          <a
                            href={portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium hover:bg-muted"
                          >
                            Portfolio
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}

                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium hover:bg-muted"
                          >
                            GitHub
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}

                        {linkedinUrl && (
                          <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium hover:bg-muted"
                          >
                            LinkedIn
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}

                        {!resumeUrl &&
                          !portfolioUrl &&
                          !githubUrl &&
                          !linkedinUrl && (
                            <span className="text-sm text-muted-foreground">
                              No links available
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
