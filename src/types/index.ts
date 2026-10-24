export type UserRole = "member" | "administrator" | "auditor";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  location: {
    state: string;
    county: string;
    city: string;
    zipCode: string;
  };
  householdSize: number;
  annualIncome: number;
  veteranStatus: boolean;
  disabilityStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BenefitOpportunity {
  id: string;
  title: string;
  agency: string;
  description: string;
  maxIncomeThresholdRatio: number;
  requiredCounty?: string;
  status: "active" | "expired" | "pending";
}

export interface WellbeingRecord {
  id: string;
  memberId: string;
  financialStabilityScore: number;
  healthWellnessScore: number;
  housingSecurityScore: number;
  communityEngagementScore: number;
  compositeScore: number;
  evaluatedAt: string;
}

export interface ConstitutionalArticleType {
  id: string;
  articleNumber: number;
  title: string;
  section: string;
  content: string;
  governanceCategory:
    | "Member Rights"
    | "Resource Allocation"
    | "System Governance"
    | "Compliance & Audit";
  effectiveDate: string;
  status: "Active" | "Proposed" | "Amended";
}
