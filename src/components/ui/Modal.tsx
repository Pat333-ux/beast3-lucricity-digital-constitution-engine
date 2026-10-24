"use client";

import * as React from "react";
import { Button } from "./Button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg rounded-lg border border-border bg-background p-6 shadow-lg z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </Button>
        </div>
        <div className="py-2">{children}</div>
      </div>
    </div>
  );
}
