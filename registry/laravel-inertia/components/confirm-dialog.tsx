"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { Button, buttonVariants } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

type ConfirmDialogProps = {
  triggerLabel: string;
  triggerIcon?: React.ReactNode;
  triggerVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  triggerSize?: "default" | "sm" | "lg" | "icon";
  triggerClassName?: string;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  children?: React.ReactNode;
};

export function ConfirmDialog({
  triggerLabel,
  triggerIcon,
  triggerVariant = "outline",
  triggerSize = "sm",
  triggerClassName,
  title,
  description,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  children,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cn(
          buttonVariants({ variant: triggerVariant, size: triggerSize }),
          triggerClassName,
        )}
      >
        {triggerIcon}
        {triggerLabel}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out">
          <div className="space-y-2">
            <Dialog.Title className="text-lg font-semibold tracking-normal">
              {title}
            </Dialog.Title>
            {description ? (
              <Dialog.Description className="text-sm leading-6 text-muted-foreground">
                {description}
              </Dialog.Description>
            ) : null}
          </div>
          {children ? (
            <div className="text-sm text-muted-foreground">{children}</div>
          ) : null}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Dialog.Close asChild>
              <Button variant="outline">{cancelLabel}</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                variant={destructive ? "destructive" : "default"}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Close
            className={cn(
              "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            )}
            aria-label="Close"
          >
            <X className="size-4" aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
