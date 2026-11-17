"use client";

import { useState, type FormEvent } from "react";
import { NotebookPen, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useStore, type Post } from "@/lib/store";

type PostDraft = Omit<Post, "id">;

const TAG_SUGGESTIONS = ["Staff picks", "Behind the shop", "Events", "Reading list"];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const EMPTY_DRAFT: PostDraft = {
  title: "",
  excerpt: "",
  author: "Ink & Ember",
  date: todayISO(),
  tag: "Staff picks",
  readTime: 3,
};

export function PostManager() {
  const posts = useStore((s) => s.posts);
  const addPost = useStore((s) => s.addPost);
  const updatePost = useStore((s) => s.updatePost);
  const deletePost = useStore((s) => s.deletePost);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<PostDraft>(EMPTY_DRAFT);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);

  function openCreate() {
    setEditingId(null);
    setDraft({ ...EMPTY_DRAFT, date: todayISO() });
    setDialogOpen(true);
  }

  function openEdit(p: Post) {
    setEditingId(p.id);
    const { id: _id, ...rest } = p;
    setDraft(rest);
    setDialogOpen(true);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!draft.title.trim() || !draft.excerpt.trim() || !draft.author.trim()) {
      toast.error("Missing fields", {
        description: "Title, excerpt and author are required.",
      });
      return;
    }
    if (Number.isNaN(draft.readTime) || draft.readTime < 1) {
      toast.error("Invalid read time", {
        description: "Read time must be at least 1 minute.",
      });
      return;
    }
    if (editingId) {
      updatePost(editingId, draft);
      toast.success("Post updated", { description: `“${draft.title}” saved.` });
    } else {
      addPost(draft);
      toast.success("Post published", {
        description: `“${draft.title}” is live on the journal.`,
      });
    }
    setDialogOpen(false);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    deletePost(deleteTarget.id);
    toast.success("Post deleted", { description: `“${deleteTarget.title}” removed.` });
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-espresso">{posts.length}</span> post
          {posts.length === 1 ? "" : "s"} · newest three show on the landing page
        </p>
        <Button
          onClick={openCreate}
          className="rounded-full bg-primary font-semibold text-primary-foreground hover:bg-mocha-deep"
        >
          <Plus className="mr-1.5 h-4 w-4" aria-hidden="true" />
          New post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-mocha/40 bg-card/60 px-6 py-14 text-center">
          <NotebookPen className="h-9 w-9 text-mocha/60" aria-hidden="true" />
          <p className="mt-4 font-heading text-base font-bold text-espresso">
            No posts yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Publish a short note from the counter — it appears in the journal right away.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {posts.map((p) => (
            <li
              key={p.id}
              className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-heading text-sm font-bold text-espresso">
                    {p.title}
                  </p>
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                    {p.tag}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>
                <p className="mt-1.5 text-[11px] font-medium text-muted-foreground">
                  {p.author} · {p.date} · {p.readTime} min read
                </p>
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
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
            </li>
          ))}
        </ul>
      )}

      {/* Create / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[88vh] overflow-y-auto rounded-3xl thin-scrollbar sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl font-extrabold text-espresso">
              {editingId ? "Edit post" : "New post"}
            </DialogTitle>
            <DialogDescription>
              Microblog notes are short — around 280 characters works best.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="m-title">Title *</Label>
              <Input
                id="m-title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="What we're reading by lamplight"
                className="rounded-xl"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="m-excerpt">Excerpt *</Label>
              <Textarea
                id="m-excerpt"
                value={draft.excerpt}
                onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                placeholder="A short dispatch from behind the till…"
                rows={4}
                maxLength={400}
                className="rounded-xl"
                required
              />
              <p className="text-right text-[11px] text-muted-foreground">
                {draft.excerpt.length}/400
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="m-author">Author *</Label>
                <Input
                  id="m-author"
                  value={draft.author}
                  onChange={(e) => setDraft({ ...draft, author: e.target.value })}
                  placeholder="June · bookseller"
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-tag">Tag</Label>
                <input
                  id="m-tag"
                  list="tag-suggestions"
                  value={draft.tag}
                  onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
                  placeholder="Staff picks"
                  className="flex h-9 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
                />
                <datalist id="tag-suggestions">
                  {TAG_SUGGESTIONS.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="m-date">Date</Label>
                <Input
                  id="m-date"
                  type="date"
                  value={draft.date}
                  onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-read">Read time (min)</Label>
                <Input
                  id="m-read"
                  type="number"
                  min="1"
                  max="30"
                  value={draft.readTime || ""}
                  onChange={(e) => setDraft({ ...draft, readTime: Number(e.target.value) })}
                  className="rounded-xl"
                />
              </div>
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
                {editingId ? "Save changes" : "Publish post"}
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
              This removes the post from the journal on the landing page. You can
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
