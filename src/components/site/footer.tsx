"use client";

import Link from "next/link";
import { BookOpen, Instagram, Twitter, Mail } from "lucide-react";

const EXPLORE_LINKS = [
  { href: "#about", label: "About us" },
  { href: "#books", label: "Books" },
  { href: "#journal", label: "Journal" },
];

const SUPPORT_LINKS = [
  { href: "mailto:hello@inkember.com", label: "Contact" },
  { href: "#books", label: "Shipping" },
  { href: "#top", label: "Back to top" },
];

/** Simple footer — links, socials, copyright and a discreet admin entry. */
export function SiteFooter() {
  return (
    <footer className="mt-auto bg-espresso text-cream">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="#top"
              className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
              aria-label="Ink & Ember — back to top"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream/10 text-cream">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-lg font-extrabold tracking-tight">
                Ink &amp; Ember
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              Curated books for slow evenings. Hand-picked in Portland since 2016.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Instagram, label: "Ink & Ember on Instagram", href: "https://instagram.com" },
                { icon: Twitter, label: "Ink & Ember on Twitter", href: "https://twitter.com" },
                { icon: Mail, label: "Email Ink & Ember", href: "mailto:hello@inkember.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream/10 text-cream transition-colors hover:bg-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  <s.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          <nav aria-label="Explore" className="min-w-32">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-cream/60">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="rounded-md text-sm text-cream/85 underline-offset-4 transition-colors hover:text-cream hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support" className="min-w-32">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-cream/60">
              Support
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="rounded-md text-sm text-cream/85 underline-offset-4 transition-colors hover:text-cream hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-cream/15 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-cream/60">
            © {new Date().getFullYear()} Ink &amp; Ember. All rights reserved.
          </p>
          <p className="text-xs text-cream/60">
            Demo store ·{" "}
            <a
              href="#admin"
              className="font-semibold text-cream/80 underline-offset-4 hover:text-cream hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              Admin panel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
