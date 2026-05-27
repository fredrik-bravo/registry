"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { LinkComponent, SiteHeaderNavItem } from "@/components/site-nav";

export type MobileNavProps = {
  brand?: string;
  brandHref?: string;
  navItems: SiteHeaderNavItem[];
  linkComponent?: LinkComponent;
};

export function MobileNav({
  brand = "Acme",
  brandHref = "/",
  navItems,
  linkComponent,
}: MobileNavProps) {
  const Link = linkComponent ?? "a";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden" variant="ghost" size="icon">
          <MenuIcon data-icon="inline-start" />
          <span className="sr-only">Open navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="border-b p-4 text-left">
          <SheetTitle>
            <SheetClose asChild>
              <Link href={brandHref} className="inline-flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
                  {brand.slice(0, 1).toUpperCase()}
                </span>
                <span>{brand}</span>
              </Link>
            </SheetClose>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Primary site navigation
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <div key={item.title} className="flex flex-col gap-1">
              <SheetClose asChild>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  {item.title}
                </Link>
              </SheetClose>
              {item.items?.length ? (
                <div className="ml-3 flex flex-col gap-1 border-l pl-3">
                  {item.items.map((child) => (
                    <SheetClose asChild key={child.title}>
                      <Link
                        href={child.href}
                        className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {child.title}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
