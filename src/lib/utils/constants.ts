export const APP_METADATA = {
  name: "BEAST 3.0 LUCRICITY Digital Constitution Engine",
  shortName: "LUCRICITY Engine",
  description:
    "Automated resource allocation, municipal governance, and compliance audit platform for Vigo County & Terre Haute, Indiana.",
  jurisdiction: "Vigo County, Indiana",
  governingEntity: "New World Order Private Government DAO LLC",
  tokenSymbol: "LUCR",
  tokenName: "Lucricity Governance Token",
};

export const CONTRACT_ADDRESSES = {
  sepolia: {
    lucricityToken: process.env.NEXT_PUBLIC_SEPOLIA_LUCR_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000",
    lucricityGovernor: process.env.NEXT_PUBLIC_SEPOLIA_GOVERNOR_ADDRESS || "0x0000000000000000000000000000000000000000",
    timelockController: process.env.NEXT_PUBLIC_SEPOLIA_TIMELOCK_ADDRESS || "0x0000000000000000000000000000000000000000",
  },
  mainnet: {
    lucricityToken: process.env.NEXT_PUBLIC_MAINNET_LUCR_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000",
    lucricityGovernor: process.env.NEXT_PUBLIC_MAINNET_GOVERNOR_ADDRESS || "0x0000000000000000000000000000000000000000",
    timelockController: process.env.NEXT_PUBLIC_MAINNET_TIMELOCK_ADDRESS || "0x0000000000000000000000000000000000000000",
  },
};

export const GOVERNANCE_PARAMETERS = {
  minProposeThreshold: 10000, // LUCR tokens required to submit proposal
  quorumPercentage: 4, // 4% of total supply required for quorum
  votingDelayBlocks: 1, // 1 block delay before voting starts
  votingPeriodBlocks: 50400, // ~7 days on Ethereum
  timelockDelaySeconds: 172800, // 48-hour execution delay
};

export const WELLBEING_BENCHMARKS = {
  economicStabilityTarget: 85,
  municipalInfrastructureIndex: 90,
  civicParticipationThreshold: 60,
  environmentalQualityTarget: 80,
};

export const NAVIGATION_ROUTES = [
  { label: "Dashboard", href: "/" },
  { label: "Proposals", href: "/proposals" },
  { label: "Directory", href: "/members" },
  { label: "Wellbeing Index", href: "/wellbeing" },
  { label: "Audit & Compliance", href: "/audit" },
] as const;
