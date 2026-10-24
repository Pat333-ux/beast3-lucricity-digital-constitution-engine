"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

export interface Member {
  id: string;
  name: string;
  role: string;
  district: string;
  votingPower: string;
  status: "active" | "delegated" | "inactive";
  joinedDate: string;
}

export interface MemberDirectoryProps {
  members: Member[];
  title?: string;
  description?: string;
  className?: string;
}

export function MemberDirectory({
  members,
  title = "Constitutional Member Directory",
  description = "Registered participants and stakeholders in the Vigo County governance framework.",
  className = "",
}: MemberDirectoryProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Member["status"]) => {
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
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={statusFilter === "all" ? "primary" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "active" ? "primary" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "delegated" ? "primary" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("delegated")}
            >
              Delegated
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by name, role, or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Participant</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Voting Power</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No members found matching the current filter criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium text-foreground">
                    {member.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.role}</TableCell>
                  <TableCell className="text-muted-foreground">{member.district}</TableCell>
                  <TableCell className="font-mono text-xs">{member.votingPower}</TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell className="text-right text-muted-foreground text-xs">
                    {member.joinedDate}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
