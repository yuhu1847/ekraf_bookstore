"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* ---------------------------------- Types --------------------------------- */

export interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  /** Hex color used to render the CSS book cover */
  cover: string;
  featured: boolean;
  rating: number;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tag: string;
  readTime: number;
}

export interface Session {
  email: string;
  name: string;
}

/* ------------------------------ Demo auth data ---------------------------- */

export const DEMO_EMAIL = "admin@inkember.com";
export const DEMO_PASSWORD = "ember2024";

/* --------------------------------- Seeds ---------------------------------- */

export const SEED_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "The Salt Path Kitchen",
    author: "Marina Alvés",
    price: 24,
    category: "Cooking",
    description:
      "Coastal recipes and the quiet rituals of cooking by the sea. A book to keep on the counter, not the shelf.",
    cover: "#8C6D53",
    featured: true,
    rating: 5,
  },
  {
    id: "p2",
    title: "Wintering Notes",
    author: "Jonah Feldt",
    price: 19,
    category: "Essays",
    description: "Short essays on rest, cold mornings and going gently through the year.",
    cover: "#C86D51",
    featured: false,
    rating: 4,
  },
  {
    id: "p3",
    title: "A Field Guide to Quiet",
    author: "Priya Nair",
    price: 22,
    category: "Nature",
    description: "Walking routes, field observations and small silences from the edge of the city.",
    cover: "#6E5844",
    featured: false,
    rating: 5,
  },
  {
    id: "p4",
    title: "The Paper Archive",
    author: "Lena Ostrom",
    price: 27,
    category: "Fiction",
    description: "A novelist inherits her grandmother's unfinished letters — and one long-held secret.",
    cover: "#B0553B",
    featured: false,
    rating: 4,
  },
  {
    id: "p5",
    title: "Bread & Weather",
    author: "Tomas Reilly",
    price: 21,
    category: "Cooking",
    description: "Sourdough shaped by seasons, and the forecasts that decide baking days.",
    cover: "#A8846B",
    featured: false,
    rating: 4,
  },
  {
    id: "p6",
    title: "Letters to a Young Reader",
    author: "Amara Diallo",
    price: 18,
    category: "Literary",
    description: "Warm, funny letters on why books still matter in a scrolling world.",
    cover: "#D9A08B",
    featured: false,
    rating: 5,
  },
];

export const SEED_POSTS: Post[] = [
  {
    id: "m1",
    title: "What we're reading by lamplight",
    excerpt:
      "Three staff picks for long evenings: an Icelandic mystery, a slim essay collection on rest, and the cookbook we keep on the coffee table instead of the shelf.",
    author: "June · bookseller",
    date: "2026-11-08",
    tag: "Staff picks",
    readTime: 3,
  },
  {
    id: "m2",
    title: "How we choose every title",
    excerpt:
      "No algorithms here. Two of us read every book before it reaches the shelf. If we wouldn't gift it to a friend, we don't sell it.",
    author: "Ink & Ember",
    date: "2026-10-27",
    tag: "Behind the shop",
    readTime: 4,
  },
  {
    id: "m3",
    title: "Sunday reading room is back",
    excerpt:
      "Doors open 10:00–16:00, coffee is on us, and phones stay in your pocket. Bring a book or borrow one from the exchange wall.",
    author: "June · bookseller",
    date: "2026-10-12",
    tag: "Events",
    readTime: 2,
  },
];

/* --------------------------------- Store ---------------------------------- */

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

interface StoreState {
  products: Product[];
  posts: Post[];
  session: Session | null;
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Partial<Omit<Product, "id">>) => void;
  deleteProduct: (id: string) => void;
  addPost: (p: Omit<Post, "id">) => void;
  updatePost: (id: string, p: Partial<Omit<Post, "id">>) => void;
  deletePost: (id: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  resetDemoData: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      products: SEED_PRODUCTS,
      posts: SEED_POSTS,
      session: null,

      addProduct: (p) => set((s) => ({ products: [{ ...p, id: uid() }, ...s.products] })),
      updateProduct: (id, p) =>
        set((s) => ({ products: s.products.map((x) => (x.id === id ? { ...x, ...p } : x)) })),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((x) => x.id !== id) })),

      addPost: (p) => set((s) => ({ posts: [{ ...p, id: uid() }, ...s.posts] })),
      updatePost: (id, p) =>
        set((s) => ({ posts: s.posts.map((x) => (x.id === id ? { ...x, ...p } : x)) })),
      deletePost: (id) => set((s) => ({ posts: s.posts.filter((x) => x.id !== id) })),

      login: (email, password) => {
        const ok =
          email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
        if (ok) set({ session: { email: DEMO_EMAIL, name: "Site Admin" } });
        return ok;
      },
      logout: () => set({ session: null }),
      resetDemoData: () => set({ products: SEED_PRODUCTS, posts: SEED_POSTS }),
    }),
    {
      name: "ink-ember-store",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Mounted flag implemented with useSyncExternalStore: SSR and the first client
 * render both show seed data; after hydration, persisted localStorage values
 * take over. This avoids React hydration mismatches when the admin has edited
 * demo data.
 */
const emptySubscribe = () => () => {};

export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
