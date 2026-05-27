"use client";

import * as React from "react";

import { MobileNav } from "@/components/mobile-nav";
import {
  SiteNav,
  type LinkComponent,
  type SiteHeaderNavItem,
} from "@/components/site-nav";
import { ThemeSelector } from "@/components/theme-selector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type { LinkComponent, SiteHeaderNavItem } from "@/components/site-nav";

export type SiteHeaderProps = {
  brand?: string;
  brandHref?: string;
  navItems?: SiteHeaderNavItem[];
  linkComponent?: LinkComponent;
  className?: string;
};

const defaultNavItems = [
  {
    title: "Products",
    href: "#products",
    items: [
      {
        title: "Platform",
        href: "#platform",
        description: "A steady workspace for managing teams and content.",
      },
      {
        title: "Analytics",
        href: "#analytics",
        description: "Readable reporting for daily operational decisions.",
      },
      {
        title: "Automation",
        href: "#automation",
        description: "Practical workflows that keep repetitive tasks moving.",
      },
      {
        title: "Integrations",
        href: "#integrations",
        description: "Connect the tools your team already relies on.",
      },
    ],
  },
  {
    title: "Solutions",
    href: "#solutions",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "Docs",
    href: "#docs",
  },
] satisfies SiteHeaderNavItem[];

export function SiteHeader({
  brand = "Acme",
  brandHref = "/",
  navItems = defaultNavItems,
  linkComponent,
  className,
}: SiteHeaderProps) {
  const Link = linkComponent ?? "a";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <MobileNav
          brand={brand}
          brandHref={brandHref}
          navItems={navItems}
          linkComponent={Link}
        />

        <Link
          href={brandHref}
          className="flex min-w-0 items-center gap-2 font-semibold"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
            {brand.slice(0, 1).toUpperCase()}
          </span>
          <span className="truncate">{brand}</span>
        </Link>

        <SiteNav
          items={navItems}
          linkComponent={Link}
          className="ml-6 hidden lg:flex"
        />

        <div className="ml-auto flex items-center gap-2">
          <ThemeSelector />
          <Button className="hidden sm:inline-flex" asChild>
            <Link href="#contact">Contact</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export const siteHeaderPreviewNavItems = defaultNavItems;
