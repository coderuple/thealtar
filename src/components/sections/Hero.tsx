"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site, TICKETS_URL } from "@/config/site";
import MagneticButton from "@/components/MagneticButton";

export default function Hero({ loaded }: { loaded: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-lockup", {
        autoAlpha: 0,
        scale: 0.86,
        filter: "blur(16px)",
        transformOrigin: "50% 55%",
      });
      gsap.set(".hero-fade", { autoAlpha: 0, y: 24 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      // the logo breathes in — fade up from a soft blur with a slow zoom
      tl.to(".hero-lockup", {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 3.2,
        ease: "power2.out",
      }).to(
        ".hero-fade",
        { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: "power3.out" },
        "-=1.7"
      );
    }, rootRef);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-svh flex-col justify-between px-[4vw] pb-10 pt-32"
    >
      <div className="flex flex-col items-center text-center">
        <span className="hero-fade micro block text-muted">
          {site.host} presents
        </span>

        {/* Logo lockup — matches the official key art: THE over AL✝AR,
            cross rising above the caps and dropping below the baseline,
            script tagline under-left, year under-right. Everything is
            em-based, so it scales with the font-size on this wrapper. */}
        <div className="hero-lockup font-display mt-10 w-max max-w-full text-[23vw] uppercase leading-none text-cream md:text-[17vw]">
          <h1 aria-label={`The Altar ${site.year}`}>
            <span className="block text-center text-[0.205em] indent-[0.42em] tracking-[0.42em]">
              The
            </span>
            <span className="mt-[0.02em] flex items-center justify-center">
              <span aria-hidden>AL</span>
              <svg
                viewBox="0 0 44 78"
                className="mx-[-0.008em] inline-block h-[0.99em] w-auto"
                fill="currentColor"
                aria-hidden
              >
                <path d="M17 0h10v13h13v10H27v55H17V23H4V13h13z" />
              </svg>
              <span aria-hidden>AR</span>
            </span>
          </h1>
          <div className="mt-[-0.085em] flex items-end justify-between gap-[0.2em] px-[0.015em]">
            <span className="font-serif block pb-[0.01em] text-[0.082em] normal-case italic leading-tight tracking-normal text-cream/90 [text-shadow:0_1px_20px_rgb(0_0_0/0.7)]">
              {site.tagline}
            </span>
            <span className="text-outline-ember block text-[0.16em]">
              {site.year}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="hero-fade flex flex-col gap-1">
          <span className="micro text-cream">{site.date.label} — 6PM</span>
          <span className="micro text-muted">
            {site.venue.name} · {site.venue.city}
          </span>
        </div>

        <div className="hero-fade hidden flex-col items-center gap-3 md:flex">
          <span className="micro text-muted">Scroll</span>
          <span className="relative block h-14 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-hint_1.8s_ease-in-out_infinite] bg-ember" />
          </span>
        </div>

        <div className="hero-fade">
          <MagneticButton href={TICKETS_URL} external>
            Get Tickets <span aria-hidden>→</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
