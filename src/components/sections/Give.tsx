"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/config/site";
import SectionHead from "@/components/SectionHead";
import AnimatedText from "@/components/AnimatedText";
import MagneticButton from "@/components/MagneticButton";

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — value is still visible to copy manually
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor
      aria-label={`Copy ${label}: ${value}`}
      className="group/copy flex w-full items-baseline justify-between gap-3 border-b border-line py-3 text-left transition-colors duration-300 last:border-b-0 hover:border-ember/50"
    >
      <span className="micro shrink-0 text-muted">{label}</span>
      <span className="text-right text-sm tracking-wide text-cream transition-colors duration-300 group-hover/copy:text-ember">
        {copied ? "Copied ✓" : value}
      </span>
    </button>
  );
}

const iconClass = "size-8";
const icons = {
  text: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
      <path d="M21 4H3v12h4v4l5-4h9V4z" />
      <path d="M7 10h.01M12 10h.01M17 10h.01" strokeLinecap="round" strokeWidth="2" />
    </svg>
  ),
  cash: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="6.5" width="20" height="11" rx="1.5" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M5.5 9.5v.01M18.5 14.5v.01" strokeLinecap="round" strokeWidth="2" />
    </svg>
  ),
  online: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 9.5h20M5.5 14.5h5" strokeLinecap="round" />
    </svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9.5 12 4l9 5.5M5 9.5V19M9.7 9.5V19M14.3 9.5V19M19 9.5V19M3 19h18" />
    </svg>
  ),
};

export default function Give() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { giving } = site;

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".give-card");
    if (!cards?.length) return;
    const tween = gsap.from(cards, {
      y: 56,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const cardBase =
    "give-card flex flex-col gap-5 border border-line bg-surface/70 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-ember/50";

  return (
    <section id="give" className="relative px-[4vw] py-32">
      <SectionHead index="06" label="Giving" />
      <AnimatedText
        as="h2"
        className="font-display mt-10 text-[11vw] uppercase leading-[0.92] md:text-[6.5vw]"
      >
        Ways to give
      </AnimatedText>
      <p className="font-serif mt-6 max-w-xl text-xl italic text-muted md:text-2xl">
        Partner with the vision — every gift helps build the altar.
      </p>

      <div ref={gridRef} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* 01 — Text to give */}
        <div className={cardBase}>
          <span className="text-ember">{icons.text}</span>
          <h3 className="font-display text-3xl uppercase leading-none">Text</h3>
          <p className="text-sm leading-relaxed text-muted">{giving.text.note}</p>
          <div className="mt-auto border-t border-line pt-5">
            <span className="micro text-muted">{giving.text.example}</span>
            <div className="font-display mt-2 flex items-baseline gap-3 text-2xl uppercase">
              <span className="text-cream">{giving.text.keyword} 5</span>
              <span aria-hidden className="text-muted">→</span>
              <span className="text-ember">{giving.text.shortcode}</span>
            </div>
          </div>
        </div>

        {/* 02 — Cash */}
        <div className={cardBase}>
          <span className="text-ember">{icons.cash}</span>
          <h3 className="font-display text-3xl uppercase leading-none">Cash</h3>
          <p className="text-sm leading-relaxed text-muted">{giving.cash}</p>
          <div className="mt-auto border-t border-line pt-5">
            <span className="micro text-muted">At the venue · envelopes available from ushers</span>
          </div>
        </div>

        {/* 03 — Online (featured) */}
        <div className="give-card relative flex flex-col gap-5 overflow-hidden bg-ember p-8 text-bg">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-flame/40 blur-3xl"
          />
          <span className="relative">{icons.online}</span>
          <h3 className="font-display relative text-3xl uppercase leading-none">
            Online
          </h3>
          <p className="relative text-sm leading-relaxed text-bg/75">
            The fastest way to give — secure online giving from anywhere in the
            world, before, during or after the night.
          </p>
          <div className="relative mt-auto">
            <MagneticButton href={giving.onlineUrl} variant="dark" external>
              Give Now <span aria-hidden>→</span>
            </MagneticButton>
          </div>
        </div>

        {/* 04 — Bank transfer */}
        <div className={cardBase}>
          <span className="text-ember">{icons.bank}</span>
          <h3 className="font-display text-3xl uppercase leading-none">
            Bank Transfer
          </h3>
          <p className="text-sm leading-relaxed text-muted">
            Give directly by transfer — tap any detail to copy it.
          </p>
          <div className="mt-auto flex flex-col border-t border-line">
            <CopyRow label="Sort Code" value={giving.bank.sortCode} />
            <CopyRow label="Account No." value={giving.bank.accountNumber} />
            <CopyRow label="Name" value={giving.bank.accountName} />
          </div>
        </div>
      </div>
    </section>
  );
}
