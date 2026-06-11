"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/config/site";
import SectionHead from "@/components/SectionHead";
import AnimatedText from "@/components/AnimatedText";

export default function TheNight() {
  const listRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        railRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.4,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".night-item").forEach((item) => {
        gsap.from(item, {
          x: -32,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 78%", once: true },
        });
        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 62%",
            end: "bottom 30%",
            toggleClass: { targets: item, className: "is-active" },
          },
        });
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section id="night" className="relative px-[4vw] py-32">
      <SectionHead index="03" label="The Night" />
      <AnimatedText
        as="h2"
        className="font-display mt-10 text-[11vw] uppercase leading-[0.92] md:text-[6.5vw]"
      >
        How the evening unfolds
      </AnimatedText>

      <ol ref={listRef} className="relative ml-1 mt-16 max-w-3xl border-l border-line">
        <span
          ref={railRef}
          aria-hidden
          className="absolute -left-px top-0 h-full w-px origin-top bg-ember"
        />
        {site.timeline.map((item) => (
          <li key={item.time} className="night-item group relative py-9 pl-10">
            <span
              aria-hidden
              className="absolute -left-[5px] top-[4.4rem] size-[9px] rounded-full bg-line transition-all duration-500 group-[.is-active]:bg-flame group-[.is-active]:shadow-[0_0_14px_var(--flame)]"
            />
            <span className="micro text-muted">{item.label}</span>
            <div className="font-display mt-1 text-5xl uppercase leading-none text-cream transition-colors duration-500 group-[.is-active]:text-ember md:text-7xl">
              {item.time}
            </div>
          </li>
        ))}
      </ol>

      <p className="micro mt-10 text-muted">{site.timelineNote}</p>
    </section>
  );
}
