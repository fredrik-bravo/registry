import "server-only";

import type { Dirent } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

export type RegistryConfigItem = {
  name?: string;
  type?: string;
  title?: string;
  description?: string;
  files?: Array<{
    path?: string;
    type?: string;
  }>;
};

export type RegistryItem = {
  name: string;
  type: "registry:block" | "registry:component";
  title: string;
  description: string;
  href: string;
  viewHref: string;
  sourcePath: string;
};

const registryRoot = join(process.cwd(), "registry", "laravel-inertia");

async function getRegistryMetadata() {
  try {
    const contents = await readFile(
      join(process.cwd(), "registry.json"),
      "utf8",
    );
    const registry = JSON.parse(contents) as { items?: RegistryConfigItem[] };

    return registry.items ?? [];
  } catch {
    return [];
  }
}

async function getRegistryFolderItems({
  folder,
  type,
  metadata,
}: {
  folder: "blocks" | "components";
  type: RegistryItem["type"];
  metadata: RegistryConfigItem[];
}) {
  let entries: Dirent<string>[];

  try {
    entries = await readdir(join(registryRoot, folder), {
      withFileTypes: true,
    });
  } catch {
    return [];
  }

  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => [".ts", ".tsx"].includes(extname(entry.name)))
    .map((entry) => {
      const fileName = basename(entry.name, extname(entry.name));
      const sourcePath = `registry/laravel-inertia/${folder}/${entry.name}`;
      const match = metadata.find(
        (item) =>
          item.name === fileName ||
          item.files?.some((file) => file.path === sourcePath),
      );
      const name = match?.name ?? fileName;

      return {
        name,
        type,
        title: match?.title ?? titleFromName(name),
        description:
          match?.description ??
          `Installable ${folder === "blocks" ? "block" : "component"} from ${sourcePath}.`,
        href: `/r/${name}.json`,
        viewHref: `/components/${name}`,
        sourcePath,
      } satisfies RegistryItem;
    })
    .sort((first, second) => first.name.localeCompare(second.name));
}

export async function getRegistryItems() {
  const metadata = await getRegistryMetadata();
  const [componentItems, blockItems] = await Promise.all([
    getRegistryFolderItems({
      folder: "components",
      type: "registry:component",
      metadata,
    }),
    getRegistryFolderItems({
      folder: "blocks",
      type: "registry:block",
      metadata,
    }),
  ]);

  return { blockItems, componentItems };
}

export async function getRegistryItem(name: string) {
  const { blockItems, componentItems } = await getRegistryItems();

  return [...componentItems, ...blockItems].find((item) => item.name === name);
}

function titleFromName(name: string) {
  return name
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
