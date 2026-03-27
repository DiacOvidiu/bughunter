export const siteConfig = {
  name: "BugHunter",
  description:
    "Comunitatea QA din România pentru manual testing, automation, quality engineering și creștere în carieră.",
  url: "https://www.bughunter.ro",
  locale: "ro_RO",
  discordInviteUrl: "https://discord.gg/JHRa9eUqp5",
  email: "antreprenor@danpopescu.ro",
  socials: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    youtube: "https://www.youtube.com/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
