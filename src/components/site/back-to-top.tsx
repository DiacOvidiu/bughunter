"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

const SHOW_AFTER_PX = 480;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setVisible(window.scrollY > SHOW_AFTER_PX);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const handleClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Înapoi sus"
      title="Înapoi sus"
      className={cn(
        "fixed z-50 grid size-11 place-items-center rounded-full",
        "bg-linear-to-br from-indigo-600 to-violet-600 text-white",
        "shadow-[0_4px_24px_rgba(99,102,241,0.45),0_0_0_1px_rgba(255,255,255,0.08)_inset]",
        "transition-all duration-300 ease-out",
        "hover:scale-110 hover:shadow-[0_6px_32px_rgba(99,102,241,0.6),0_0_0_1px_rgba(255,255,255,0.12)_inset]",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "right-4 sm:right-6 lg:right-8",
        "bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 lg:bottom-8",
        "sm:size-12",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
      )}
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  );
}
