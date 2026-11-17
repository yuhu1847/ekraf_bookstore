"use client";

import { useEffect, useState } from "react";
import { WebglBackground } from "@/components/site/webgl-background";
import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Features } from "@/components/site/features";
import { Products } from "@/components/site/products";
import { Testimonials } from "@/components/site/testimonials";
import { Microblog } from "@/components/site/microblog";
import { SiteFooter } from "@/components/site/footer";
import { AdminView } from "@/components/admin/admin-view";

type View = "home" | "admin";

/**
 * Single-route shell (deploy-friendly for Vercel & Netlify):
 *  - `/`        → landing page
 *  - `/#admin`  → admin panel (login + CRUD)
 */
export default function Page() {
  const [view, setView] = useState<View>("home");

  useEffect(() => {
    const sync = () => {
      setView(window.location.hash.startsWith("#admin") ? "admin" : "home");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [view]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <WebglBackground />

      {view === "admin" ? (
        <AdminView />
      ) : (
        <>
          <SiteHeader />
          <main id="main" className="flex-1">
            <Hero />
            <About />
            <Features />
            <Products />
            <Testimonials />
            <Microblog />
          </main>
          <SiteFooter />
        </>
      )}
    </div>
  );
}
