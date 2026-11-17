import { cn } from "@/lib/utils";

/**
 * Pure-CSS book cover — no image assets needed, fully deployable.
 * Renders a believable book with spine, gloss and typography.
 */
export function BookCover({
  title,
  author,
  cover,
  className,
  titleClassName,
}: {
  title: string;
  author: string;
  cover: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[2/3] overflow-hidden rounded-r-xl rounded-l-sm shadow-lg shadow-espresso/20",
        className
      )}
      style={{ backgroundColor: cover }}
      role="img"
      aria-label={`Book cover of ${title} by ${author}`}
    >
      {/* spine */}
      <div className="absolute left-0 top-0 h-full w-2.5 bg-white/20" aria-hidden="true" />
      <div className="absolute left-2.5 top-0 h-full w-px bg-black/25" aria-hidden="true" />

      {/* cover typography */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 pl-6">
        <div className="h-px w-10 bg-white/60" aria-hidden="true" />
        <div>
          <p
            className={cn(
              "font-heading font-extrabold leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]",
              titleClassName ?? "text-base"
            )}
          >
            {title}
          </p>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-white/85">
            {author}
          </p>
        </div>
      </div>

      {/* gloss */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/30"
        aria-hidden="true"
      />
    </div>
  );
}
