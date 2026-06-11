"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { site } from "@/config/site";
import SectionHead from "@/components/SectionHead";

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let split: SplitText | null = null;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled || !textRef.current) return;
      split = new SplitText(textRef.current, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
          },
        }
      );
    });

    return () => {
      cancelled = true;
      split?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="vision" className="relative h-[280vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        {/* IMAGE SLOT — /public/images/bg/cathedral-texture.jpg */}
        <img
          src={site.images.cathedral}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-[0.07]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-[4vw]">
          <SectionHead index="01" label="The Vision" />
          <p
            ref={textRef}
            className="font-serif mt-12 text-[6.4vw] leading-[1.18] md:text-[3.4vw]"
          >
            {site.manifesto}
          </p>
          <p className="micro mt-12 text-muted">
            One night · One sound · One altar
          </p>
        </div>
      </div>
    </section>
  );
}
