import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Clip ~ Seamlessly Share Code Snippets",
  description:
    "Unlock the power of seamless code sharing with Code Clip. Create, and share your code in real time with developers around the world.",
  keywords: [
    "Code Clip",
    "code sharing",
    "share code snippets",
    "real-time code collaboration",
    "developer tools",
    "code snippets",
    "programming",
    "web development",
  ],
  authors: [{ name: "Code Clip Team" }],
  viewport: "width=device-width, initial-scale=1.0",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Code Clip ~ Seamlessly Share Code Snippets",
    description:
      "Effortlessly share and explore code snippets with Code Clip. Collaborate in real-time with developers worldwide.",
    url: "https://codeclips.vercel.app", // replace with your app's actual URL
    type: "website",
    images: [
      {
        url: "https://codeclips.vercel.app/og-image.jpg", // replace with an actual image URL
        width: 1200,
        height: 630,
        alt: "Code Clip - Seamlessly Share Code Snippets",
      },
    ],
    siteName: "Code Clip",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Clip ~ Seamlessly Share Code Snippets",
    description:
      "Share and explore code snippets effortlessly with Code Clip. Collaborate in real-time with developers worldwide.",
    site: "@codeclip", // replace with your Twitter handle
    creator: "@codeclip",
    images: [
      {
        url: "https://codeclips.vercel.app/og-image.jpg", // replace with an actual image URL
        alt: "Code Clip Twitter Card",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
