"use client";

import { useState } from "react";
import { X, Sparkles, Ticket, MessageSquare, StickyNote, Image as ImageIcon, Heart, Award, Calendar, BookmarkCheck } from "lucide-react";
import { memoryBox, type MemoryItem, person } from "@/data/content";
import { Sparkle, PawPrint } from "@/components/illustrations/Ornaments";
import { shootSoftConfetti } from "@/lib/confetti";
import { cn } from "@/lib/cn";

interface MemoryBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemoryBoxModal({ isOpen, onClose }: MemoryBoxModalProps) {
  const [filter, setFilter] = useState<"all" | "ticket" | "chat" | "note" | "photo">("all");
  const [lovedItems, setLovedItems] = useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = useState<MemoryItem | null>(null);

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

  const filteredItems = filter === "all" ? memoryBox : memoryBox.filter((item) => item.kind === filter);

  const toggleLove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLovedItems((prev) => {
      const next = !prev[id];
      if (next) shootSoftConfetti();
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Box Container */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-background-elevated p-5 sm:p-8 shadow-2xl border border-white/40 dark:border-white/10 z-10 toast-in max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-line shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink to-lavender text-white shadow-soft">
              <Sparkle className="h-5 w-5 animate-twinkle" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                Kotak Kenangan Kita <span className="text-sm font-sans font-normal text-pink-deep">✨</span>
              </h3>
              <p className="text-xs text-muted">
                Kepingan momen, chat gemas, dan memori manis untuk {person.name}.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup kotak kenangan"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-muted hover:text-foreground transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 py-3 overflow-x-auto shrink-0 no-scrollbar">
          {[
            { id: "all", label: `Semua (${memoryBox.length})` },
            { id: "ticket", label: "Tiket & Kencan" },
            { id: "chat", label: "Chat Lucu" },
            { id: "note", label: "Catatan Kasih" },
            { id: "photo", label: "Foto Kenangan" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as typeof filter)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 border",
                filter === tab.id
                  ? "bg-pink-deep text-white border-pink-deep shadow-sm"
                  : "bg-background text-muted border-line hover:border-pink/40 hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Memory Grid / List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 mt-2">
          {filteredItems.map((item) => {
            const Icon = getIcon(item.kind);
            const isLoved = lovedItems[item.id];

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-background p-4 sm:p-5 shadow-sm border border-line/80 transition-all duration-300 hover:shadow-soft hover:border-pink/50 cursor-pointer text-left",
                  isLoved && "border-pink/40 bg-pink/5"
                )}
              >
                {/* Washi tape decorative strip */}
                <div className="absolute -top-1.5 left-8 h-4 w-12 bg-cream-deep/80 dark:bg-lavender/30 rotate-[-2deg] rounded-sm opacity-90 shadow-xs pointer-events-none" />

                <div className="flex items-start justify-between gap-3 pt-1">
                  <div className="flex items-start gap-3.5">
                    {/* Icon circle */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink/20 text-pink-deep transition-transform duration-300 group-hover:scale-105 shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      {/* Meta badge & date */}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {item.badge && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-pink/20 px-2.5 py-0.5 text-[10px] font-bold text-pink-deep">
                            {item.badge}
                          </span>
                        )}
                        {item.date && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                            <Calendar className="h-3 w-3 opacity-60" />
                            {item.date}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-base font-semibold text-foreground group-hover:text-pink-deep transition-colors">
                        {item.title}
                      </h4>

                      <p className="mt-1.5 text-xs sm:text-sm text-foreground/80 leading-relaxed font-light">
                        {item.detail}
                      </p>
                    </div>
                  </div>

                  {/* Heart / Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleLove(item.id, e)}
                    aria-label="Sukai kenangan ini"
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 hover:scale-110",
                      isLoved ? "bg-pink-deep text-white shadow-soft" : "text-muted hover:text-pink-deep hover:bg-pink/10"
                    )}
                  >
                    <Heart className={cn("h-4 w-4", isLoved && "fill-current")} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-line mt-3 flex items-center justify-between text-xs text-muted shrink-0">
          <span className="flex items-center gap-1.5">
            <PawPrint className="h-3.5 w-3.5 text-pink-deep" />
            Tersimpan abadi dalam kenangan
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-background-elevated px-4 py-1.5 font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 border border-line"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Focus Detailed Modal if an item is clicked */}
      {activeItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setActiveItem(null)}
          />
          <div className="relative w-full max-w-md rounded-3xl bg-background-elevated p-6 shadow-2xl border border-pink/40 z-10 toast-in text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-pink to-lavender text-white shadow-md">
              <Sparkle className="h-7 w-7" />
            </div>
            {activeItem.badge && (
              <span className="inline-block rounded-full bg-pink/20 px-3 py-1 text-xs font-bold text-pink-deep mb-2">
                {activeItem.badge}
              </span>
            )}
            <h4 className="font-serif text-xl font-bold text-foreground">
              {activeItem.title}
            </h4>
            <p className="mt-3 text-sm text-foreground/85 leading-relaxed font-light">
              "{activeItem.detail}"
            </p>
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="mt-6 w-full rounded-full bg-pink-deep py-2.5 text-xs font-bold text-white shadow-md transition hover:scale-102"
            >
              Kembali ke Kotak Kenangan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
