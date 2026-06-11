import { site, TICKETS_URL, ACCESSIBLE_TICKETS_URL } from "@/config/site";
import SectionHead from "@/components/SectionHead";
import AnimatedText from "@/components/AnimatedText";
import MagneticButton from "@/components/MagneticButton";

export default function Tickets() {
  return (
    <section id="tickets" className="relative px-[4vw] py-32">
      <SectionHead index="05" label="Tickets" />
      <AnimatedText
        as="h2"
        className="font-display mt-10 text-[11vw] uppercase leading-[0.92] md:text-[6.5vw]"
      >
        Be in the room
      </AnimatedText>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
        {/* Featured card with rotating ember border */}
        <div className="relative overflow-hidden rounded-2xl p-px">
          <span
            aria-hidden
            className="absolute inset-[-40%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0%,var(--ember)_12%,var(--flame)_18%,transparent_28%)] motion-reduce:animate-none"
          />
          <div className="relative flex h-full flex-col gap-6 rounded-2xl bg-surface p-9">
            <span className="micro text-ember">General Admission</span>
            <h3 className="font-display text-4xl uppercase leading-none">
              Tickets
            </h3>
            <p className="leading-relaxed text-muted">
              All seated tiers for {site.date.label}, sold exclusively through
              AXS — the official ticketing partner of {site.venue.name}.
            </p>
            <div className="mt-auto">
              <MagneticButton href={TICKETS_URL} external>
                Get Tickets <span aria-hidden>→</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface/80 p-9 backdrop-blur-sm transition-colors duration-500 hover:border-ember/50">
          <span className="micro text-muted">Accessibility</span>
          <h3 className="font-display text-4xl uppercase leading-none">
            Wheelchair Accessible Seating
          </h3>
          <p className="leading-relaxed text-muted">
            Dedicated accessible seating with step-free access, bookable
            directly through AXS.
          </p>
          <div className="mt-auto">
            <MagneticButton href={ACCESSIBLE_TICKETS_URL} variant="ghost" external>
              Select Tickets <span aria-hidden>→</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      <p className="micro mx-auto mt-12 max-w-2xl text-center leading-loose text-cream/85">
        Tickets are displayed on your phone via the OVO Arena Wembley or AXS
        app · AXS Official Resale is the only legitimate resale platform —
        tickets from unauthorised sellers will not be valid.
      </p>
    </section>
  );
}
