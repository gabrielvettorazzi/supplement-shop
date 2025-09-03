"use client";

import { MountainIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground flex justify-center">
      <div className="container flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Topflight</span>
        </div>
        <p className="text-center text-sm sm:text-left">
          &copy; {new Date().getFullYear()} Topflight Supplement Store.
        </p>
        <nav className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          <Link href="#" className="hover:text-foreground" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground" prefetch={false}>
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
