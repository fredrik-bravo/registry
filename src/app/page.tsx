import { ArrowUpRight, Code2, FileJson, Layers3 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { RegistryPreview } from "@/components/registry-preview";
import { getRegistryItems, type RegistryItem } from "../lib/registry";

export default async function Home() {
  const { blockItems, componentItems } = await getRegistryItems();

  return (
    <main className="min-h-dvh bg-[#f6f7f9] text-zinc-950 dark:bg-[#101113] dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <Link className="flex items-center gap-3" href="/">
            <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950">
              <Layers3 className="size-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold">
                Component Registry
              </span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                bravo
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <a
              className="hidden rounded-md px-3 py-2 text-zinc-600 hover:bg-white hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 sm:inline-flex"
              href="/r/registry.json"
            >
              Index
            </a>
            <a
              className="inline-flex h-9 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              href="/r/index.json"
            >
              <FileJson className="size-4" aria-hidden="true" />
              Starter JSON
            </a>
          </nav>
        </header>

        <RegistrySection
          title="Components"
          description="Primitives and application components available as JSON payloads."
          items={componentItems}
          action={
            <a
              className="inline-flex h-9 w-fit items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              href="/r/registry.json"
            >
              <Code2 className="size-4" aria-hidden="true" />
              registry.json
            </a>
          }
        />

        <RegistrySection
          title="Blocks"
          description="Composed page examples built from the registry components."
          items={blockItems}
        />
      </div>
    </main>
  );
}

function RegistrySection({
  title,
  description,
  items,
  action,
}: {
  title: string;
  description: string;
  items: RegistryItem[];
  action?: ReactNode;
}) {
  const folder = title.toLowerCase();

  return (
    <section className="grid gap-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-xl font-semibold tracking-normal">{title}</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
        {action}
      </div>

      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <RegistryCard item={item} key={item.sourcePath} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-4 py-8 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
          No {folder} found in registry/laravel-inertia/{folder}.
        </div>
      )}
    </section>
  );
}

function RegistryCard({ item }: { item: RegistryItem }) {
  return (
    <div className="group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
      <div className="relative aspect-4/3 border-b border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <RegistryPreview name={item.name} />
        <Link
          className="absolute inset-0"
          href={item.viewHref}
          aria-label={`Open ${item.title} preview`}
        >
          <span className="sr-only">Open {item.title} preview</span>
        </Link>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <Link className="min-w-0 text-left" href={item.viewHref}>
            <h3 className="truncate font-medium text-zinc-950 dark:text-zinc-50">
              {item.title}
            </h3>
            <p className="mt-1 truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {item.sourcePath}
            </p>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {item.description}
            </p>
          </Link>
          <Link href={item.viewHref} aria-label={`Open ${item.title} preview`}>
            <ArrowUpRight
              className="mt-1 size-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-950 dark:group-hover:text-zinc-50"
              aria-hidden="true"
            />
          </Link>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-zinc-200 pt-3 dark:border-zinc-800">
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {item.type}
          </span>
          <a
            className="inline-flex h-8 items-center gap-2 rounded-md border border-zinc-200 px-2.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            href={item.href}
          >
            <FileJson className="size-3.5" aria-hidden="true" />
            JSON
          </a>
        </div>
      </div>
    </div>
  );
}
