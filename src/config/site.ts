export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    docs: string;
  };
  governance: {
    region: string;
    county: string;
    city: string;
    version: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "BEAST 3.0 LUCRICITY Engine",
  description:
    "Constitutional governance, automated resource allocation, and wellbeing indexing platform for Terre Haute and Vigo County, Indiana.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://lucricity.gov",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/PAT333-UX/beast-3.0-lucricity",
    docs: "https://docs.lucricity.gov",
  },
  governance: {
    region: "Indiana",
    county: "Vigo County",
    city: "Terre Haute",
    version: "3.0.0",
  },
};
