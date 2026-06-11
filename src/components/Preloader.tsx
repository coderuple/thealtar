"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { lenisStore } from "@/lib/state";
import Wordmark from "@/components/Wordmark";
import { site } from "@/config/site";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const done = useRef(onComplete);
  done.current = onComplete;

  useEffect(() => {
    document.documentElement.setAttribute("data-loading", "");
    lenisStore.current?.stop();

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.removeAttribute("data-loading");
          lenisStore.current?.start();
          setGone(true);
          done.current();
        },
      });

      tl.to(".pre-mask", {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "expo.out",
        delay: 0.25,
      })
        .to(
          counter,
          {
            v: 100,
            duration: 1.9,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(counter.v)
                ).padStart(3, "0");
              }
            },
          },
          0.1
        )
        .to(".pre-front", { yPercent: -100, duration: 1, ease: "expo.inOut" })
        .to(
          ".pre-back",
          { yPercent: -100, duration: 1, ease: "expo.inOut" },
          "-=0.86"
        );
    }, rootRef);

    return () => {
      ctx.revert();
      document.documentElement.removeAttribute("data-loading");
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-100" aria-hidden>
      {/* accent curtain revealed for a beat during the wipe */}
      <div className="pre-back absolute inset-0 bg-ember" />

      <div className="pre-front absolute inset-0 flex flex-col justify-between bg-bg p-[4vw]">
        <span className="overflow-hidden">
          <span className="pre-mask micro block translate-y-[110%] text-muted">
            {site.host} presents
          </span>
        </span>

        <div className="flex items-center justify-center">
          <span className="overflow-hidden">
            <span className="pre-mask block translate-y-[110%]">
              <Wordmark className="text-[16vw] text-cream" />
            </span>
          </span>
        </div>

        <div className="flex items-end justify-between">
          <span className="overflow-hidden">
            <span className="pre-mask micro block translate-y-[110%] text-muted">
              {site.date.label} — {site.venue.name}
            </span>
          </span>
          <span
            ref={counterRef}
            className="font-display text-6xl text-ember tabular-nums md:text-8xl"
          >
            000
          </span>
        </div>
      </div>
    </div>
  );
}
