"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { UploadButton } from "~/utils/uploadthing";
import { useRouter, usePathname } from "next/navigation";

export function TopNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine the section name based on the route
  const sectionName = pathname?.startsWith("/studio")
    ? "Studio"
    : "Marketplace";

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>☕ Cafetizer | {sectionName}</div>
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
          />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
