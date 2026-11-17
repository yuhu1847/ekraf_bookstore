"use client";

import { CalendarDays, NotebookPen, Timer } from "lucide-react";
import { useStore, useMounted } from "@/lib/store";
import { FadeIn } from "./fade-in";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Microblog — short staff notes rendered live from the persisted store. */
export function Microblog() {
  const mounted = useMounted();
  const posts = useStore((s) => s.posts);
  const list = mounted ? posts : [];

  return (
    <section id="journal" aria-labelledby="journal-title" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-clay">
            Microblog
          </p>
          <h2
            id="journal-title"
            className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-espresso sm:text-4xl"
          >
            Notes from the counter
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Short dispatches from behind the till — picks, events and shop life.
          </p>
        </FadeIn>

        {list.length === 0 ? (
          <FadeIn delay={0.1}>
            <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-mocha/40 bg-card/60 px-6 py-14 text-center">
              <NotebookPen className="h-9 w-9 text-mocha/60" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-lg font-bold text-espresso">
                No notes yet
              </h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Publish your first microblog post from the admin panel.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {list.slice(0, 3).map((post, i) => (
              <FadeIn key={post.id} delay={i * 0.08}>
                <article className="group flex h-full flex-col rounded-3xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
                      {post.tag}
                    </span>
                    <time
                      dateTime={post.date}
                      className="flex items-center gap-1 text-xs font-medium text-muted-foreground"
                    >
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-espresso transition-colors group-hover:text-ember">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-medium text-muted-foreground">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1">
                      <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.readTime} min read
                    </span>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
