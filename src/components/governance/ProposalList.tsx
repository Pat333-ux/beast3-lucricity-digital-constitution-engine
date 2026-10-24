"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export interface GovernanceProposalItem {
  id: string;
  title: string;
  summary: string;
  proposer: string;
  status: "active" | "passed" | "defeated" | "queued" | "executed";
  category: "constitutional" | "allocation" | "policy" | "emergency";
  votesFor: number;
  votesAgainst: number;
  quorumReached: boolean;
  endTime: string;
}

export interface ProposalListProps {
  proposals: GovernanceProposalItem[];
  onSelectProposal?: (proposalId: string) => void;
  onCreateProposalClick?: () => void;
  title?: string;
  description?: string;
  className?: string;
}

export function ProposalList({
  proposals,
  onSelectProposal,
  onCreateProposalClick,
  title = "Governance Proposals",
  description = "Review, track, and interact with active and historical DAO governance initiatives.",
  className = "",
}: ProposalListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || proposal.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: GovernanceProposalItem["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "passed":
      case "executed":
        return <Badge variant="success">Passed</Badge>;
      case "defeated":
        return <Badge variant="destructive">Defeated</Badge>;
      case "queued":
        return <Badge variant="secondary">Queued</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {onCreateProposalClick && (
            <Button size="sm" onClick={onCreateProposalClick}>
              Create Proposal
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
          <Input
            placeholder="Search proposals by title, summary, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:max-w-md"
          />
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["all", "constitutional", "allocation", "policy"].map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "primary" : "outline"}
                size="sm"
                className="capitalize text-xs whitespace-nowrap"
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredProposals.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No proposals found matching the selected parameters.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredProposals.map((proposal) => {
              const totalVotes = proposal.votesFor + proposal.votesAgainst;
              const forPercentage =
                totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 50;

              return (
                <div
                  key={proposal.id}
                  className="p-5 rounded-lg border border-border bg-card hover:border-accent transition-all space-y-3 cursor-pointer"
                  onClick={() => onSelectProposal?.(proposal.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground font-semibold">
                        {proposal.id}
                      </span>
                      {getStatusBadge(proposal.status)}
                      <Badge variant="outline" className="capitalize text-[10px]">
                        {proposal.category}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Ends: {proposal.endTime}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {proposal.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {proposal.summary}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border/60">
                    <div>
                      <span>Proposer: </span>
                      <strong className="text-foreground font-medium">
                        {proposal.proposer}
                      </strong>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-1/2">
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span>For: {proposal.votesFor.toLocaleString()}</span>
                          <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all"
                            style={{ width: `${forPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
