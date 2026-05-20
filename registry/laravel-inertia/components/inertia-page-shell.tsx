import * as React from "react";
import { ChevronRight } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

type LinkComponent = React.ElementType<{
  href: string;
  className?: string;
  children: React.ReactNode;
}>;

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: React.ComponentProps<typeof Button>["variant"];
};

type InertiaPageShellProps = {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: PageAction[];
  children: React.ReactNode;
  linkComponent?: LinkComponent;
  className?: string;
  contentClassName?: string;
};

export function InertiaPageShell({
  title,
  description,
  breadcrumbs = [],
  actions = [],
  children,
  linkComponent: Link = "a",
  className,
  contentClassName,
}: InertiaPageShellProps) {
  return (
    <main
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8",
        className,
      )}
    >
      {breadcrumbs.length > 0 ? (
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        >
          {breadcrumbs.map((item, index) => {
            const isCurrent = index === breadcrumbs.length - 1;

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                {index > 0 ? (
                  <ChevronRight className="size-4" aria-hidden="true" />
                ) : null}
                {item.href && !isCurrent ? (
                  <Link
                    href={item.href}
                    className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(isCurrent && "font-medium text-foreground")}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      ) : null}

      <header className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 space-y-1">
          <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions.length > 0 ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {actions.map((action) => {
              const Icon = action.icon;

              return action.href ? (
                <Button
                  asChild
                  variant={action.variant ?? "default"}
                  key={action.label}
                >
                  <Link href={action.href}>
                    {Icon ? (
                      <Icon className="size-4" aria-hidden="true" />
                    ) : null}
                    {action.label}
                  </Link>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant={action.variant ?? "default"}
                  onClick={action.onClick}
                  key={action.label}
                >
                  {Icon ? <Icon className="size-4" aria-hidden="true" /> : null}
                  {action.label}
                </Button>
              );
            })}
          </div>
        ) : null}
      </header>

      <section className={cn("min-w-0", contentClassName)}>{children}</section>
    </main>
  );
}
