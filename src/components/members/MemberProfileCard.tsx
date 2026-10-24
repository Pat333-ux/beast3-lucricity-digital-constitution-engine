import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface MemberProfileProps {
  member: {
    id: string;
    name: string;
    role: string;
    district: string;
    votingPower: string;
    status: "active" | "delegated" | "inactive";
    joinedDate: string;
    walletAddress?: string;
    proposalsSubmitted?: number;
    votesCast?: number;
  };
  onDelegateClick?: () => void;
  className?: string;
}

export function MemberProfileCard({
  member,
  onDelegateClick,
  className = "",
}: MemberProfileProps) {
  const getStatusBadge = (status: MemberProfileProps["member"]["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "delegated":
        return <Badge variant="secondary">Delegated</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-bold">{member.name}</CardTitle>
            {getStatusBadge(member.status)}
          </div>
          <CardDescription>{member.role} &bull; {member.district}</CardDescription>
        </div>
        {member.walletAddress && (
          <span className="font-mono text-[11px] text-muted-foreground bg-muted px-2 py-1 rounded">
            {member.walletAddress.slice(0, 6)}...{member.walletAddress.slice(-4)}
          </span>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center py-2 bg-muted/40 rounded-lg border border-border">
          <div>
            <p className="text-xs text-muted-foreground">Voting Power</p>
            <p className="text-sm font-semibold font-mono text-foreground">{member.votingPower}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Proposals</p>
            <p className="text-sm font-semibold text-foreground">{member.proposalsSubmitted ?? 0}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Votes Cast</p>
            <p className="text-sm font-semibold text-foreground">{member.votesCast ?? 0}</p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground flex justify-between items-center pt-1">
          <span>Registered Member Since</span>
          <span className="font-medium text-foreground">{member.joinedDate}</span>
        </div>
      </CardContent>
      {onDelegateClick && (
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" onClick={onDelegateClick}>
            Delegate Voting Power
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
