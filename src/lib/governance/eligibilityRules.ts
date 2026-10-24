export interface MemberAssessmentData {
  memberId: string;
  householdIncome: number;
  householdMembers: number;
  city: string;
  county: string;
  state: string;
  employmentStatus: string;
  housingStatus: string;
  veteranStatus: boolean;
  disabilityStatus: boolean;
}

export interface BenefitProgramRule {
  id: string;
  title: string;
  agency: string;
  maxIncomeThresholdRatio: number; // Percentage of Federal Poverty Level or flat limit
  requiredCounty?: string;
  requiresVeteran?: boolean;
  requiresDisability?: boolean;
}

export const FEDERAL_POVERTY_GUIDELINES_2026: Record<number, number> = {
  1: 15060,
  2: 20440,
  3: 25820,
  4: 31200,
  5: 36580,
  6: 41960,
  7: 47340,
  8: 52720,
};

export const eligibilityRulesEngine = {
  evaluateProgramEligibility(
    member: MemberAssessmentData,
    program: BenefitProgramRule
  ): { isEligible: boolean; reasons: string[] } {
    const reasons: string[] = [];
    let isEligible = true;

    // Geographic verification
    if (program.requiredCounty && member.county.toLowerCase() !== program.requiredCounty.toLowerCase()) {
      isEligible = false;
      reasons.push(`Residency requirement not met: Must reside in ${program.requiredCounty} County.`);
    } else {
      reasons.push(`Residency confirmed for ${member.county} County, ${member.state}.`);
    }

    // Income threshold check
    const baseFPL = FEDERAL_POVERTY_GUIDELINES_2026[Math.min(member.householdMembers, 8)] || 31200;
    const adjustedThreshold = baseFPL * program.maxIncomeThresholdRatio;

    if (member.householdIncome > adjustedThreshold) {
      isEligible = false;
      reasons.push(
        `Income threshold exceeded: Household income ($${member.householdIncome}) is above the program limit ($${adjustedThreshold.toFixed(
          0
        )}).`
      );
    } else {
      reasons.push(`Household income falls within allowable limits for program tier.`);
    }

    // Special status checks
    if (program.requiresVeteran && !member.veteranStatus) {
      isEligible = false;
      reasons.push("Special criteria unmet: Program requires verified veteran status.");
    }

    if (program.requiresDisability && !member.disabilityStatus) {
      isEligible = false;
      reasons.push("Special criteria unmet: Program requires verified disability status.");
    }

    return { isEligible, reasons };
  },
};
