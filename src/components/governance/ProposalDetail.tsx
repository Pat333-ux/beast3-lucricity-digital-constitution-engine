"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface ProposalDetailData {
  id: string;
  title: string;
  summary: string;
  description: string;
  proposer: string;
  status: "active" | "passed" | "defeated" | "queued" | "executed";
  category: "constitutional" | "allocation" | "policy" | "emergency";
  votesFor: number;
  votesAgainst: number;
  quorumThreshold: number;
  quorumReached: boolean;
  startTime: string;
  endTime: string;
  executionPayload?: string;
}

export interface ProposalDetailProps {
  proposal: ProposalDetailData;
  userVotingPower?: number;
  onVoteFor?: () => void;
  onVoteAgainst?: () => void;
  onExecute?: () => void;
  className?: string;
}

export function ProposalDetail({
  proposal,
  userVotingPower = 0,
  onVoteFor,
  onVoteAgainst,
  onExecute,
  className = "",
}: ProposalDetailProps) {
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercentage = totalVotes > 0 ? ((proposal.votesFor / totalVotes) * 100).toFixed(1) : "50.0";
  const againstPercentage = totalVotes > 0 ? ((proposal.votesAgainst / totalVotes) * 100).toFixed(1) : "50.0";

  const getStatusBadge = (status: ProposalDetailData["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active Voting</Badge>;
      case "passed":
        return <Badge variant="success">Passed</Badge>;
      case "executed":
        return <Badge variant="success">Executed</Badge>;
      case "defeated":
        return <Badge variant="destructive">Defeated</Badge>;
      case "queued":
        return <Badge variant="secondary">Queued for Execution</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-muted-foreground">
                {proposal.id}
              </span>
              {getStatusBadge(proposal.status)}
              <Badge variant="outline" className="capitalize text-[11px]">
                {proposal.category}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Voting Window: <span className="font-medium text-foreground">{proposal.startTime}</span> &mdash;{" "}
              <span className="font-medium text-foreground">{proposal.endTime}</span>
            </div>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-bold">{proposal.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground font-normal">
            Proposed by <span className="font-semibold text-foreground">{proposal.proposer}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-foreground space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Executive Summary</h4>
            <p className="bg-muted/40 p-4 rounded-md border border-border">{proposal.summary}</p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground pt-2">Detailed Specification</h4>
            <div className="whitespace-pre-line text-muted-foreground">{proposal.description}</div>

            {proposal.executionPayload && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground pt-2">On-Chain Execution Payload</h4>
                <pre className="p-3 bg-muted rounded-md text-xs font-mono text-muted-foreground overflow-x-auto border border-border">
                  {proposal.executionPayload}
                </pre>
              </>
            )}
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">Voting Results & Consensus Progress</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Quorum Threshold: {proposal.quorumThreshold.toLocaleString()} votes
                </span>
                {proposal.quorumReached ? (
                  <Badge variant="success" className="text-[10px]">Quorum Met</Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px]">Quorum Pending</Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-emerald-600 dark:text-emerald-400">
                  For: {proposal.votesFor.toLocaleString()} ({forPercentage}%)
                </span>
                <span className="text-destructive">
                  Against: {proposal.votesAgainst.toLocaleString()} ({againstPercentage}%)
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted flex">
                <div
                  className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all"
                  style={{ width: `${forPercentage}%` }}
                />
                <div
                  className="h-full bg-destructive transition-all"
                  style={{ width: `${againstPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>

        {proposal.status === "active" && (
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-4">
            <div className="text-xs text-muted-foreground w-full sm:w-auto text-center sm:text-left">
              Your Voting Power: <strong className="text-foreground">{userVotingPower.toLocaleString()} LUCR</strong>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-destructive text-destructive hover:bg-destructive/10"
                onClick={onVoteAgainst}
                disabled={userVotingPower === 0}
              >
                Vote Against
              </Button>
              <Button
                variant="primary"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={onVoteFor}
                disabled={userVotingPower === 0}
              >
                Vote For
              </Button>
            </div>
          </CardFooter>
        )}

        {proposal.status === "passed" && onExecute && (
          <CardFooter className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">
              Voting complete. Proposal ready for execution.
            </span>
            <Button variant="primary" onClick={onExecute}>
              Execute Proposal Payload
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
