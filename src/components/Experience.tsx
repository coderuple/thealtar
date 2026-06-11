"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { introState } from "@/lib/state";
import { site } from "@/config/site";

import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Marquee from "@/components/Marquee";
import Hero from "@/components/sections/Hero";
import Vision from "@/components/sections/Vision";
import Lineup from "@/components/sections/Lineup";
import TheNight from "@/components/sections/TheNight";
import Venue from "@/components/sections/Venue";
import Tickets from "@/components/sections/Tickets";
import Give from "@/components/sections/Give";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

const EmberScene = dynamic(() => import("@/components/canvas/EmberScene"), {
  ssr: false,
});

const marqueeItems = [
  site.tagline,
  site.date.short,
  site.venue.name,
  site.venue.city,
];

/** The official key art — sits behind the WebGL flame on desktop, and is
    the hero on its own for small screens / reduced motion / no WebGL.
    Fades back as the visitor scrolls so content sections stay legible. */
function Poster() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 1 },
      {
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.6}`,
          scrub: 0.4,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* IMAGE SLOT — /public/images/hero/keyart.jpg, official poster */}
      <img
        src={site.images.keyart}
        alt=""
        aria-hidden
        className="h-full w-full animate-slow-zoom object-cover opacity-50 motion-reduce:animate-none"
      />
      <div className="absolute inset-0 bg-linear-to-b from-bg/60 via-bg/30 to-bg" />
    </div>
  );
}

export default function Experience() {
  const [loaded, setLoaded] = useState(false);
  const [heavy, setHeavy] = useState<boolean | null>(null);

  useEffect(() => {
    const wantsMotion = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    ).matches;
    let webgl = false;
    try {
      const canvas = document.createElement("canvas");
      webgl = !!(
        canvas.getContext("webgl2") || canvas.getContext("webgl")
      );
    } catch {
      webgl = false;
    }
    setHeavy(wantsMotion && webgl);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    gsap.to(introState, { z: 9.5, duration: 3.4, ease: "power2.out" });
    ScrollTrigger.refresh();
  }, [loaded]);

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Persistent cinematic backdrop — key art with the flame over it */}
      <div className="fixed inset-0 z-0" aria-hidden>
        {heavy !== null && <Poster />}
        {heavy === true && (
          <div className="absolute inset-0">
            <EmberScene />
          </div>
        )}
      </div>

      <Nav loaded={loaded} />

      <main className="relative z-10">
        <Hero loaded={loaded} />
        <Marquee items={marqueeItems} />
        <Vision />
        <Lineup />
        <TheNight />
        <Marquee items={[site.tagline, "One Night", "One Sound", "One Altar"]} speed="slow" />
        <Venue />
        <Tickets />
        <Give />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
