"use client";

import { Quote, Star } from "lucide-react";
import { FadeIn } from "./fade-in";

const TESTIMONIALS = [
  {
    name: "Maya Chen",
    role: "Book club host, Portland",
    initials: "MC",
    quote:
      "Every parcel feels like a gift from a friend who knows my taste. Our club has ordered together for three years running.",
  },
  {
    name: "Daniel Okafor",
    role: "High-school teacher",
    initials: "DO",
    quote:
      "Their staff picks rescued my reading slump. Hand-written notes in the wrap make my students fight over the box.",
  },
  {
    name: "Sofia Ramirez",
    role: "Illustrator & mom of two",
    initials: "SR",
    quote:
      "The Sunday reading room is our little ritual. Warm coffee, no phones, and shelves you can actually trust.",
  },
];

/** Social proof — three realistic customer testimonials. */
export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-clay">
            Social proof
          </p>
          <h2
            id="testimonials-title"
            className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-espresso sm:text-4xl"
          >
            Readers who keep coming back
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-border/70 bg-card p-7 shadow-sm transition-shadow hover:shadow-md">
                <Quote className="h-7 w-7 text-ember/60" aria-hidden="true" />
                <div
                  className="mt-3 flex gap-0.5"
                  role="img"
                  aria-label="Rated 5 out of 5 stars"
                >
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-ember text-ember" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-espresso/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-5">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-heading text-sm font-extrabold text-accent-foreground"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-espresso">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
