import { ArrowLeft, FileJson } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RegistryPreview } from "@/components/registry-preview";
import { getRegistryItem, getRegistryItems } from "../../../lib/registry";

type ComponentPageProps = {
  params: Promise<{
    name: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { blockItems, componentItems } = await getRegistryItems();

  return [...componentItems, ...blockItems].map((item) => ({
    name: item.name,
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { name } = await params;
  const item = await getRegistryItem(name);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-[#f6f7f9] text-zinc-950 dark:bg-[#101113] dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <Link
            className="inline-flex h-9 w-fit items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            href="/"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Registry
          </Link>
          <a
            className="inline-flex h-9 w-fit items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            href={item.href}
          >
            <FileJson className="size-4" aria-hidden="true" />
            JSON
          </a>
        </header>

        <section className="grid gap-5">
          <div className="grid gap-2">
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {item.type}
            </p>
            <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">
              {item.title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {item.description}
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
              <p className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {item.sourcePath}
              </p>
            </div>
            <div className="min-h-105 bg-zinc-100 p-4 dark:bg-zinc-900 sm:p-8">
              <RegistryPreview name={item.name} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
