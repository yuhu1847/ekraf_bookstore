"use client";

import { PackageOpen, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useStore, useMounted, type Product } from "@/lib/store";
import { BookCover } from "./book-cover";
import { FadeIn } from "./fade-in";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5",
            i <= rating ? "fill-ember text-ember" : "fill-sand text-sand"
          )}
        />
      ))}
    </div>
  );
}

function AddButton({ product }: { product: Product }) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="rounded-full border-mocha/40 bg-transparent font-semibold text-mocha-deep hover:bg-mocha hover:text-cream"
      onClick={() =>
        toast.success("Added to your bag", {
          description: `“${product.title}” — demo bag, no real checkout.`,
        })
      }
    >
      <Plus className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
      Add to bag
    </Button>
  );
}

function ProductCard({ product, featured }: { product: Product; featured?: boolean }) {
  if (featured) {
    return (
      <article className="group flex h-full flex-col gap-6 rounded-3xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg sm:flex-row sm:items-center lg:col-span-2 lg:row-span-2 lg:p-8">
        <BookCover
          title={product.title}
          author={product.author}
          cover={product.cover}
          className="mx-auto w-36 shrink-0 transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-[1.03] sm:w-44 lg:w-52"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="w-fit rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
            {product.category} · Featured
          </span>
          <h3 className="mt-3 font-heading text-2xl font-extrabold leading-tight text-espresso">
            {product.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            by {product.author}
          </p>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-xs font-medium text-muted-foreground">
              {product.rating}.0
            </span>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="font-heading text-2xl font-extrabold text-mocha-deep">
              ${product.price}
            </p>
            <AddButton product={product} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-border/70 bg-card p-5 shadow-sm transition-shadow hover:shadow-lg">
      <BookCover
        title={product.title}
        author={product.author}
        cover={product.cover}
        className="mx-auto w-28 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-1 sm:w-32"
        titleClassName="text-sm"
      />
      <span className="mt-4 w-fit rounded-full bg-sand px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mocha-deep">
        {product.category}
      </span>
      <h3 className="mt-2 line-clamp-2 font-heading text-base font-bold leading-snug text-espresso">
        {product.title}
      </h3>
      <p className="mt-0.5 truncate text-xs font-medium text-muted-foreground">
        by {product.author}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <Stars rating={product.rating} />
        <p className="font-heading text-lg font-extrabold text-mocha-deep">
          ${product.price}
        </p>
      </div>
      <div className="mt-4">
        <AddButton product={product} />
      </div>
    </article>
  );
}

/** Product shelf — bento grid rendered live from the persisted store. */
export function Products() {
  const mounted = useMounted();
  const products = useStore((s) => s.products);
  const list = mounted ? products : [];
  const featured = list.find((p) => p.featured);
  const rest = list.filter((p) => p.id !== featured?.id);

  return (
    <section id="books" aria-labelledby="books-title" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-clay">
            Product
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2
              id="books-title"
              className="max-w-xl font-heading text-3xl font-extrabold tracking-tight text-espresso sm:text-4xl"
            >
              This season&apos;s shelf
            </h2>
            <p className="text-sm text-muted-foreground">
              {list.length} titles in stock · wrapped by hand
            </p>
          </div>
        </FadeIn>

        {list.length === 0 ? (
          <FadeIn delay={0.1}>
            <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-mocha/40 bg-card/60 px-6 py-16 text-center">
              <PackageOpen className="h-10 w-10 text-mocha/60" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-lg font-bold text-espresso">
                The shelf is empty
              </h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Add a few books in the admin panel and they will appear here right
                away.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-auto lg:grid-cols-4">
            {featured && (
              <FadeIn className="sm:col-span-2 lg:row-span-2" delay={0.05}>
                <ProductCard product={featured} featured />
              </FadeIn>
            )}
            {rest.map((p, i) => (
              <FadeIn key={p.id} delay={0.05 + Math.min(i, 4) * 0.06}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
