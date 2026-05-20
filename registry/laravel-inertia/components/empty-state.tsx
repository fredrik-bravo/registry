import * as React from "react";
import { Inbox } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

type LinkComponent = React.ElementType<{
  href: string;
  children: React.ReactNode;
}>;

type EmptyStateAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: EmptyStateAction;
  linkComponent?: LinkComponent;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
  linkComponent: Link = "a",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Icon className="size-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-lg font-semibold tracking-normal text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? (
        <div className="mt-5">
          {action.href ? (
            <Button asChild>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ) : (
            <Button type="button" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
