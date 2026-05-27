"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export type LinkComponent = React.ElementType<{
  href: string;
  className?: string;
  children?: React.ReactNode;
}>;

export type SiteHeaderNavItem = {
  title: string;
  href: string;
  description?: string;
  items?: Array<{
    title: string;
    href: string;
    description?: string;
  }>;
};

export type SiteNavProps = {
  items: SiteHeaderNavItem[];
  linkComponent?: LinkComponent;
  className?: string;
};

export function SiteNav({ items, linkComponent, className }: SiteNavProps) {
  const Link = linkComponent ?? "a";

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.items?.length ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-100 gap-2 p-2 md:w-125 md:grid-cols-2">
                    {item.items.map((child) => (
                      <li key={child.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={child.href}
                            className="block rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <span className="text-sm font-medium leading-none">
                              {child.title}
                            </span>
                            {child.description ? (
                              <span className="mt-2 line-clamp-2 block text-sm leading-5 text-muted-foreground">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={item.href}>{item.title}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
