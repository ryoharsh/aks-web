import type { Metadata, Viewport } from "next";
import "./globals.css";
import Loader from "./components/loader";
import {
  DEVELOPER_NAME,
  DEVELOPER_PORTFOLIO,
  JSON_LD,
  SITE_DESCRIPTION,
  SITE_URL,
  STUDIO_NAME,
} from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Aks — Understand Yourself",
  description: SITE_DESCRIPTION,
  authors: [{ name: DEVELOPER_NAME, url: DEVELOPER_PORTFOLIO }],
  creator: DEVELOPER_NAME,
  publisher: STUDIO_NAME,
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.png",
    apple: "/adaptive-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Aks",
    title: "Aks — Understand Yourself",
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aks — Understand Yourself",
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Loader />
        {children}
      </body>
    </html>
  );
}
