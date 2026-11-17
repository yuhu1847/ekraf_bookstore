"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#books", label: "Books" },
  { href: "#journal", label: "Journal" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-cream/85 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="#top"
          className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mocha"
          aria-label="Ink & Ember — back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mocha text-cream">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-heading text-lg font-extrabold tracking-tight text-espresso">
            Ink &amp; Ember
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-espresso/80 transition-colors hover:bg-sand hover:text-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mocha"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-sm hover:bg-mocha-deep md:inline-flex"
          >
            <Link href="#books">Shop now</Link>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-cream/70 text-espresso md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-border/70 bg-cream/95 px-4 pb-6 pt-2 backdrop-blur-md md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-medium text-espresso transition-colors hover:bg-sand"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="mt-3 w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-mocha-deep"
          >
            <Link href="#books" onClick={() => setOpen(false)}>
              Shop now
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
