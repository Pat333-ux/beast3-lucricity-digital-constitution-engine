export interface WellbeingMetricsInput {
  financialStabilityScore: number; // 0 - 100
  healthWellnessScore: number;     // 0 - 100
  housingSecurityScore: number;    // 0 - 100
  communityEngagementScore: number; // 0 - 100
}

export interface WellbeingAssessmentResult {
  compositeScore: number;
  tierClassification: "Optimal" | "Stable" | "At-Risk" | "Critical";
  primaryFocusArea: string;
  recommendations: string[];
}

export const wellbeingCalculator = {
  calculateCompositeIndex(metrics: WellbeingMetricsInput): WellbeingAssessmentResult {
    const {
      financialStabilityScore,
      healthWellnessScore,
      housingSecurityScore,
      communityEngagementScore,
    } = metrics;

    // Weighted composite calculation across four core pillars
    const compositeScore = Number(
      (
        financialStabilityScore * 0.30 +
        healthWellnessScore * 0.25 +
        housingSecurityScore * 0.30 +
        communityEngagementScore * 0.15
      ).toFixed(2)
    );

    let tierClassification: WellbeingAssessmentResult["tierClassification"] = "Stable";
    if (compositeScore >= 85) {
      tierClassification = "Optimal";
    } else if (compositeScore >= 70) {
      tierClassification = "Stable";
    } else if (compositeScore >= 50) {
      tierClassification = "At-Risk";
    } else {
      tierClassification = "Critical";
    }

    // Determine primary focus area based on lowest sub-score
    const scores = [
      { name: "Financial Stability", score: financialStabilityScore },
      { name: "Health & Wellness", score: healthWellnessScore },
      { name: "Housing Security", score: housingSecurityScore },
      { name: "Community Engagement", score: communityEngagementScore },
    ];

    scores.sort((a, b) => a.score - b.score);
    const lowest = scores[0];

    const recommendations: string[] = [];
    if (lowest.score < 70) {
      recommendations.push(`Priority intervention recommended in ${lowest.name} (Score: ${lowest.score}).`);
    } else {
      recommendations.push("All foundational wellbeing metrics meet baseline constitutional thresholds.");
    }

    if (financialStabilityScore < 65) {
      recommendations.push("Explore Vigo County workforce development and emergency financial assistance programs.");
    }
    if (housingSecurityScore < 65) {
      recommendations.push("Review local utility and housing stabilization grants available through the digital constitution engine.");
    }

    return {
      compositeScore,
      tierClassification,
      primaryFocusArea: lowest.name,
      recommendations,
    };
  },
};
