"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export interface VotingInterfaceProps {
  proposalId: string;
  proposalTitle: string;
  userVotingPower: number;
  delegatedPower?: number;
  hasVoted?: boolean;
  userCurrentVote?: "for" | "against" | "abstain";
  onCastVote: (voteType: "for" | "against" | "abstain", reason?: string) => Promise<void> | void;
  className?: string;
}

export function VotingInterface({
  proposalId,
  proposalTitle,
  userVotingPower,
  delegatedPower = 0,
  hasVoted = false,
  userCurrentVote,
  onCastVote,
  className = "",
}: VotingInterfaceProps) {
  const [selectedOption, setSelectedOption] = React.useState<"for" | "against" | "abstain" | null>(
    userCurrentVote || null
  );
  const [voteReason, setVoteReason] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const totalEffectivePower = userVotingPower + delegatedPower;

  const handleSubmitVote = async () => {
    if (!selectedOption) return;
    setIsSubmitting(true);
    try {
      await onCastVote(selectedOption, voteReason.trim() ? voteReason : undefined);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Cast Your Vote</CardTitle>
          <span className="text-xs font-mono text-muted-foreground">{proposalId}</span>
        </div>
        <CardDescription>
          Ballot entry for <strong className="text-foreground">{proposalTitle}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-muted/40 rounded-lg border border-border flex justify-between items-center text-xs">
          <div>
            <span className="text-muted-foreground">Direct Power: </span>
            <span className="font-semibold text-foreground font-mono">{userVotingPower.toLocaleString()} LUCR</span>
          </div>
          <div>
            <span className="text-muted-foreground">Delegated: </span>
            <span className="font-semibold text-foreground font-mono">{delegatedPower.toLocaleString()} LUCR</span>
          </div>
          <div className="border-l border-border pl-3">
            <span className="text-muted-foreground">Total Weight: </span>
            <span className="font-bold text-foreground font-mono">{totalEffectivePower.toLocaleString()} LUCR</span>
          </div>
        </div>

        {hasVoted && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-md flex items-center justify-between text-xs">
            <span className="text-emerald-800 dark:text-emerald-300 font-medium">
              You have recorded a vote for this proposal.
            </span>
            <Badge variant="success" className="capitalize">
              Voted {userCurrentVote}
            </Badge>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select Decision
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setSelectedOption("for")}
              className={`p-3 rounded-lg border text-sm font-semibold transition-all flex flex-col items-center justify-center gap-1 ${
                selectedOption === "for"
                  ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-600"
                  : "border-border hover:border-emerald-500 hover:bg-muted/30 text-foreground"
              }`}
            >
              <span>For</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedOption("against")}
              className={`p-3 rounded-lg border text-sm font-semibold transition-all flex flex-col items-center justify-center gap-1 ${
                selectedOption === "against"
                  ? "border-destructive bg-destructive/10 text-destructive ring-2 ring-destructive"
                  : "border-border hover:border-destructive hover:bg-muted/30 text-foreground"
              }`}
            >
              <span>Against</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedOption("abstain")}
              className={`p-3 rounded-lg border text-sm font-semibold transition-all flex flex-col items-center justify-center gap-1 ${
                selectedOption === "abstain"
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 ring-2 ring-amber-500"
                  : "border-border hover:border-amber-500 hover:bg-muted/30 text-foreground"
              }`}
            >
              <span>Abstain</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Constitutional Reason / Comment (Optional)
          </label>
          <Input
            placeholder="Provide rationale for public audit record..."
            value={voteReason}
            onChange={(e) => setVoteReason(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="primary"
          disabled={!selectedOption || totalEffectivePower === 0 || isSubmitting}
          onClick={handleSubmitVote}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Submitting Vote..." : hasVoted ? "Update Vote" : "Confirm & Cast Vote"}
        </Button>
      </CardFooter>
    </Card>
  );
}
