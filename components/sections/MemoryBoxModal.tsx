"use client";

import { X, Sparkles, Ticket, MessageSquare, StickyNote, Image as ImageIcon } from "lucide-react";
import { memoryBox, type MemoryItem } from "@/data/content";
import { Sparkle } from "@/components/illustrations/Ornaments";

interface MemoryBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemoryBoxModal({ isOpen, onClose }: MemoryBoxModalProps) {
  if (!isOpen) return null;

  const getIcon = (kind: MemoryItem["kind"]) => {
    switch (kind) {
      case "ticket":
        return Ticket;
      case "chat":
        return MessageSquare;
      case "note":
        return StickyNote;
      case "photo":
        return ImageIcon;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg rounded-3xl bg-background-elevated p-6 sm:p-8 shadow-2xl border border-white/40 dark:border-white/10 z-10 toast-in max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div className="flex items-center gap-2">
            <Sparkle className="h-4 w-4 text-pink-deep" />
            <h3 className="font-serif text-xl font-bold text-foreground">
              Memory Box ✨
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup memory box"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-3 text-xs text-muted">
          Kepingan kenangan kecil yang tersimpan rapi.
        </p>

        {/* List of items */}
        <div className="mt-6 space-y-3">
          {memoryBox.map((item) => {
            const Icon = getIcon(item.kind);
            return (
              <div
                key={item.id}
                className="flex items-start gap-3.5 rounded-2xl bg-background p-4 shadow-sm border border-line"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink/20 text-pink-deep">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
