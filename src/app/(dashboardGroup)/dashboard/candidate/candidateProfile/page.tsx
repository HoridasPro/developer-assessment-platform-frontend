// "use client";

// import { useUpdateCandidateProfile } from "@/hooks";
// import { useState } from "react";

// export default function CandidateProfilePage() {
//   const { mutate, isPending } = useUpdateCandidateProfile();

//   const [name, setName] = useState("Parth");
//   const [profilePhoto, setProfilePhoto] = useState(
//     "https://i.postimg.cc/X7CmKWvp/300x300.jpg",
//   );

//   const [bio, setBio] = useState("Full Stack Developer");
//   const [phone, setPhone] = useState("+8801712345678");
//   const [location, setLocation] = useState("Dhaka");

//   const [skills, setSkills] = useState(
//     "JavaScript, TypeScript, React, Node.js",
//   );

//   const [experience, setExperience] = useState("2");
//   const [education, setEducation] = useState("B.Sc in CSE");

//   const [resumeUrl, setResumeUrl] = useState("https://example.com/resume.pdf");

//   const [portfolioUrl, setPortfolioUrl] = useState("https://haridas.dev");

//   const [githubUrl, setGithubUrl] = useState("https://github.com/haridas");

//   const [linkedinUrl, setLinkedinUrl] = useState(
//     "https://linkedin.com/in/haridas",
//   );

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     mutate({
//       name,
//       profilePhoto,

//       candidateProfile: {
//         bio,
//         phone,
//         location,

//         skills: skills
//           .split(",")
//           .map((skill) => skill.trim())
//           .filter(Boolean),

//         experience: Number(experience),

//         education,
//         resumeUrl,
//         portfolioUrl,
//         githubUrl,
//         linkedinUrl,
//       },
//     });
//   };

//   return (
//     <div className="mx-auto w-full max-w-4xl">
//       <div className="rounded-2xl border border-border bg-card shadow-sm">
//         {/* Header */}
//         <div className="border-b border-border p-6">
//           <h1 className="text-2xl font-bold text-foreground">
//             Candidate Profile
//           </h1>

//           <p className="mt-1 text-sm text-muted-foreground">
//             Update your personal and professional information.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8 p-6">
//           {/* Basic Information */}
//           <section>
//             <h2 className="mb-4 text-lg font-semibold text-foreground">
//               Basic Information
//             </h2>

//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//               {/* Name */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="name"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Name
//                 </label>

//                 <input
//                   id="name"
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your name"
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* Profile Photo */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="profilePhoto"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Profile Photo URL
//                 </label>

//                 <input
//                   id="profilePhoto"
//                   type="url"
//                   value={profilePhoto}
//                   onChange={(e) => setProfilePhoto(e.target.value)}
//                   placeholder="https://..."
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* Bio */}
//               <div className="space-y-2 md:col-span-2">
//                 <label
//                   htmlFor="bio"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Bio
//                 </label>

//                 <textarea
//                   id="bio"
//                   value={bio}
//                   onChange={(e) => setBio(e.target.value)}
//                   placeholder="Tell us about yourself"
//                   rows={4}
//                   className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Contact Information */}
//           <section>
//             <h2 className="mb-4 text-lg font-semibold text-foreground">
//               Contact Information
//             </h2>

//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//               {/* Phone */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="phone"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Phone
//                 </label>

//                 <input
//                   id="phone"
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="+880..."
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* Location */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="location"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Location
//                 </label>

//                 <input
//                   id="location"
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   placeholder="Dhaka, Bangladesh"
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Professional Information */}
//           <section>
//             <h2 className="mb-4 text-lg font-semibold text-foreground">
//               Professional Information
//             </h2>

//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//               {/* Skills */}
//               <div className="space-y-2 md:col-span-2">
//                 <label
//                   htmlFor="skills"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Skills
//                 </label>

//                 <input
//                   id="skills"
//                   type="text"
//                   value={skills}
//                   onChange={(e) => setSkills(e.target.value)}
//                   placeholder="JavaScript, TypeScript, React, Node.js"
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />

//                 <p className="text-xs text-muted-foreground">
//                   Separate skills with commas.
//                 </p>
//               </div>

//               {/* Experience */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="experience"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Experience (Years)
//                 </label>

//                 <input
//                   id="experience"
//                   type="number"
//                   min="0"
//                   value={experience}
//                   onChange={(e) => setExperience(e.target.value)}
//                   placeholder="2"
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* Education */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="education"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Education
//                 </label>

//                 <input
//                   id="education"
//                   type="text"
//                   value={education}
//                   onChange={(e) => setEducation(e.target.value)}
//                   placeholder="B.Sc in CSE"
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Links */}
//           <section>
//             <h2 className="mb-4 text-lg font-semibold text-foreground">
//               Professional Links
//             </h2>

//             <div className="grid grid-cols-1 gap-5">
//               {/* Resume */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="resumeUrl"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Resume URL
//                 </label>

//                 <input
//                   id="resumeUrl"
//                   type="url"
//                   value={resumeUrl}
//                   onChange={(e) => setResumeUrl(e.target.value)}
//                   placeholder="https://example.com/resume.pdf"
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* Portfolio */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="portfolioUrl"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Portfolio URL
//                 </label>

//                 <input
//                   id="portfolioUrl"
//                   type="url"
//                   value={portfolioUrl}
//                   onChange={(e) => setPortfolioUrl(e.target.value)}
//                   placeholder="https://yourportfolio.com"
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* GitHub */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="githubUrl"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   GitHub URL
//                 </label>

//                 <input
//                   id="githubUrl"
//                   type="url"
//                   value={githubUrl}
//                   onChange={(e) => setGithubUrl(e.target.value)}
//                   placeholder="https://github.com/username"
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* LinkedIn */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="linkedinUrl"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   LinkedIn URL
//                 </label>

//                 <input
//                   id="linkedinUrl"
//                   type="url"
//                   value={linkedinUrl}
//                   onChange={(e) => setLinkedinUrl(e.target.value)}
//                   placeholder="https://linkedin.com/in/username"
//                   className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Submit */}
//           <div className="flex justify-end border-t border-border pt-6">
//             <button
//               type="submit"
//               disabled={isPending}
//               className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {isPending ? "Updating Profile..." : "Update Profile"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useUpdateCandidateProfiles } from "@/hooks";
import { useState } from "react";

// type UpdateCandidateProfilePayload = {
//   name: string;
//   profilePhoto: string;
//   candidateProfile: {
//     bio: string;
//     phone: string;
//     location: string;
//     skills: string[];
//     experience: number;
//     education: string;
//     resumeUrl: string;
//     portfolioUrl: string;
//     githubUrl: string;
//     linkedinUrl: string;
//   };
// };

export type UpdateCandidateProfilePayload = {
  name: string;
  profilePhoto: string;
  candidateProfile: {
    bio: string;
    phone: string;
    location: string;
    skills: string[];
    experience: number;
    education: string;
    resumeUrl: string;
    portfolioUrl: string;
    githubUrl: string;
    linkedinUrl: string;
  };
};

export default function CandidateProfilePage() {
  const { mutate, isPending } = useUpdateCandidateProfiles();

  const [name, setName] = useState("Parth");
  const [profilePhoto, setProfilePhoto] = useState(
    "https://i.postimg.cc/X7CmKWvp/300x300.jpg",
  );

  const [bio, setBio] = useState("Full Stack Developer");
  const [phone, setPhone] = useState("+8801712345678");
  const [location, setLocation] = useState("Dhaka");

  const [skills, setSkills] = useState(
    "JavaScript, TypeScript, React, Node.js",
  );

  const [experience, setExperience] = useState("2");
  const [education, setEducation] = useState("B.Sc in CSE");

  const [resumeUrl, setResumeUrl] = useState("https://example.com/resume.pdf");

  const [portfolioUrl, setPortfolioUrl] = useState("https://haridas.dev");

  const [githubUrl, setGithubUrl] = useState("https://github.com/haridas");

  const [linkedinUrl, setLinkedinUrl] = useState(
    "https://linkedin.com/in/haridas",
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const profileData: UpdateCandidateProfilePayload = {
      name,
      profilePhoto,

      candidateProfile: {
        bio,
        phone,
        location,

        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        experience: Number(experience),

        education,
        resumeUrl,
        portfolioUrl,
        githubUrl,
        linkedinUrl,
      },
    };

    mutate(profileData);
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="border-b border-border p-6">
          <h1 className="text-2xl font-bold text-foreground">
            Candidate Profile
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your personal and professional information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 p-6">
          {/* Basic Information */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Profile Photo */}
              <div className="space-y-2">
                <label
                  htmlFor="profilePhoto"
                  className="text-sm font-medium text-foreground"
                >
                  Profile Photo URL
                </label>

                <input
                  id="profilePhoto"
                  type="url"
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="bio"
                  className="text-sm font-medium text-foreground"
                >
                  Bio
                </label>

                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Phone */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-foreground"
                >
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Dhaka, Bangladesh"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </section>

          {/* Professional Information */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Professional Information
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Skills */}
              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="skills"
                  className="text-sm font-medium text-foreground"
                >
                  Skills
                </label>

                <input
                  id="skills"
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="JavaScript, TypeScript, React, Node.js"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <p className="text-xs text-muted-foreground">
                  Separate skills with commas.
                </p>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label
                  htmlFor="experience"
                  className="text-sm font-medium text-foreground"
                >
                  Experience (Years)
                </label>

                <input
                  id="experience"
                  type="number"
                  min="0"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="2"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Education */}
              <div className="space-y-2">
                <label
                  htmlFor="education"
                  className="text-sm font-medium text-foreground"
                >
                  Education
                </label>

                <input
                  id="education"
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="B.Sc in CSE"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </section>

          {/* Links */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Professional Links
            </h2>

            <div className="grid grid-cols-1 gap-5">
              {/* Resume */}
              <div className="space-y-2">
                <label
                  htmlFor="resumeUrl"
                  className="text-sm font-medium text-foreground"
                >
                  Resume URL
                </label>

                <input
                  id="resumeUrl"
                  type="url"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="https://example.com/resume.pdf"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Portfolio */}
              <div className="space-y-2">
                <label
                  htmlFor="portfolioUrl"
                  className="text-sm font-medium text-foreground"
                >
                  Portfolio URL
                </label>

                <input
                  id="portfolioUrl"
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* GitHub */}
              <div className="space-y-2">
                <label
                  htmlFor="githubUrl"
                  className="text-sm font-medium text-foreground"
                >
                  GitHub URL
                </label>

                <input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* LinkedIn */}
              <div className="space-y-2">
                <label
                  htmlFor="linkedinUrl"
                  className="text-sm font-medium text-foreground"
                >
                  LinkedIn URL
                </label>

                <input
                  id="linkedinUrl"
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end border-t border-border pt-6">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Updating Profile..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
