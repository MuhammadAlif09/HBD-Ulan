"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Camera, Heart, Sparkles, User, Users } from "lucide-react";
import { gallery, type GalleryTabId } from "@/data/content";
import { useApp } from "@/lib/store";
import { useReveal } from "@/hooks/useGsap";
import { CatEars, Sparkle, Star } from "@/components/illustrations/Ornaments";
import { cn } from "@/lib/cn";

export function Gallery() {
  const [activeTab, setActiveTab] = useState<GalleryTabId>("little-wulan");
  const visitGalleryTab = useApp((s) => s.visitGalleryTab);
  const visitedTabs = useApp((s) => s.visitedGalleryTabs);
  const unlockAchievement = useApp((s) => s.unlockAchievement);

  const containerRef = useReveal<HTMLElement>({
    variant: "up",
    duration: 1,
    start: "top 75%",
  });

  useEffect(() => {
    visitGalleryTab(activeTab);
    // Check if user visited all 3 tabs
    if (
      visitedTabs.includes("little-wulan") &&
      visitedTabs.includes("the-queen") &&
      visitedTabs.includes("us")
    ) {
      unlockAchievement("gallery-explorer");
    }
  }, [activeTab, visitGalleryTab, visitedTabs, unlockAchievement]);

  const currentTab = gallery.find((g) => g.id === activeTab) ?? gallery[0]!;

  const tabIcons = {
    "little-wulan": Sparkle,
    "the-queen": Heart,
    us: Users,
  };

  return (
    <section
      ref={containerRef}
      className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Section Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-pink-deep mb-3">
          <Camera className="h-3 w-3" />
          <span>Memories</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-foreground">
          Galeri <span className="italic holo-text">Kenangan</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted max-w-md mx-auto">
          Setiap senyum, tawa, dan tatapan manis yang terekam kamera.
        </p>

        {/* Tab Switcher */}
        <div className="mt-8 flex justify-center">
          <div className="glass-strong inline-flex items-center gap-1 rounded-full p-1.5 shadow-soft border border-white/40 dark:border-white/10">
            {gallery.map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tabIcons[tab.id];
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300",
                    active
                      ? "bg-pink-deep text-white shadow-sm font-semibold scale-105"
                      : "text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Polaroid Carousel */}
      <div className="relative mx-auto max-w-2xl px-2 sm:px-8">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          centeredSlides={true}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {currentTab.photos.map((photo, i) => {
            // Subtle alternating rotation for polaroid effect (-2deg to 2deg)
            const rotations = ["-rotate-1", "rotate-2", "-rotate-2", "rotate-1"];
            const rot = rotations[i % rotations.length];

            return (
              <SwiperSlide key={i} className="flex justify-center py-4">
                <div
                  className={cn(
                    "group relative w-full max-w-sm rounded-xl bg-white p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:bg-zinc-100",
                    rot,
                  )}
                >
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-pink/10">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 384px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback visually if file not yet uploaded by user
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector(".fallback-box")) {
                          const box = document.createElement("div");
                          box.className =
                            "fallback-box flex h-full w-full flex-col items-center justify-center p-6 text-center text-zinc-600";
                          box.innerHTML = `
                            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-400 mb-2">
                              📸
                            </div>
                            <p class="text-xs font-semibold">${photo.alt}</p>
                            <p class="text-[10px] text-zinc-600 mt-1">Taruh foto di ${photo.src}</p>
                          `;
                          parent.appendChild(box);
                        }
                      }}
                    />
                  </div>

                  {/* Polaroid Caption */}
                  <div className="mt-4 text-center">
                    <p className="font-serif text-sm font-medium italic text-zinc-800">
                      {photo.caption}
                    </p>
                    <p className="mt-0.5 text-[11px] text-zinc-600 uppercase tracking-wider font-sans">
                      {photo.alt}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
