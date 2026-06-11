"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/config/site";
import SectionHead from "@/components/SectionHead";
import AnimatedText from "@/components/AnimatedText";

export default function Lineup() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // Floating portrait follows the cursor across the list (desktop only)
  useEffect(() => {
    const wrap = wrapRef.current;
    const float = floatRef.current;
    if (!wrap || !float) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(float, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(float, "y", { duration: 0.6, ease: "power3" });
    const rTo = gsap.quickTo(float, "rotation", {
      duration: 0.8,
      ease: "power3",
    });

    let lastX = 0;
    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xTo(x);
      yTo(y);
      rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.5));
      lastX = e.clientX;
    };
    wrap.addEventListener("mousemove", onMove, { passive: true });
    return () => wrap.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    gsap.to(floatRef.current, {
      autoAlpha: active === null ? 0 : 1,
      scale: active === null ? 0.85 : 1,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active]);

  // Rows rise in on first scroll into view
  useEffect(() => {
    const rows = rowsRef.current?.querySelectorAll(".lineup-row");
    if (!rows?.length) return;
    const tween = gsap.from(rows, {
      y: 48,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: { trigger: rowsRef.current, start: "top 80%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="lineup" className="relative px-[4vw] py-32">
      <SectionHead index="02" label="The Lineup" />
      <AnimatedText
        as="h2"
        className="font-display mt-10 text-[11vw] uppercase leading-[0.92] md:text-[6.5vw]"
      >
        Six voices. One sound.
      </AnimatedText>

      {/* Desktop — typographic list with cursor-following portrait */}
      <div
        ref={wrapRef}
        className="relative mt-16 hidden md:block"
        onMouseLeave={() => setActive(null)}
      >
        <div ref={rowsRef}>
          {site.lineup.map((person, i) => (
            <div
              key={person.name}
              data-cursor
              onMouseEnter={() => setActive(i)}
              className="lineup-row group flex items-baseline gap-8 border-t border-line py-7 last:border-b"
            >
              <span className="font-display text-sm text-muted transition-colors duration-300 group-hover:text-ember">
                0{i + 1}
              </span>
              <h3 className="font-display text-[5vw] uppercase leading-none text-cream transition-all duration-300 group-hover:translate-x-3 group-hover:text-ember">
                {person.name}
              </h3>
              <span className="micro ml-auto text-muted">{person.role}</span>
            </div>
          ))}
        </div>

        {/* IMAGE SLOTS — /public/images/speakers/*.jpg, 3:4 portraits */}
        <div
          ref={floatRef}
          className="pointer-events-none invisible absolute left-0 top-0 z-10 aspect-3/4 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-0"
        >
          {site.lineup.map((person, i) => (
            <img
              key={person.name}
              src={person.image}
              alt=""
              aria-hidden
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile — swipeable portrait cards */}
      <div className="mx-[-4vw] mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[4vw] pb-4 md:hidden">
        {site.lineup.map((person, i) => (
          <figure key={person.name} className="w-[70vw] shrink-0 snap-center">
            <div className="aspect-3/4 overflow-hidden border border-line">
              <img
                src={person.image}
                alt={`${person.name} — ${person.role}`}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-xs text-ember">0{i + 1}</span>
              <span className="font-display text-2xl uppercase leading-none">
                {person.name}
              </span>
            </figcaption>
            <p className="micro mt-2 text-muted">{person.role}</p>
          </figure>
        ))}
      </div>
    </section>
  );
}
