import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { headers } from "next/headers";
import { WagmiProviders } from "~/lib/wagmi-providers";
import { TopNav } from "~/app/(main)/_components/top-nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  // Determine metadata based on route
  const isStudio = pathname.includes("/studio");
  const isMarketplace =
    pathname.includes("/marketplace") || (!isStudio && pathname !== "");

  if (isStudio) {
    return {
      title: "Cafetizer | Studio",
      description: "Tokenize your coffee with AI and Web3",
      icons: [{ rel: "icon", url: "/favicon.ico" }],
    };
  }

  if (isMarketplace) {
    return {
      title: "Cafetizer | Marketplace",
      description: "Browse and discover tokenized coffee RWAs",
      icons: [{ rel: "icon", url: "/favicon.ico" }],
    };
  }

  // Default metadata
  return {
    title: "Cafetizer",
    description: "Tokenize your coffee with AI and Web3",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable} flex flex-col gap-4`}>
          <TopNav />
          <WagmiProviders>{children}</WagmiProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
