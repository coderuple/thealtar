"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/config/site";
import SectionHead from "@/components/SectionHead";
import AnimatedText from "@/components/AnimatedText";

function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tween = gsap.fromTo(
      imgRef.current,
      { yPercent: -9 },
      {
        yPercent: 9,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.3,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`overflow-hidden border border-line ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="h-full w-full scale-[1.18] object-cover"
      />
    </div>
  );
}

export default function Venue() {
  return (
    <section id="venue" className="relative px-[4vw] py-32">
      <SectionHead index="04" label="The Venue" />

      <div className="mt-12 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          {/* IMAGE SLOT — /public/images/venue/ovo-arena-1.jpg, 16:10 */}
          <ParallaxImage
            src={site.images.venue[0]}
            alt="Inside OVO Arena Wembley"
            className="aspect-16/10"
          />
        </div>

        <div className="flex flex-col justify-between gap-10 md:col-span-5">
          <div>
            <AnimatedText
              as="h2"
              className="font-display text-[10vw] uppercase leading-[0.92] md:text-[3.6vw]"
            >
              OVO Arena Wembley
            </AnimatedText>
            <p className="mt-6 max-w-md leading-relaxed text-cream/90">
              Thousands of voices under one legendary roof. Minutes from
              Wembley Park and Wembley Stadium stations, in the heart of
              London&apos;s most iconic events district.
            </p>
            <p className="micro mt-8 text-cream">{site.venue.address}</p>
            <a
              href={site.venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="micro group mt-4 inline-flex items-center gap-3 text-ember"
            >
              Get Directions
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-2"
              >
                →
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* IMAGE SLOTS — /public/images/venue/ovo-arena-2 & -3 */}
            <ParallaxImage
              src={site.images.venue[1]}
              alt="Crowd in worship"
              className="aspect-3/4"
            />
            <ParallaxImage
              src={site.images.venue[2]}
              alt="Arena exterior at night"
              className="mt-10 aspect-3/4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
