 
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  UserRound,
  Camera,
  FileText,
  MapPin,
  Phone,
  Code2,
  GraduationCap,
  BriefcaseBusiness,
  Globe,
  CheckCircle2,
  AlertCircle,
  Upload,
  Save,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useUpdateCandidateProfile } from "@/hooks";
import { toast } from "@/components/ui/toast";

type CandidateProfile = {
  bio?: string | null;
  phone?: string | null;
  location?: string | null;
  skills?: string[] | null;
  experience?: number | null;
  education?: string | null;
  resumeUrl?: string | null;
  portfolioUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
};

type UserProfile = {
  name?: string | null;
  profilePhoto?: string | null;
  candidateProfile?: CandidateProfile | null;
};

export default function UpdateProfile() {
  const { mutateAsync, isPending } = useUpdateCandidateProfile();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("0");
  const [education, setEducation] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Existing profile photo URL from the backend
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState("");
  const [currentResumeUrl, setCurrentResumeUrl] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  // Load the existing profile from the backend
  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!baseUrl) {
          throw new Error("API base URL is not configured.");
        }

        const response = await fetch(`${baseUrl}/users/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load your profile.");
        }

        const result = await response.json();

        // Supports both { data: user } and { data: { data: user } }
        const user: UserProfile = result?.data?.data ?? result?.data ?? result;

        if (cancelled) return;

        const candidate = user?.candidateProfile;

        setName(user?.name ?? "");
        setCurrentProfilePhoto(user?.profilePhoto ?? "");
        setCurrentResumeUrl(candidate?.resumeUrl ?? "");

        setBio(candidate?.bio ?? "");
        setPhone(candidate?.phone ?? "");
        setLocation(candidate?.location ?? "");
        setSkills(candidate?.skills?.join(", ") ?? "");
        setExperience(String(candidate?.experience ?? 0));
        setEducation(candidate?.education ?? "");
        setPortfolioUrl(candidate?.portfolioUrl ?? "");
        setGithubUrl(candidate?.githubUrl ?? "");
        setLinkedinUrl(candidate?.linkedinUrl ?? "");
      } catch (error) {
        if (!cancelled) {
          const errorText =
            error instanceof Error
              ? error.message
              : "Failed to load your profile.";

          setErrorMessage(errorText);

          toast.add({
            title: "Profile loading failed",
            description: errorText,
            type: "error",
          });
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  // Preview the newly selected image
  useEffect(() => {
    if (!profilePhoto) {
      setPhotoPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(profilePhoto);
    setPhotoPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [profilePhoto]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!name.trim()) {
      const errorText = "Please enter your full name.";
      setErrorMessage(errorText);

      toast.add({
        title: "Validation error",
        description: errorText,
        type: "error",
      });

      return;
    }

    if (profilePhoto && profilePhoto.size > 5 * 1024 * 1024) {
      const errorText = "Profile photo must be smaller than 5 MB.";
      setErrorMessage(errorText);

      toast.add({
        title: "Profile photo too large",
        description: errorText,
        type: "error",
      });

      return;
    }

    if (profilePhoto && !profilePhoto.type.startsWith("image/")) {
      const errorText = "Please select a valid image.";
      setErrorMessage(errorText);

      toast.add({
        title: "Invalid profile photo",
        description: errorText,
        type: "error",
      });

      return;
    }

    if (resumeFile) {
      if (resumeFile.type !== "application/pdf") {
        const errorText = "Resume must be a PDF file.";
        setErrorMessage(errorText);

        toast.add({
          title: "Invalid resume file",
          description: errorText,
          type: "error",
        });

        return;
      }

      if (resumeFile.size > 5 * 1024 * 1024) {
        const errorText = "Resume must be smaller than 5 MB.";
        setErrorMessage(errorText);

        toast.add({
          title: "Resume file too large",
          description: errorText,
          type: "error",
        });

        return;
      }
    }

    try {
      const formData = new FormData();

      formData.append("name", name.trim());

      formData.append(
        "candidateProfile",
        JSON.stringify({
          bio,
          phone,
          location,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          experience: Number(experience),
          education,
          portfolioUrl,
          githubUrl,
          linkedinUrl,
        }),
      );

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      }

      const response = await mutateAsync(formData as any);

      // Read the updated photo URL returned by the API.
      // Also supports API clients that unwrap response.data.
      const updatedUser: UserProfile =
        response?.data?.data ?? response?.data ?? response;

      if (updatedUser?.profilePhoto) {
        setCurrentProfilePhoto(updatedUser.profilePhoto);
      } else if (profilePhoto) {
        // The upload succeeded, but the response did not contain the URL.
        // Reload the saved URL from the backend.
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (baseUrl) {
          const profileResponse = await fetch(`${baseUrl}/users/me`, {
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          });

          if (profileResponse.ok) {
            const profileResult = await profileResponse.json();

            const savedUser: UserProfile =
              profileResult?.data?.data ?? profileResult?.data ?? profileResult;

            if (savedUser?.profilePhoto) {
              setCurrentProfilePhoto(savedUser.profilePhoto);
            }
          }
        }
      }

      if (updatedUser?.candidateProfile?.resumeUrl) {
        setCurrentResumeUrl(updatedUser.candidateProfile.resumeUrl);
      }

      setMessage("Profile updated successfully!");
      setProfilePhoto(null);
      setResumeFile(null);

      toast.add({
        title: "Profile updated",
        description: "Your profile has been updated successfully!",
        type: "success",
      });
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Failed to update profile.";

      setErrorMessage(errorText);

      toast.add({
        title: "Profile update failed",
        description: errorText,
        type: "error",
      });
    }
  };

  const inputClass =
    "w-full min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:hover:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500/10";

  const labelClass =
    "mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200";

  const sectionClass =
    "rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-950";

  return (
    <main className="min-h-screen   px-3 py-6 transition-colors sm:px-6 sm:py-8 lg:px-8  ">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500" />

          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <UserRound size={25} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
                    Update Profile
                  </h1>

                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                    <Sparkles size={12} />
                    Candidate
                  </span>
                </div>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Manage your personal information, professional skills, profile
                  photo and resume.
                </p>
              </div>
            </div>

            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 sm:flex dark:bg-indigo-500/10 dark:text-indigo-300">
              <UserRound size={32} />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Photo */}
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                <Camera size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Profile Photo
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Choose a professional profile picture.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                {photoPreview || currentProfilePhoto ? (
                  <Image
                    src={photoPreview || currentProfilePhoto}
                    alt="Profile preview"
                    width={112}
                    height={112}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound
                    size={42}
                    className="text-gray-400 dark:text-gray-600"
                  />
                )}
              </div>

              <div className="w-full flex-1">
                <label
                  className={`${labelClass} cursor-pointer`}
                  htmlFor="profilePhoto"
                >
                  <Upload size={16} />
                  Upload a photo
                </label>

                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setProfilePhoto(event.target.files?.[0] ?? null)
                  }
                  className={`${inputClass} cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-blue-700 dark:file:bg-blue-500/10 dark:file:text-blue-300`}
                />

                <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  JPG, PNG or another image format. Maximum file size: 5 MB.
                </p>

                {profilePhoto && (
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <p className="break-all text-xs text-green-600 dark:text-green-400">
                      Selected: {profilePhoto.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => setProfilePhoto(null)}
                      className="text-xs font-semibold text-red-600 hover:underline dark:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Personal Information
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Update your basic information.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="bio">
                  Professional Bio
                </label>

                <textarea
                  id="bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Describe yourself in a few sentences..."
                  rows={4}
                  className={`${inputClass} resize-y`}
                />

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Write a short introduction about yourself.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="phone">
                    <Phone size={15} />
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+8801XXXXXXXXX"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="location">
                    <MapPin size={15} />
                    Location
                  </label>

                  <input
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Dhaka, Bangladesh"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Professional Information */}
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Professional Information
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Highlight your skills, experience and education.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="skills">
                  <Code2 size={15} />
                  Skills
                </label>

                <input
                  id="skills"
                  value={skills}
                  onChange={(event) => setSkills(event.target.value)}
                  placeholder="JavaScript, TypeScript, React, Node.js"
                  className={inputClass}
                />

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Separate each skill with a comma.
                </p>

                {skills.trim() && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter(Boolean)
                      .map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="experience">
                    <BriefcaseBusiness size={15} />
                    Experience (years)
                  </label>

                  <input
                    id="experience"
                    type="number"
                    min="0"
                    step="1"
                    value={experience}
                    onChange={(event) => setExperience(event.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="education">
                    <GraduationCap size={15} />
                    Education
                  </label>

                  <input
                    id="education"
                    value={education}
                    onChange={(event) => setEducation(event.target.value)}
                    placeholder="B.Sc in CSE"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Resume Upload */}
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                <FileText size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Resume / CV
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Upload your latest resume in PDF format.
                </p>
              </div>
            </div>

            <label
              htmlFor="resumeFile"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-500 dark:hover:bg-blue-500/5"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-gray-800 dark:text-blue-400">
                <Upload size={22} />
              </div>

              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Click to select your resume
              </p>

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                PDF only · Maximum 5 MB
              </p>

              <input
                id="resumeFile"
                type="file"
                accept=".pdf,application/pdf"
                onChange={(event) =>
                  setResumeFile(event.target.files?.[0] ?? null)
                }
                className="sr-only"
              />
            </label>

            {resumeFile && (
              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-green-200 bg-green-50 p-3 sm:flex-row sm:items-center sm:justify-between dark:border-green-900/50 dark:bg-green-950/30">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-green-600 dark:bg-gray-900 dark:text-green-400">
                    <FileText size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="break-all text-sm font-medium text-gray-800 dark:text-gray-100">
                      {resumeFile.name}
                    </p>

                    <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                      {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setResumeFile(null)}
                  className="self-start text-xs font-semibold text-red-600 hover:underline sm:self-center dark:text-red-400"
                >
                  Remove
                </button>
              </div>
            )}

            {!resumeFile && currentResumeUrl && (
              <p className="mt-3 break-all text-sm text-green-700 dark:text-green-400">
                Existing resume is saved. Select a new PDF only if you want to
                replace it.
              </p>
            )}

            <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
              Leave empty if you do not want to upload a new resume.
            </p>
          </section>

          {/* Social Links */}
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Globe size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Portfolio & Social Links
                </h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Help employers explore your work online.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="portfolioUrl">
                  <Globe size={15} />
                  Portfolio URL
                </label>

                <input
                  id="portfolioUrl"
                  type="url"
                  value={portfolioUrl}
                  onChange={(event) => setPortfolioUrl(event.target.value)}
                  placeholder="https://yourportfolio.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="githubUrl">
                  <FaGithub size={15} />
                  GitHub URL
                </label>

                <input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(event) => setGithubUrl(event.target.value)}
                  placeholder="https://github.com/username"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="linkedinUrl">
                  <FaLinkedin size={15} />
                  LinkedIn URL
                </label>

                <input
                  id="linkedinUrl"
                  type="url"
                  value={linkedinUrl}
                  onChange={(event) => setLinkedinUrl(event.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Success Message */}
          {message && (
            <output className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-300">
              <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
              <span>{message}</span>
            </output>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
            >
              <AlertCircle size={20} className="mt-0.5 shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="sticky bottom-0 z-10 -mx-3 border-t border-gray-200 bg-white/95 p-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none dark:border-gray-800 dark:bg-gray-950/95 sm:dark:bg-transparent">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Updating Profile...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Profile
                </>
              )}
            </button>

            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              Review your information before saving.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
