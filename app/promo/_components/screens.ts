/**
 * Central screenshot configuration for the Aks.ai promo film.
 * Every screen is a real capture from the shipped Android app —
 * never redesigned, never recreated, never AI-generated.
 */
export const SHOT_W = 540;
export const SHOT_H = 1212;

export const SCREENS = {
  splash: {
    src: "/screenshots/Screenshot_1790073682.png",
    alt: "Aks splash screen: the Aks orb above Aks.ai and Understand yourself, differently.",
  },
  mirror: {
    src: "/screenshots/Screenshot_1790073745.png",
    alt: "Mirror home in Aks: a Good afternoon greeting, topic chips, a quick check-in, and a conversation with Aks",
  },
  conversation: {
    src: "/screenshots/Screenshot_1790074139.png",
    alt: "A Mirror conversation where Aks recalls earlier check-ins and asks what's on the user's mind",
  },
  timeline: {
    src: "/screenshots/Screenshot_1790073891.png",
    alt: "Timeline in Aks: Your story, as it unfolds, with check-ins and reflections",
  },
  remembers: {
    src: "/screenshots/Screenshot_1790073994.png",
    alt: "What Aks remembers: useful context, carefully kept",
  },
  access: {
    src: "/screenshots/Screenshot_1790074030.png",
    alt: "What Aks can access: connected sources and what Aks holds",
  },
  yourdata: {
    src: "/screenshots/Screenshot_1790074097.png",
    alt: "Your data in Aks: counts of reflections, check-ins, and conversations",
  },
} as const;

export type ScreenKey = keyof typeof SCREENS;
