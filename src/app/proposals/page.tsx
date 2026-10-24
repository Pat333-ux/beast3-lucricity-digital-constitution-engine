"use client";

import * as React from "react";
import { ProposalList } from "@/components/governing/ProposalList";
import { ProposalFilter } from "@/components/governing/ProposalFilter";
import { ProposalFormModal } from "@/components/governing/ProposalFormModal";
import { Button } from "@/components/ui/Button";
import { ProposalFormInput } from "@/lib/zod/schemas";

export default function ProposalsPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const mockProposals = [
    {
      id: "PROP-042",
      title: "Terre Haute Downtown Smart Corridor Infrastructure Allocation",
      category: "allocation" as const,
      status: "active" as const,
      proposer: "0x3333...3333",
      endTime: "2 days left",
      votesFor: 450000,
      votesAgainst: 25000,
      quorumReached: true,
    },
    {
      id: "PROP-041",
      title: "Vigo County Emergency Community Resilience Fund Restructuring",
      category: "constitutional" as const,
      status: "passed" as const,
      proposer: "0x1111...1111",
      endTime: "Executed",
      votesFor: 820000,
      votesAgainst: 41000,
      quorumReached: true,
    },
    {
      id: "PROP-040",
      title: "Municipal Wellbeing Index Weight Adjustment Amendment",
      category: "policy" as const,
      status: "rejected" as const,
      proposer: "0x8888...8888",
      endTime: "Ended 5 days ago",
      votesFor: 120000,
      votesAgainst: 650000,
      quorumReached: true,
    },
    {
      id: "PROP-039",
      title: "Public Works Sensor Network Grant Funding Authorization",
      category: "emergency" as const,
      status: "pending" as const,
      proposer: "0x5555...5555",
      endTime: "Starts in 12 hours",
      votesFor: 0,
      votesAgainst: 0,
      quorumReached: false,
    },
  ];

  const filteredProposals = mockProposals.filter((proposal) => {
    const matchesCategory =
      selectedCategory === "all" || proposal.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || proposal.status === selectedStatus;
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleCreateProposal = (data: ProposalFormInput) => {
    console.log("Submitting new proposal:", data);
    // Firestore / Smart Contract dispatch hook integrate here
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Governance & Proposals
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review, vote, and submit municipal governance proposals for Vigo County.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          New Proposal
        </Button>
      </div>

      <ProposalFilter
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
        onSearchChange={setSearchQuery}
      />

      <ProposalList proposals={filteredProposals} />

      <ProposalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitProposal={handleCreateProposal}
      />
    </div>
  );
}
