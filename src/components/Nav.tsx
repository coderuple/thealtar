"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { lenisStore } from "@/lib/state";
import { site, TICKETS_URL } from "@/config/site";
import Wordmark from "@/components/Wordmark";

export default function Nav({ loaded }: { loaded: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(barRef.current, { yPercent: -110 });
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    gsap.to(barRef.current, {
      yPercent: 0,
      duration: 1,
      ease: "expo.out",
      delay: 0.15,
    });
  }, [loaded]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (open) {
      lenisStore.current?.stop();
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
      gsap.fromTo(
        overlay.querySelectorAll(".menu-link"),
        { yPercent: 120 },
        { yPercent: 0, duration: 0.9, stagger: 0.07, ease: "expo.out", delay: 0.1 }
      );
    } else {
      lenisStore.current?.start();
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.35,
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [open]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // slight delay lets the overlay fade before scrolling
    setTimeout(() => {
      lenisStore.current?.scrollTo(href, { duration: 1.6 });
    }, 60);
  };

  return (
    <>
      <header
        ref={barRef}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "border-b border-line bg-bg/75 backdrop-blur-md" : ""
        }`}
      >
        <nav className="flex items-center justify-between px-[4vw] py-4">
          <a
            href="#top"
            onClick={(e) => goTo(e, "#top")}
            className="flex items-baseline gap-2 text-cream"
            aria-label="The Altar 2026 — back to top"
          >
            <span className="font-display text-lg uppercase">The</span>
            <Wordmark className="text-lg" />
            <span className="font-display text-lg text-ember">{site.year}</span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => goTo(e, item.href)}
                  className="micro text-cream/80 transition-colors duration-300 hover:text-ember"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="micro hidden rounded-full bg-ember px-6 py-3 text-bg transition-colors duration-300 hover:bg-flame md:inline-block"
            >
              Get Tickets
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="micro flex items-center gap-2 text-cream lg:hidden"
            >
              <span className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                    open ? "translate-y-[-5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen menu (mobile / tablet) */}
      <div
        ref={overlayRef}
        className="invisible fixed inset-0 z-40 hidden flex-col justify-center bg-bg/95 px-[6vw] backdrop-blur-xl"
      >
        <nav aria-label="Menu">
          <ul className="flex flex-col gap-2">
            {site.nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={(e) => goTo(e, item.href)}
                  className="menu-link flex items-baseline gap-4 py-1"
                >
                  <span className="font-display text-sm text-ember">
                    0{i + 1}
                  </span>
                  <span className="font-display text-5xl uppercase leading-none text-cream md:text-7xl">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={TICKETS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="micro mt-12 inline-block w-max rounded-full bg-ember px-8 py-4 text-bg"
        >
          Get Tickets — AXS
        </a>
      </div>
    </>
  );
}
