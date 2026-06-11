/**
 * ═══════════════════════════════════════════════════════════════════
 *  THE ALTAR 2026 — SITE CONTENT
 *
 *  Everything about the event is edited here: copy, links, lineup,
 *  timings, FAQs and image paths.
 *
 *  COLORS live in src/app/globals.css (the THEME block at the top).
 *
 *  IMAGES — labeled placeholders live in /public/images/**.
 *  Replace any of them with a real photo at the exact same path
 *  (same filename) and it appears on the site — no edits needed here.
 * ═══════════════════════════════════════════════════════════════════
 */

// ── Ticketing ────────────────────────────────────────────────────────
export const TICKETS_URL =
  "https://www.axs.com/uk/events/1423429/the-altar-tickets";
// Wheelchair accessible seating is selected on the same AXS event page.
export const ACCESSIBLE_TICKETS_URL =
  "https://www.axs.com/uk/events/1423429/the-altar-tickets";

export const site = {
  name: "The Altar",
  year: "2026",
  tagline: "Rekindling the Passion of Worship",
  host: "Jesus House",
  hostUrl: "https://jesushouse.org.uk",

  // Public site URL — used for metadata / social cards. TODO: real domain.
  url: "https://thealtar2026.com",

  description:
    "An unforgettable night of worship at OVO Arena Wembley, London — 26 June 2026. Darlene Zschech, Pst. Nathaniel Bassey, Chevelle Franklyn, Sunmisola Agbebi, MOGmusic and Lou Fellingham. Hosted by Jesus House.",

  date: {
    label: "Fri 26 June 2026",
    short: "26.06.2026",
    isoStart: "2026-06-26T18:00:00+01:00",
    isoEnd: "2026-06-26T23:00:00+01:00",
    isoDoors: "2026-06-26T17:00:00+01:00",
  },

  venue: {
    name: "OVO Arena Wembley",
    address: "Arena Square, London HA9 0AA",
    city: "London",
    country: "GB",
    directionsUrl: "https://maps.google.com/?q=OVO+Arena+Wembley",
  },

  manifesto:
    "Imagine thousands of voices lifting up one sound in heartfelt unison. This is more than an event — it is a collective moment to build an altar of worship, seek breakthrough, and experience a move of the Spirit together.",

  lineup: [
    {
      name: "Darlene Zschech",
      role: "Worship Leader · Songwriter",
      image: "/images/speakers/darlene-zschech.jpg",
    },
    {
      name: "Nathaniel Bassey",
      role: "Pastor · Worship Leader",
      image: "/images/speakers/nathaniel-bassey.jpg",
    },
    {
      name: "Chevelle Franklyn",
      role: "Gospel Artist",
      image: "/images/speakers/chevelle-franklyn.jpg",
    },
    {
      name: "Sunmisola Agbebi",
      role: "Worship Leader",
      image: "/images/speakers/sunmisola-agbebi.jpg",
    },
    {
      name: "MOGmusic",
      role: "Gospel Minister",
      image: "/images/speakers/mogmusic.jpg",
    },
    {
      name: "Lou Fellingham",
      role: "Singer · Worship Leader",
      image: "/images/speakers/lou-fellingham.jpg",
    },
  ],

  timeline: [
    { time: "17:00", label: "Doors Open" },
    { time: "18:00", label: "Worship Begins" },
    { time: "23:00", label: "Finish" },
  ],
  timelineNote: "*All timings are approximate and subject to change.",

  images: {
    keyart: "/images/hero/keyart.jpg", // official poster — mobile / reduced-motion hero
    cathedral: "/images/bg/cathedral-texture.jpg",
    venue: [
      "/images/venue/ovo-arena-1.jpg",
      "/images/venue/ovo-arena-2.jpg",
      "/images/venue/ovo-arena-3.jpg",
    ],
    ogImage: "/images/og/og-image.jpg", // 1200×630 social card — replace with the key art
    hostLogo: "/images/logos/jesus-house.png",
  },

  giving: {
    onlineUrl: "https://www.paypal.com/donate/?hosted_button_id=6T347XDHYLV9A",
    text: {
      shortcode: "70450",
      keyword: "ALTAR",
      note: "Text ALTAR followed by your amount to 70450.",
      example: "e.g. to give £5, text “ALTAR 5”",
    },
    cash: "Pick up a cash envelope at the venue, indicate “The Altar” and your donation amount, and hand it to the ushers.",
    bank: {
      sortCode: "30-96-19",
      accountNumber: "01048423",
      accountName: "Jesus House - The Altar",
    },
  },

  faqs: [
    {
      q: "How do tickets work?",
      a: "Tickets are sold exclusively through AXS. For this show you'll need to display your ticket on your phone via the OVO Arena Wembley or AXS app. Ticket purchasers will receive an email with news and information on AXS Mobile ID tickets.",
    },
    {
      q: "What is the bag policy?",
      a: "Please keep personal belongings to a minimum — there are no storage facilities at the venue. Bags larger than 30cm × 40cm × 20cm (approx. A3 size) are strictly prohibited, as are rucksacks, backpacks, luggage and holdalls of any kind. Failure to comply may result in late or non-admission.",
      linkLabel: "Find local bag storage via Stasher",
      linkHref: "https://stasher.com",
    },
    {
      q: "What time should I arrive?",
      a: "Premium entrance opens at 12:00pm, general doors at 5:00pm, and worship begins at 6:00pm with an expected finish around 11:00pm. All timings are approximate and subject to change.",
    },
    {
      q: "Can I resell my ticket?",
      a: "AXS Official Resale is the only legitimate place to re-sell tickets purchased through AXS.com. Tickets sold on unauthorised platforms will not be valid.",
    },
    {
      q: "Is the venue accessible?",
      a: "Yes — wheelchair accessible seating is available and can be booked directly through AXS. OVO Arena Wembley also provides step-free access and accessible facilities throughout.",
      linkLabel: "Book accessible seating",
      linkHref: ACCESSIBLE_TICKETS_URL,
    },
  ],

  // TODO: point these at the real Jesus House social profiles.
  socials: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "X / Twitter", href: "#" },
  ],

  nav: [
    { label: "Vision", href: "#vision" },
    { label: "Lineup", href: "#lineup" },
    { label: "The Night", href: "#night" },
    { label: "Venue", href: "#venue" },
    { label: "Tickets", href: "#tickets" },
    { label: "Give", href: "#give" },
    { label: "FAQ", href: "#faq" },
  ],
};
