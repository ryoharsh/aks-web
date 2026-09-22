/**
 * Central place for public site facts.
 *
 * TODO: set NEXT_PUBLIC_SITE_URL to the production domain (e.g. https://aks.example.com)
 * so canonical / Open Graph URLs are correct. Until then metadata falls back to the
 * placeholder below — update it before launch.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aks.miyal.app";

export const SITE_NAME = "Aks";
export const SITE_TAGLINE = "Understand Yourself.";
export const SITE_DESCRIPTION =
  "Aks is a personal companion that helps you talk through what's happening in your life, reflect on your thoughts, and understand yourself a little better.";

/**
 * Android availability.
 * The Play listing URL is derived from the published package id.
 * If the console listing ever uses a different canonical URL, update it here —
 * this constant is the single place CTAs and structured data read from.
 */
export const ANDROID_PACKAGE = "com.miyal.aks";
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

export const DEVELOPER_NAME = "Harsh Kumar Singh";
export const DEVELOPER_HANDLE = "ryoharsh";
export const DEVELOPER_PORTFOLIO = "https://ryoharsh.vercel.app";
export const STUDIO_NAME = "Miyal";
export const PRIVACY_EMAIL = "harshsc291@gmail.com";
export const CONTACT_EMAIL = "harshsc291@gmail.com";

export const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Context", href: "#context" },
  { label: "About", href: "#about" },
] as const;

/**
 * Canonical answers about Aks — single source for the visible FAQ section
 * and the FAQPage structured data. Keep answers short, factual, and in sync
 * with the rest of the site so search and answer engines quote us correctly.
 */
export const FAQ_ITEMS = [
  {
    q: "What is Aks?",
    a: "Aks is a personal companion that helps you talk through what's happening in your life, reflect on your thoughts, and understand yourself a little better. It is developed by Harsh Kumar Singh at Miyal.",
  },
  {
    q: "What does Aks do?",
    a: "Aks gives you a place to start conversations about what's on your mind, through its Mirror experience. It can use context from services you connect — like your calendar, tasks, or inbox — so you don't have to explain everything from scratch.",
  },
  {
    q: "What is Mirror?",
    a: "Mirror is the central Aks experience. You type or speak naturally about what's on your mind, review what you said, send it, and continue the conversation with Aks.",
  },
  {
    q: "How does Aks work?",
    a: "In three steps: tell Aks what's on your mind, connect the services already part of your day for context, and use the conversation to reflect and figure out what matters next.",
  },
  {
    q: "Which services can Aks connect to?",
    a: "Google Calendar, Google Tasks, Gmail, Todoist, GitHub, Slack, and Notion. Every connection is optional and can be removed at any time.",
  },
  {
    q: "Is Aks available on Android?",
    a: "Yes. Aks is available now on Android (package com.miyal.aks) on Google Play.",
  },
  {
    q: "Is Aks available on iOS?",
    a: "Not yet. The iPhone app is coming soon — Android is the way to try Aks today.",
  },
  {
    q: "Who built Aks?",
    a: "Aks is developed by Harsh Kumar Singh (ryoharsh) at Miyal. Portfolio: https://ryoharsh.vercel.app.",
  },
  {
    q: "How do I delete my Aks account?",
    a: "You can request deletion of your Aks account and associated data at any time. See the Delete your account page for how.",
  },
] as const;

export const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Aks",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Android",
      identifier: ANDROID_PACKAGE,
      downloadUrl: PLAY_STORE_URL,
      description: SITE_DESCRIPTION,
      author: { "@id": "#harsh-kumar-singh" },
      maintainer: { "@id": "#miyal" },
    },
    {
      "@type": "Person",
      "@id": "#harsh-kumar-singh",
      name: DEVELOPER_NAME,
      alternateName: DEVELOPER_HANDLE,
      url: DEVELOPER_PORTFOLIO,
    },
    {
      "@type": "Organization",
      "@id": "#miyal",
      name: STUDIO_NAME,
      founder: { "@id": "#harsh-kumar-singh" },
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@id": "#miyal" },
    },
  ],
};
