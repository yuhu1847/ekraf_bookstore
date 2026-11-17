"use client";

import { BookmarkCheck, Leaf, Truck } from "lucide-react";
import { FadeIn } from "./fade-in";

const FEATURES = [
  {
    icon: BookmarkCheck,
    title: "Hand-picked curation",
    body: "Two booksellers read every title before it reaches the shelf. If we wouldn't gift it, we don't sell it.",
  },
  {
    icon: Truck,
    title: "Free shipping over $35",
    body: "Every parcel is wrapped by hand and sent carbon-neutral, anywhere in the world, at no extra cost.",
  },
  {
    icon: Leaf,
    title: "Plastic-free packaging",
    body: "Recycled wraps, paper tape and seed-paper bookmarks. Nothing plastic ever leaves our shop.",
  },
];

/** Core benefits — concise 3-column grid. */
export function Features() {
  return (
    <section aria-labelledby="features-title" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        <FadeIn>
          <h2 id="features-title" className="sr-only">
            Why shop with us
          </h2>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <article className="h-full rounded-3xl border border-border/70 bg-card/80 p-7 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <f.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-espresso">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
