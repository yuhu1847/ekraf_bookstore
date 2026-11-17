"use client";

import { useState, type FormEvent } from "react";
import {
  PackageOpen,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useStore, type Product } from "@/lib/store";
import { cn } from "@/lib/utils";

const COVER_SWATCHES = [
  "#8C6D53",
  "#C86D51",
  "#6E5844",
  "#B0553B",
  "#A8846B",
  "#D9A08B",
  "#5A6B50",
  "#2C221E",
];

type ProductDraft = Omit<Product, "id">;

const EMPTY_DRAFT: ProductDraft = {
  title: "",
  author: "",
  price: 0,
  category: "",
  description: "",
  cover: COVER_SWATCHES[0],
  featured: false,
  rating: 5,
};

export function ProductManager() {
  const products = useStore((s) => s.products);
  const addProduct = useStore((s) => s.addProduct);
  const updateProduct = useStore((s) => s.updateProduct);
  const deleteProduct = useStore((s) => s.deleteProduct);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProductDraft>(EMPTY_DRAFT);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  function openCreate() {
    setEditingId(null);
    setDraft(EMPTY_DRAFT);
    setDialogOpen(true);
  }

  function openEdit(p: Product) {
    setEditingId(p.id);
    const { id: _id, ...rest } = p;
    setDraft(rest);
    setDialogOpen(true);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!draft.title.trim() || !draft.author.trim() || !draft.category.trim()) {
      toast.error("Missing fields", {
        description: "Title, author and category are required.",
      });
      return;
    }
    if (Number.isNaN(draft.price) || draft.price < 0) {
      toast.error("Invalid price", { description: "Price must be a positive number." });
      return;
    }
    if (editingId) {
      updateProduct(editingId, draft);
      toast.success("Product updated", { description: `“${draft.title}” saved.` });
    } else {
      addProduct(draft);
      toast.success("Product added", { description: `“${draft.title}” is now on the shelf.` });
    }
    setDialogOpen(false);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    deleteProduct(deleteTarget.id);
    toast.success("Product deleted", { description: `“${deleteTarget.title}” removed.` });
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-espresso">{products.length}</span> product
          {products.length === 1 ? "" : "s"} · edits appear on the landing page instantly
        </p>
        <Button
          onClick={openCreate}
          className="rounded-full bg-primary font-semibold text-primary-foreground hover:bg-mocha-deep"
        >
          <Plus className="mr-1.5 h-4 w-4" aria-hidden="true" />
          New product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-mocha/40 bg-card/60 px-6 py-14 text-center">
          <PackageOpen className="h-9 w-9 text-mocha/60" aria-hidden="true" />
          <p className="mt-4 font-heading text-base font-bold text-espresso">
            No products yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first book — it will show up on the shelf immediately.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <span
                className="h-14 w-10 shrink-0 rounded-md rounded-l-sm shadow-sm"
                style={{ backgroundColor: p.cover }}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-heading text-sm font-bold text-espresso">
                    {p.title}
                  </p>
                  {p.featured && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {p.author} · {p.category}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <p className="font-heading text-base font-extrabold text-mocha-deep">
                  ${p.price}
                </p>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5 text-xs font-semibold text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-ember text-ember" aria-hidden="true" />
                    {p.rating}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Edit ${p.title}`}
                    onClick={() => openEdit(p)}
                    className="h-9 w-9 rounded-xl text-mocha-deep hover:bg-accent hover:text-accent-foreground"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Delete ${p.title}`}
                    onClick={() => setDeleteTarget(p)}
                    className="h-9 w-9 rounded-xl text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Create / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[88vh] overflow-y-auto rounded-3xl thin-scrollbar sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl font-extrabold text-espresso">
              {editingId ? "Edit product" : "New product"}
            </DialogTitle>
            <DialogDescription>
              Saved to your browser only — no database needed.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="p-title">Title *</Label>
              <Input
                id="p-title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="The Salt Path Kitchen"
                className="rounded-xl"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="p-author">Author *</Label>
                <Input
                  id="p-author"
                  value={draft.author}
                  onChange={(e) => setDraft({ ...draft, author: e.target.value })}
                  placeholder="Marina Alvés"
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-category">Category *</Label>
                <Input
                  id="p-category"
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  placeholder="Cooking"
                  className="rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="p-price">Price (USD) *</Label>
                <Input
                  id="p-price"
                  type="number"
                  min="0"
                  step="1"
                  value={draft.price || ""}
                  onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                  placeholder="24"
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-rating">Rating</Label>
                <select
                  id="p-rating"
                  value={draft.rating}
                  onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
                  className="h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} star{r === 1 ? "" : "s"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="p-description">Short description</Label>
              <Textarea
                id="p-description"
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="One or two sentences shown on the shelf card."
                rows={2}
                maxLength={220}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Cover color</Label>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Cover color">
                {COVER_SWATCHES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setDraft({ ...draft, cover: c })}
                    aria-label={`Cover color ${c}`}
                    aria-pressed={draft.cover === c}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mocha",
                      draft.cover === c ? "border-espresso" : "border-transparent"
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3">
              <div>
                <Label htmlFor="p-featured" className="text-sm font-semibold">
                  Featured on shelf
                </Label>
                <p className="text-xs text-muted-foreground">
                  Shown as the large bento card
                </p>
              </div>
              <Switch
                id="p-featured"
                checked={draft.featured}
                onCheckedChange={(v) => setDraft({ ...draft, featured: v })}
              />
            </div>

            <DialogFooter className="gap-2 pt-1 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-primary font-semibold text-primary-foreground hover:bg-mocha-deep"
              >
                {editingId ? "Save changes" : "Add product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading font-extrabold">
              Delete “{deleteTarget?.title}”?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This removes the book from the shelf on the landing page. You can
              restore seed data anytime with “Reset demo data”.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="rounded-full bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
