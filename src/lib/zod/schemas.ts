import { z } from "zod";

/**
 * Common EVM Address / ID validation schema
 */
export const ethereumAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM wallet address format.");

/**
 * Member Profile Validation Schema
 */
export const memberProfileSchema = z.object({
  id: z.string().min(1, "Member ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  walletAddress: ethereumAddressSchema,
  role: z.enum(["admin", "delegate", "citizen", "observer"]),
  jurisdiction: z.string().default("Vigo County, IN"),
  joinedAt: z.string().datetime().optional(),
});

export type MemberProfileInput = z.infer<typeof memberProfileSchema>;

/**
 * Governance Proposal Validation Schema
 */
export const proposalFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(120, "Title cannot exceed 120 characters"),
  category: z.enum(["constitutional", "allocation", "policy", "emergency"]),
  summary: z
    .string()
    .min(20, "Executive summary must be at least 20 characters")
    .max(500, "Summary cannot exceed 500 characters"),
  description: z
    .string()
    .min(50, "Detailed specification must be at least 50 characters"),
  executionPayload: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    }, "Execution payload must be a valid JSON string if provided."),
  votingDurationDays: z
    .number()
    .int()
    .min(1, "Voting window must be at least 1 day")
    .max(30, "Voting window cannot exceed 30 days"),
});

export type ProposalFormInput = z.infer<typeof proposalFormSchema>;

/**
 * Voting Ballot Submission Schema
 */
export const voteCastSchema = z.object({
  proposalId: z.string().min(1, "Proposal ID is required"),
  voteType: z.enum(["for", "against", "abstain"]),
  reason: z.string().max(280, "Reasoning cannot exceed 280 characters").optional(),
});

export type VoteCastInput = z.infer<typeof voteCastSchema>;

/**
 * Wellbeing Metric Evaluation Entry Schema
 */
export const wellbeingMetricSchema = z.object({
  metricId: z.string().min(1, "Metric ID is required"),
  category: z.enum(["economic", "health", "infrastructure", "governance", "environment"]),
  value: z.number({ required_error: "Value is required" }),
  targetBenchmark: z.number({ required_error: "Benchmark target is required" }),
  unit: z.string().min(1, "Unit designation required"),
  notes: z.string().optional(),
});

export type WellbeingMetricInput = z.infer<typeof wellbeingMetricSchema>;

/**
 * Compliance Audit Filter Schema
 */
export const auditFilterSchema = z.object({
  searchQuery: z.string().optional(),
  category: z.enum(["all", "governance", "treasury", "access", "system"]).default("all"),
  severity: z.enum(["all", "info", "warning", "critical"]).default("all"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type AuditFilterInput = z.infer<typeof auditFilterSchema>;
