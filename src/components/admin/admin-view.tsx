"use client";

import { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useStore, useMounted } from "@/lib/store";
import { LoginScreen } from "./login-screen";
import { ProductManager } from "./product-manager";
import { PostManager } from "./post-manager";

/**
 * Admin view at #admin.
 * No session → login screen. Session (kept in localStorage) → dashboard
 * with product CRUD and microblog CRUD. No database involved.
 */
export function AdminView() {
  const mounted = useMounted();
  const session = useStore((s) => s.session);
  const products = useStore((s) => s.products);
  const posts = useStore((s) => s.posts);
  const logout = useStore((s) => s.logout);
  const resetDemoData = useStore((s) => s.resetDemoData);
  const [tab, setTab] = useState("products");

  if (!mounted) {
    // Render the login shell while persisted state rehydrates
    return <LoginScreen />;
  }

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Admin top bar */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mocha text-cream">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-extrabold text-espresso">
                Ink &amp; Ember
              </p>
              <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <LayoutDashboard className="h-3 w-3" aria-hidden="true" />
                Admin
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-mocha/40 font-semibold text-mocha-deep hover:bg-accent"
            >
              {/* plain anchor: native hash change reliably switches the view back */}
              <a href="#">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                View store
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                toast.success("Signed out");
              }}
              className="rounded-full border-destructive/30 font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-espresso sm:text-3xl">
              Content dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Signed in as {session.email} · data stored in this browser
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-border font-medium text-muted-foreground hover:bg-sand hover:text-espresso"
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                Reset demo data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading font-extrabold">
                  Reset demo data?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Products and posts return to the original seed content. Your
                  session stays signed in.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    resetDemoData();
                    toast.success("Demo data restored");
                  }}
                  className="rounded-full bg-primary text-primary-foreground hover:bg-mocha-deep"
                >
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="h-11 rounded-full border border-border/70 bg-card p-1">
            <TabsTrigger
              value="products"
              className="rounded-full px-5 text-sm font-semibold data-[state=active]:bg-mocha data-[state=active]:text-cream"
            >
              Products ({products.length})
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="rounded-full px-5 text-sm font-semibold data-[state=active]:bg-mocha data-[state=active]:text-cream"
            >
              Journal posts ({posts.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductManager />
          </TabsContent>
          <TabsContent value="posts">
            <PostManager />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-auto border-t border-border/70 bg-cream/60 py-5 text-center">
        <p className="text-xs text-muted-foreground">
          Demo admin — everything persists in your browser&apos;s localStorage.
        </p>
      </footer>
    </div>
  );
}

