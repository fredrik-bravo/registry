import * as React from "react";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type ErrorBag = Record<string, string | string[] | undefined | null>;

type FormErrorsProps = {
  errors?: ErrorBag;
  title?: string;
  className?: string;
};

export function FormErrors({
  errors,
  title = "Please fix the following fields.",
  className,
}: FormErrorsProps) {
  const messages = Object.entries(errors ?? {}).flatMap(([field, value]) => {
    if (!value) {
      return [];
    }

    return (Array.isArray(value) ? value : [value]).map((message) => ({
      field,
      message,
    }));
  });

  if (messages.length === 0) {
    return null;
  }

  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <div className="min-w-0 space-y-2">
          <p className="font-medium">{title}</p>
          <ul className="list-disc space-y-1 pl-5">
            {messages.map(({ field, message }) => (
              <li key={`${field}-${message}`}>
                <span className="font-medium">{field}</span>: {message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
