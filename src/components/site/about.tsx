"use client";

import { Coffee, HeartHandshake, Package, Quote } from "lucide-react";
import { FadeIn } from "./fade-in";

/**
 * About us — bento grid with generous whitespace.
 * All body copy is kept under 3 lines per paragraph.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-clay">
            About us
          </p>
          <h2
            id="about-title"
            className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-espresso sm:text-4xl"
          >
            A small shop with strong opinions about books
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-3 lg:grid-cols-4">
          {/* Story — wide card */}
          <FadeIn className="md:col-span-2" delay={0.05}>
            <article className="h-full rounded-3xl border border-border/70 bg-card p-7 shadow-sm lg:p-9">
              <h3 className="font-heading text-xl font-bold text-espresso">
                Our story
              </h3>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">
                We started in 2016 with one shelf, a second-hand till and a simple
                rule: two of us read every book before it goes on sale. Nine years
                later the rule hasn&apos;t changed — only the number of shelves.
              </p>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">
                Today we ship hand-wrapped parcels worldwide from a sunlit corner
                shop in Portland.
              </p>
              <p className="mt-5 font-heading text-sm font-bold italic text-mocha-deep">
                — June &amp; Amara, owners
              </p>
            </article>
          </FadeIn>

          {/* Stat cards */}
          <FadeIn delay={0.1}>
            <article className="flex h-full flex-col justify-between rounded-3xl bg-mocha p-7 text-cream shadow-sm">
              <Package className="h-7 w-7 text-cream/80" aria-hidden="true" />
              <div>
                <p className="font-heading text-4xl font-extrabold">12k+</p>
                <p className="mt-1 text-sm text-cream/85">
                  readers shipped to since 2016
                </p>
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={0.15}>
            <article className="flex h-full flex-col justify-between rounded-3xl bg-ember p-7 text-cream shadow-sm">
              <HeartHandshake className="h-7 w-7 text-cream/80" aria-hidden="true" />
              <div>
                <p className="font-heading text-4xl font-extrabold">140+</p>
                <p className="mt-1 text-sm text-cream/85">
                  indie titles curated each year
                </p>
              </div>
            </article>
          </FadeIn>

          {/* Motto card */}
          <FadeIn className="md:col-span-2" delay={0.1}>
            <article className="relative h-full overflow-hidden rounded-3xl border border-border/70 bg-sand p-7 shadow-sm lg:p-9">
              <Quote className="absolute right-6 top-6 h-10 w-10 text-mocha/20" aria-hidden="true" />
              <p className="max-w-md font-heading text-2xl font-extrabold leading-snug text-espresso">
                “Buy less. Choose well. Read slowly.”
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                The motto painted above our door — and on every gift wrap.
              </p>
            </article>
          </FadeIn>

          {/* Reading room card */}
          <FadeIn className="md:col-span-2" delay={0.15}>
            <article className="flex h-full items-center gap-5 rounded-3xl border border-border/70 bg-card p-7 shadow-sm">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Coffee className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-espresso">
                  Sunday reading room
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Doors open 10:00–16:00. Coffee is on us, phones stay in your
                  pocket, and the exchange wall is always stocked.
                </p>
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
