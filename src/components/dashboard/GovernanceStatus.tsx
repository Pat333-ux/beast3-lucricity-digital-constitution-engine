import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface GovernanceProposal {
  id: string;
  title: string;
  status: "active" | "passed" | "defeated" | "queued";
  votesFor: number;
  votesAgainst: number;
  quorumReached: boolean;
  endTime: string;
}

export interface GovernanceStatusProps {
  proposals: GovernanceProposal[];
  activeEpoch: number;
  consensusThreshold: string;
  title?: string;
  description?: string;
  className?: string;
}

export function GovernanceStatus({
  proposals,
  activeEpoch,
  consensusThreshold,
  title = "Constitutional Governance Status",
  description = "Active DAO proposals and multi-sig consensus parameters for Vigo County.",
  className = "",
}: GovernanceStatusProps) {
  const getStatusBadge = (status: GovernanceProposal["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "passed":
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
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-foreground">
            Epoch #{activeEpoch}
          </div>
          <p className="text-xs text-muted-foreground">Threshold: {consensusThreshold}</p>
        </div>
      </CardHeader>
      <CardContent>
        {proposals.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No active governance proposals in the current voting cycle.
          </p>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => {
              const totalVotes = proposal.votesFor + proposal.votesAgainst;
              const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 50;

              return (
                <div
                  key={proposal.id}
                  className="p-4 rounded-lg border border-border bg-muted/20 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {proposal.id}
                        </span>
                        {getStatusBadge(proposal.status)}
                        {proposal.quorumReached && (
                          <Badge variant="outline" className="text-[10px]">
                            Quorum Met
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {proposal.title}
                      </h4>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      Ends: {proposal.endTime}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>For: {proposal.votesFor.toLocaleString()}</span>
                      <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all"
                        style={{ width: `${forPercentage}%` }}
                      />
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
