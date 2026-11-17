"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCover } from "./book-cover";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-28 sm:px-6 md:pt-36 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-24">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-mocha/30 bg-cream/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-mocha-deep">
            <Sparkles className="h-3.5 w-3.5 text-ember" aria-hidden="true" />
            Independent bookstore · est. 2016
          </p>

          <h1
            id="hero-title"
            className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-espresso sm:text-5xl lg:text-[3.4rem]"
          >
            Books picked by people,{" "}
            <span className="text-ember">not algorithms.</span>
          </h1>

          <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            An independent bookstore curating fiction and slow-living titles
            since 2016. Every order ships free, wrapped by hand.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-md shadow-mocha/25 hover:bg-mocha-deep"
            >
              <Link href="#books">
                Browse the shelf
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Link
              href="#about"
              className="rounded-full px-4 py-3 text-sm font-semibold text-mocha-deep underline-offset-4 transition-colors hover:text-ember hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mocha"
            >
              Our story
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[
              ["12k+", "happy readers"],
              ["140+", "titles each year"],
              ["4.9", "average rating"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-heading text-2xl font-extrabold text-espresso">
                  {value}{" "}
                  <span className="font-body text-sm font-medium text-muted-foreground">
                    {label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Product mockup */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg" aria-hidden="true">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-sand/80 via-cream/40 to-ember/15" />
          <div className="relative flex items-end justify-center gap-4 px-6 pb-12 pt-10 sm:gap-6">
            <div className="w-1/3 translate-y-3 -rotate-6">
              <BookCover
                title="Wintering Notes"
                author="Jonah Feldt"
                cover="#C86D51"
                titleClassName="text-sm"
              />
            </div>
            <div className="w-2/5 -translate-y-2 drop-shadow-2xl">
              <BookCover
                title="The Salt Path Kitchen"
                author="Marina Alvés"
                cover="#8C6D53"
                titleClassName="text-base"
              />
            </div>
            <div className="w-1/3 translate-y-4 rotate-6">
              <BookCover
                title="A Field Guide to Quiet"
                author="Priya Nair"
                cover="#6E5844"
                titleClassName="text-sm"
              />
            </div>
          </div>

          {/* floating badges */}
          <div className="absolute -left-2 top-6 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:-left-6">
            <div className="flex" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-ember text-ember" />
              ))}
            </div>
            <p className="text-xs font-semibold text-espresso">
              4.9 · 2,300 reviews
            </p>
          </div>
          <div className="absolute -right-1 bottom-0 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:-right-4 sm:bottom-2">
            <Truck className="h-4 w-4 text-ember" aria-hidden="true" />
            <p className="text-xs font-semibold text-espresso">Free shipping over $35</p>
          </div>
        </div>
      </div>
    </section>
  );
}
