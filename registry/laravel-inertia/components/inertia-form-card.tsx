import * as React from "react";

import { Button } from "@/Components/ui/button";
import { FormErrors } from "@/Components/form-errors";
import { cn } from "@/lib/utils";

type ErrorBag = Record<string, string | string[] | undefined | null>;

type InertiaFormCardProps = React.ComponentProps<"form"> & {
  title: string;
  description?: string;
  errors?: ErrorBag;
  submitLabel?: string;
  cancelHref?: string;
  cancelLabel?: string;
  linkComponent?: React.ElementType<{
    href: string;
    children: React.ReactNode;
  }>;
  footer?: React.ReactNode;
};

export function InertiaFormCard({
  title,
  description,
  errors,
  submitLabel = "Save changes",
  cancelHref,
  cancelLabel = "Cancel",
  linkComponent: Link = "a",
  footer,
  children,
  className,
  ...props
}: InertiaFormCardProps) {
  return (
    <form
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-xs",
        className,
      )}
      {...props}
    >
      <div className="space-y-1.5 border-b p-6">
        <h2 className="text-lg font-semibold tracking-normal">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="space-y-5 p-6">
        <FormErrors errors={errors} />
        {children}
      </div>
      <div className="flex flex-col-reverse gap-2 border-t p-6 sm:flex-row sm:justify-end">
        {footer ?? (
          <>
            {cancelHref ? (
              <Button asChild variant="outline">
                <Link href={cancelHref}>{cancelLabel}</Link>
              </Button>
            ) : null}
            <Button type="submit">{submitLabel}</Button>
          </>
        )}
      </div>
    </form>
  );
}
