"use client";

import * as React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export interface DelegationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDelegate?: string;
  userVotingPower: number;
  onConfirmDelegation: (delegateeAddress: string) => Promise<void> | void;
}

export function DelegationModal({
  isOpen,
  onClose,
  currentDelegate,
  userVotingPower,
  onConfirmDelegation,
}: DelegationModalProps) {
  const [delegatee, setDelegatee] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleDelegate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegatee.trim()) {
      setError("Please enter a valid wallet address or member ID.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      await onConfirmDelegation(delegatee.trim());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delegate voting power.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delegate Voting Power"
      description="Assign your constitutional voting power to a trusted delegate or representative."
    >
      <form onSubmit={handleDelegate} className="space-y-4">
        <div className="p-3 bg-muted/40 rounded-lg border border-border space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Your Active Power:</span>
            <span className="font-semibold text-foreground font-mono">
              {userVotingPower.toLocaleString()} LUCR
            </span>
          </div>
          {currentDelegate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Currently Delegated To:</span>
              <span className="font-mono text-foreground font-medium">
                {currentDelegate.slice(0, 6)}...{currentDelegate.slice(-4)}
              </span>
            </div>
          )}
        </div>

        <Input
          label="Delegate Wallet Address / Member ID"
          placeholder="0x... or member.eth"
          value={delegatee}
          onChange={(e) => setDelegatee(e.target.value)}
          error={error}
        />

        <p className="text-xs text-muted-foreground leading-relaxed">
          Delegating passes your voting weight for all active and future proposals to the target address. You retain ownership of your LUCR tokens and can update or revoke delegation at any time.
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Delegating..." : "Confirm Delegation"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
