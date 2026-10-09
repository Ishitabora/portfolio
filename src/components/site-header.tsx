"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { routes, profile } from "@/content/site";

const NAV_ITEMS: { href: string; label: string; flag: keyof typeof routes }[] = [
  { href: "/work", label: "Work", flag: "work" },
  { href: "/about", label: "About", flag: "about" },
  { href: "/contact", label: "Contact", flag: "contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = NAV_ITEMS.filter((item) => routes[item.flag]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-fg transition-colors hover:text-accent"
        >
          {profile.name}
        </Link>
        <ul className="flex items-center gap-6">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm transition-colors ${
                    active ? "text-accent" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
