"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  Camera,
  Globe,
  Building2,
  FileText,
  UserRound,
  LoaderCircle,
  Save,
  CheckCircle2,
  AlertCircle,
  Upload,
  Sparkles,
} from "lucide-react";

import { useUpdateCompanyProfile } from "@/hooks";
import { toast } from "@/components/ui/toast";

type CompanyProfile = {
  companyName?: string | null;
  description?: string | null;
  website?: string | null;
};

type UserProfile = {
  name?: string | null;
  profilePhoto?: string | null;
  companyProfile?: CompanyProfile | null;
};

type ApiResponse = {
  data?: unknown;
};

function extractProfile(result: unknown): UserProfile {
  let value: unknown = result;

  for (let i = 0; i < 3; i++) {
    if (!value || typeof value !== "object" || !("data" in value)) {
      break;
    }

    const nested = (value as ApiResponse).data;

    if (!nested || typeof nested !== "object") {
      break;
    }

    value = nested;
  }

  return value as UserProfile;
}

const inputClass =
  "w-full min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:hover:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500/10";

const labelClass =
  "mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200";

const sectionClass =
  "rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900";

export default function UpdateCompanyProfile() {
  const mutation = useUpdateCompanyProfile();

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  const [currentPhoto, setCurrentPhoto] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load company profile
  useEffect(() => {
    let active = true;

    async function loadProfile() {
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
          throw new Error("Failed to load company profile.");
        }

        const result: unknown = await response.json();
        const user = extractProfile(result);

        if (!active) return;

        setName(user.name ?? "");
        setCurrentPhoto(user.profilePhoto ?? "");
        setCompanyName(user.companyProfile?.companyName ?? "");
        setDescription(user.companyProfile?.description ?? "");
        setWebsite(user.companyProfile?.website ?? "");
      } catch (err) {
        if (active) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Failed to load company profile.";

          setError(errorMessage);

          toast.add({
            title: "Failed to load company profile",
            description: errorMessage,
            type: "error",
          });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      active = false;
    };
  }, []);

  // Preview selected photo
  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(photoFile);
    setPhotoPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [photoFile]);

  // Photo validation
  const handlePhotoChange = (file?: File) => {
    setError("");
    setMessage("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      const errorMessage = "Please select a valid image.";

      setError(errorMessage);

      toast.add({
        title: "Invalid image",
        description: errorMessage,
        type: "error",
      });

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      const errorMessage = "Profile photo must be smaller than 5 MB.";

      setError(errorMessage);

      toast.add({
        title: "File too large",
        description: errorMessage,
        type: "error",
      });

      return;
    }

    setPhotoFile(file);
  };

  // Submit profile
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!name.trim()) {
      const errorMessage = "Please enter the contact person's name.";

      setError(errorMessage);

      toast.add({
        title: "Validation error",
        description: errorMessage,
        type: "error",
      });

      return;
    }

    if (!companyName.trim()) {
      const errorMessage = "Please enter the company name.";

      setError(errorMessage);

      toast.add({
        title: "Validation error",
        description: errorMessage,
        type: "error",
      });

      return;
    }

    if (website.trim()) {
      try {
        const parsedUrl = new URL(website.trim());

        if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
          const errorMessage = "Please enter a valid company website URL.";

          setError(errorMessage);

          toast.add({
            title: "Invalid website URL",
            description: errorMessage,
            type: "error",
          });

          return;
        }
      } catch {
        const errorMessage = "Please enter a valid company website URL.";

        setError(errorMessage);

        toast.add({
          title: "Invalid website URL",
          description: errorMessage,
          type: "error",
        });

        return;
      }
    }

    try {
      const formData = new FormData();

      formData.append("name", name.trim());

      formData.append(
        "companyProfile",
        JSON.stringify({
          companyName: companyName.trim(),
          description: description.trim(),
          website: website.trim(),
        }),
      );

      if (photoFile) {
        formData.append("profilePhoto", photoFile);
      }

      const result: unknown = await mutation.mutateAsync(formData);

      const updatedUser = extractProfile(result);

      if (updatedUser.profilePhoto) {
        setCurrentPhoto(updatedUser.profilePhoto);
      } else if (photoFile) {
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
          throw new Error("Failed to refresh company profile.");
        }

        const refreshedResult: unknown = await response.json();
        const refreshedUser = extractProfile(refreshedResult);

        setCurrentPhoto(refreshedUser.profilePhoto ?? "");
      }

      setPhotoFile(null);
      setMessage("Company profile updated successfully!");

      toast.add({
        title: "Profile updated",
        description: "Company profile updated successfully!",
        type: "success",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to update company profile.";

      setError(errorMessage);

      toast.add({
        title: "Update failed",
        description: errorMessage,
        type: "error",
      });
    }
  };

  const displayedPhoto = photoPreview || currentPhoto;

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <LoaderCircle
              size={22}
              className="animate-spin text-blue-600 dark:text-blue-400"
            />

            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Loading company profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-3 py-6 transition-colors sm:px-6 sm:py-8 lg:px-8 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <header className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500" />

          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Building2 size={25} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
                    Update Company Profile
                  </h1>

                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                    <Sparkles size={12} />
                    Company
                  </span>
                </div>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Manage your company information, profile photo, description
                  and website.
                </p>
              </div>
            </div>

            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 sm:flex dark:bg-indigo-500/10 dark:text-indigo-300">
              <Building2 size={32} />
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Photo */}
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                <Camera size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Company Profile Photo
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Choose a company logo or profile picture.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-950">
                {displayedPhoto ? (
                  <Image
                    src={displayedPhoto}
                    alt="Company profile preview"
                    fill
                    unoptimized
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <Building2
                    size={42}
                    className="text-gray-400 dark:text-gray-600"
                  />
                )}
              </div>

              <div className="w-full flex-1">
                <label
                  className={`${labelClass} cursor-pointer`}
                  htmlFor="companyPhoto"
                >
                  <Upload size={16} />
                  Upload a company photo
                </label>

                <input
                  id="companyPhoto"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    handlePhotoChange(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                  className={`${inputClass} cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-blue-700 dark:file:bg-blue-500/10 dark:file:text-blue-300`}
                />

                <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  JPG, PNG or another image format. Maximum file size: 5 MB.
                </p>

                {photoFile && (
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <p className="break-all text-xs text-green-600 dark:text-green-400">
                      Selected: {photoFile.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => setPhotoFile(null)}
                      className="text-xs font-semibold text-red-600 hover:underline dark:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Contact Information
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Update your primary contact and company name.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="contactName" className={labelClass}>
                  <UserRound size={15} />
                  Contact Person Name
                </label>

                <input
                  id="contactName"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter contact person's name"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="companyName" className={labelClass}>
                  <Building2 size={15} />
                  Company Name
                </label>

                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  placeholder="e.g. ABC Technologies"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Company Description */}
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <FileText size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Company Description
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Tell candidates about your company and services.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="companyDescription" className={labelClass}>
                <FileText size={15} />
                About Your Company
              </label>

              <textarea
                id="companyDescription"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={5}
                placeholder="Describe your company, services, team and expertise..."
                className={`${inputClass} resize-y`}
              />

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Write a clear description to help candidates understand your
                organization.
              </p>
            </div>
          </section>

          {/* Website */}
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Globe size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Online Presence
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Add your official company website.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="companyWebsite" className={labelClass}>
                <Globe size={15} />
                Company Website
                <span className="font-normal text-gray-400">(Optional)</span>
              </label>

              <input
                id="companyWebsite"
                name="website"
                type="url"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                placeholder="https://example.com"
                className={inputClass}
              />

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Include the full URL, for example https://example.com.
              </p>
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
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
            >
              <AlertCircle size={20} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="sticky bottom-0 z-10 -mx-3 border-t border-gray-200 bg-white/95 p-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none dark:border-gray-800 dark:bg-gray-950/95 sm:dark:bg-transparent">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mutation.isPending ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Updating Company Profile...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Company Profile
                </>
              )}
            </button>

            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              Review your company information before saving.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
