"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { lenisStore } from "@/lib/state";
import Wordmark from "@/components/Wordmark";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    lenisStore.current?.scrollTo(href, { duration: 1.6 });
  };

  return (
    <footer className="relative z-10 border-t border-line bg-surface/60">
      {/* Giant outlined wordmark drifting across the footer */}
      <div className="select-none overflow-hidden py-12" aria-hidden>
        <div className="flex w-max animate-marquee-slow motion-reduce:animate-none">
          {[0, 1].map((half) => (
            <div key={half} className="flex w-max shrink-0 items-center">
              {[0, 1].map((rep) => (
                <span key={rep} className="flex items-baseline gap-8 pr-16">
                  <span className="font-display text-outline text-[14vw] uppercase leading-none">
                    The
                  </span>
                  <Wordmark className="text-outline text-[14vw] leading-none" />
                  <span className="font-display text-[14vw] uppercase leading-none text-ember/20">
                    {site.year}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-12 px-[4vw] pb-16 md:grid-cols-12">
        <div className="md:col-span-4">
          {/* IMAGE SLOT — /public/images/logos/jesus-house.png */}
          <img
            src={site.images.hostLogo}
            alt="Jesus House"
            className="h-10 w-auto"
          />
          <p className="mt-6 max-w-xs leading-relaxed text-muted">
            Hosted by {site.host}, London. {site.tagline} — {site.date.label},{" "}
            {site.venue.name}.
          </p>
          <a
            href={site.hostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="micro mt-4 inline-block text-ember"
          >
            jesushouse.org.uk
          </a>
        </div>

        <nav className="md:col-span-2" aria-label="Footer">
          <h4 className="micro text-muted">Navigate</h4>
          <ul className="mt-5 flex flex-col gap-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => goTo(e, item.href)}
                  className="text-sm uppercase tracking-wider text-cream transition-colors duration-300 hover:text-ember"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h4 className="micro text-muted">Follow</h4>
          <ul className="mt-5 flex flex-col gap-3">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="text-sm uppercase tracking-wider text-cream transition-colors duration-300 hover:text-ember"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="micro text-muted">Stay in the loop</h4>
          {subscribed ? (
            <p className="font-serif mt-5 text-xl italic text-ember">
              You&apos;re on the list. See you at the altar.
            </p>
          ) : (
            <form
              className="mt-5 flex border-b border-line focus-within:border-ember"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-transparent py-3 text-sm text-cream placeholder:text-muted focus:outline-none"
              />
              <button
                type="submit"
                data-cursor
                className="micro shrink-0 px-2 py-3 text-ember"
              >
                Join →
              </button>
            </form>
          )}
          <p className="micro mt-4 text-muted/70">
            Event updates from {site.host}. No spam.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-line px-[4vw] py-6 md:flex-row md:items-center md:justify-between">
        <span className="micro text-muted">
          © {site.year} {site.host} · The Altar — All rights reserved
        </span>
        <span className="micro text-muted">
          {site.date.short} — {site.venue.city}
        </span>
      </div>
    </footer>
  );
}
