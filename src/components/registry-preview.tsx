"use client";

import type { ComponentType } from "react";

import { FishyButton } from "@/Components/fishy-button";
import { HelloFishy } from "../../registry/laravel-inertia/blocks/hello-fishy";

const previews: Record<string, ComponentType> = {
  "fishy-button": FishyButton,
  "hello-fishy": HelloFishy,
};

export function RegistryPreview({ name }: { name: string }) {
  const Preview = previews[name];

  if (!Preview) {
    return <RegistryPreviewFallback />;
  }

  return (
    <div className="flex h-full min-h-0 items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <Preview />
    </div>
  );
}

function RegistryPreviewFallback() {
  return (
    <div className="h-full rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="h-2 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-zinc-900 dark:bg-zinc-100" />
          <div className="h-2 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="h-8 w-20 rounded bg-blue-600" />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_90px]">
        <div className="h-20 rounded border border-zinc-200 dark:border-zinc-800" />
        <div className="h-20 rounded border border-zinc-200 dark:border-zinc-800" />
      </div>
    </div>
  );
}
