export interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Members",
    href: "/members",
  },
  {
    title: "Assessment",
    href: "/assessment",
  },
  {
    title: "Eligibility",
    href: "/eligibility",
  },
  {
    title: "Wellbeing Index",
    href: "/wellbeing",
  },
  {
    title: "Constitution",
    href: "/constitution",
  },
  {
    title: "Audit Reports",
    href: "/reports",
  },
];

export const footerNav: NavSection[] = [
  {
    title: "Governance Platform",
    items: [
      { title: "Digital Constitution", href: "/constitution" },
      { title: "Resource Allocation", href: "/eligibility" },
      { title: "Wellbeing Metrics", href: "/wellbeing" },
      { title: "Compliance Audits", href: "/reports" },
    ],
  },
  {
    title: "Ecosystem Resources",
    items: [
      { title: "Vigo County Services", href: "https://vigo.in.gov", external: true },
      { title: "Terre Haute Portal", href: "https://terrehaute.in.gov", external: true },
      { title: "BEAST System 3.0 Documentation", href: "/docs" },
    ],
  },
];
