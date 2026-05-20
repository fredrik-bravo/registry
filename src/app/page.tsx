"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Code2,
  FileJson,
  Layers3,
  PanelTop,
  Plus,
  Terminal,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/Components/ui/button";
import { ConfirmDialog } from "@/Components/confirm-dialog";
import { EmptyState } from "@/Components/empty-state";
import { FormErrors } from "@/Components/form-errors";
import { InertiaFormCard } from "@/Components/inertia-form-card";
import { InertiaPageShell } from "@/Components/inertia-page-shell";
import {
  ResourceTable,
  type ResourceColumn,
} from "@/Components/resource-table";

const registryItems = [
  {
    name: "laravel-inertia-base",
    type: "registry:base",
    group: "Setup",
    description: "Base config, CSS variables, and Laravel-oriented aliases.",
    href: "/r/laravel-inertia-base.json",
    previewId: "preview-setup",
  },
  {
    name: "button",
    type: "registry:ui",
    group: "Components",
    description: "Button primitive with variants, sizes, and Slot support.",
    href: "/r/button.json",
    previewId: "preview-button",
  },
  {
    name: "inertia-page-shell",
    type: "registry:component",
    group: "Components",
    description: "Page header with breadcrumbs, actions, and content layout.",
    href: "/r/inertia-page-shell.json",
    previewId: "preview-users-resource-page",
  },
  {
    name: "form-errors",
    type: "registry:component",
    group: "Components",
    description: "Validation error summary for Laravel error bags.",
    href: "/r/form-errors.json",
    previewId: "preview-form-errors",
  },
  {
    name: "empty-state",
    type: "registry:component",
    group: "Components",
    description: "Empty state for resource lists and dashboards.",
    href: "/r/empty-state.json",
    previewId: "preview-empty-state",
  },
  {
    name: "inertia-form-card",
    type: "registry:component",
    group: "Components",
    description: "Form container with title, description, actions, and errors.",
    href: "/r/inertia-form-card.json",
    previewId: "preview-users-resource-page",
  },
  {
    name: "resource-table",
    type: "registry:component",
    group: "Components",
    description: "Responsive resource table with typed column renderers.",
    href: "/r/resource-table.json",
    previewId: "preview-users-resource-page",
  },
  {
    name: "confirm-dialog",
    type: "registry:component",
    group: "Components",
    description: "Confirmation dialog for destructive and reversible actions.",
    href: "/r/confirm-dialog.json",
    previewId: "preview-users-resource-page",
  },
  {
    name: "users-resource-page",
    type: "registry:block",
    group: "Blocks",
    description: "Example resource page composed from the registry components.",
    href: "/r/users-resource-page.json",
    previewId: "preview-users-resource-page",
  },
];

const componentItems = registryItems.filter(
  (item) => item.group === "Components",
);
const blockItems = registryItems.filter((item) => item.group === "Blocks");
const setupItems = registryItems.filter((item) => item.group === "Setup");

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited";
};

const users: User[] = [
  {
    id: 1,
    name: "Avery Stone",
    email: "avery@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Mina Park",
    email: "mina@example.com",
    role: "Editor",
    status: "Invited",
  },
];

const userColumns: ResourceColumn<User>[] = [
  {
    key: "name",
    header: "Name",
    cell: (user) => (
      <div>
        <div className="font-medium text-foreground">{user.name}</div>
        <div className="text-muted-foreground">{user.email}</div>
      </div>
    ),
  },
  { key: "role", header: "Role", cell: (user) => user.role },
  { key: "status", header: "Status", cell: (user) => user.status },
  {
    key: "actions",
    header: <span className="sr-only">Actions</span>,
    className: "text-right",
    cell: (user) => (
      <ConfirmDialog
        destructive
        title="Delete user?"
        description={`This will remove ${user.name} from the workspace.`}
        confirmLabel="Delete"
        triggerIcon={<Trash2 className="size-4" aria-hidden="true" />}
        triggerLabel="Delete"
        triggerVariant="ghost"
      />
    ),
  },
];

export default function Home() {
  const [previewItem, setPreviewItem] = useState<
    (typeof registryItems)[number] | null
  >(null);

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
                laravel-inertia
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

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-stretch">
          <div className="flex min-h-[300px] flex-col justify-between rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase text-zinc-500 dark:text-zinc-400">
                shadcn-compatible registry
              </p>
              <div className="max-w-3xl space-y-3">
                <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
                  Laravel Inertia components
                </h1>
                <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  Installable React components, UI primitives, and resource page
                  blocks for Laravel applications using Inertia.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Stat label="Items" value="9" />
              <Stat label="Components" value={String(componentItems.length)} />
              <Stat label="Blocks" value={String(blockItems.length)} />
            </div>
          </div>

          <aside className="rounded-lg border border-zinc-200 bg-zinc-950 p-5 text-zinc-50 shadow-sm dark:border-zinc-800">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="font-semibold">Install</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Run inside the consuming Laravel app.
                </p>
              </div>
              <Terminal
                className="size-5 text-emerald-300"
                aria-hidden="true"
              />
            </div>
            <div className="mt-5 space-y-4">
              <CommandLine
                command="npm run registry:build"
                label="Build registry"
              />
              <CommandLine
                command="npx shadcn@latest add http://localhost:3000/r/index.json"
                label="Install starter bundle"
              />
            </div>
            <div className="mt-5 grid gap-2 text-sm text-zinc-300">
              <Endpoint label="Registry index" href="/r/registry.json" />
              <Endpoint label="Starter bundle" href="/r/index.json" />
            </div>
          </aside>
        </section>

        <section className="grid gap-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-semibold tracking-normal">
                Components
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Primitives and application components available as JSON
                payloads.
              </p>
            </div>
            <a
              className="inline-flex h-9 w-fit items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              href="/r/registry.json"
            >
              <Code2 className="size-4" aria-hidden="true" />
              registry.json
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {componentItems.map((item) => (
              <RegistryCard
                item={item}
                key={item.name}
                onPreview={() => setPreviewItem(item)}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-5">
          <div>
            <h2 className="text-xl font-semibold tracking-normal">Blocks</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Composed page examples built from the registry components.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blockItems.map((item) => (
              <RegistryCard
                item={item}
                key={item.name}
                onPreview={() => setPreviewItem(item)}
              />
            ))}
          </div>
        </section>

        <section
          className="grid scroll-mt-6 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]"
          id="preview-setup"
        >
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="font-semibold">Setup</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {setupItems.map((item) => (
                <a
                  className="rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  href={item.href}
                  key={item.name}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        {item.type}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="size-4 text-zinc-400"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="font-semibold">Base Configuration</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <ConfigRow label="Style" value="laravel-inertia" />
              <ConfigRow label="RSC" value="false" />
              <ConfigRow label="CSS" value="resources/css/app.css" />
              <ConfigRow label="Components" value="@/Components" />
              <ConfigRow label="UI" value="@/Components/ui" />
              <ConfigRow label="Lib" value="@/lib" />
              <ConfigRow label="Hooks" value="@/hooks" />
            </dl>
          </aside>
        </section>

        <section
          className="scroll-mt-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
          id="preview-users-resource-page"
        >
          <div className="flex items-center gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <PanelTop
              className="size-5 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-semibold">Preview</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Rendered from the registry source files.
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-lg border border-zinc-200 bg-background dark:border-zinc-800">
            <InertiaPageShell
              title="Users"
              description="Manage application access, roles, and invitations."
              breadcrumbs={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Users" },
              ]}
              actions={[
                { label: "Invite user", href: "/users/create", icon: Plus },
              ]}
              className="px-5 py-5 sm:px-5 lg:px-5"
            >
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
                <ResourceTable
                  items={users}
                  columns={userColumns}
                  getRowKey={(user) => user.id}
                />
                <InertiaFormCard
                  title="Invite user"
                  description="Send an invitation with a role already assigned."
                  errors={{ email: "The email field is required." }}
                  submitLabel="Send invite"
                >
                  <div className="grid gap-4">
                    <label className="grid gap-2 text-sm font-medium">
                      Email
                      <input
                        className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        placeholder="name@example.com"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium">
                      Role
                      <select className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
                        <option>Editor</option>
                        <option>Admin</option>
                      </select>
                    </label>
                  </div>
                </InertiaFormCard>
              </div>
            </InertiaPageShell>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <div
            className="scroll-mt-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            id="preview-button"
          >
            <h2 className="font-semibold">Button</h2>
            <div className="mt-4 flex min-h-52 flex-col justify-center gap-3 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex flex-wrap gap-2">
                <Button>Save changes</Button>
                <Button variant="outline">Cancel</Button>
                <Button variant="secondary">Draft</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="ghost">View details</Button>
                <Button size="sm" variant="destructive">Delete</Button>
              </div>
            </div>
          </div>
          <div
            className="scroll-mt-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            id="preview-empty-state"
          >
            <h2 className="font-semibold">Empty State</h2>
            <div className="mt-4">
              <EmptyState
                title="No projects found"
                description="Create a project or change your filters to continue."
                action={{ label: "Create project", href: "/projects/create" }}
              />
            </div>
          </div>
          <div
            className="scroll-mt-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            id="preview-form-errors"
          >
            <h2 className="font-semibold">Validation Errors</h2>
            <div className="mt-4">
              <FormErrors
                errors={{
                  email: "The email field is required.",
                  role: "Select a valid role.",
                }}
              />
            </div>
          </div>
        </section>
      </div>
      <RegistryPreviewDialog
        item={previewItem}
        onClose={() => setPreviewItem(null)}
      />
    </main>
  );
}

function RegistryCard({
  item,
  onPreview,
}: {
  item: (typeof registryItems)[number];
  onPreview: () => void;
}) {
  return (
    <div className="group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
      <button
        className="block w-full text-left"
        type="button"
        onClick={onPreview}
        aria-label={`Preview ${item.name}`}
      >
        <div className="aspect-[4/3] border-b border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <RegistryThumbnail name={item.name} />
        </div>
      </button>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <button className="min-w-0 text-left" type="button" onClick={onPreview}>
            <h3 className="truncate font-medium text-zinc-950 dark:text-zinc-50">
              {item.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {item.type}
            </p>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {item.description}
            </p>
          </button>
          <ArrowUpRight
            className="mt-1 size-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-950 dark:group-hover:text-zinc-50"
            aria-hidden="true"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-zinc-200 pt-3 dark:border-zinc-800">
          <button
            className="text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
            type="button"
            onClick={onPreview}
          >
            Preview
          </button>
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

function RegistryPreviewDialog({
  item,
  onClose,
}: {
  item: (typeof registryItems)[number] | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid bg-black/55 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registry-preview-title"
      onClick={onClose}
    >
      <div
        className="mx-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl flex-col self-center overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:max-h-[calc(100dvh-3rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-4 dark:border-zinc-800 sm:p-5">
          <div className="min-w-0">
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {item.type}
            </p>
            <h2
              className="mt-1 truncate text-xl font-semibold tracking-normal"
              id="registry-preview-title"
            >
              {item.name}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {item.description}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              href={item.href}
            >
              <FileJson className="size-4" aria-hidden="true" />
              JSON
            </a>
            <button
              className="inline-flex size-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              type="button"
              onClick={onClose}
              aria-label="Close preview"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto bg-[#f6f7f9] p-4 dark:bg-[#101113] sm:p-6">
          <RegistryPreview name={item.name} />
        </div>
      </div>
    </div>
  );
}

function RegistryPreview({ name }: { name: string }) {
  if (name === "button") {
    return (
      <PreviewSurface>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Save changes</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="secondary">Draft</Button>
          <Button variant="ghost">View details</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </PreviewSurface>
    );
  }

  if (name === "empty-state") {
    return (
      <PreviewSurface>
        <EmptyState
          title="No projects found"
          description="Create a project or change your filters to continue."
          action={{ label: "Create project", href: "/projects/create" }}
        />
      </PreviewSurface>
    );
  }

  if (name === "form-errors") {
    return (
      <PreviewSurface>
        <FormErrors
          errors={{
            email: "The email field is required.",
            role: "Select a valid role.",
          }}
        />
      </PreviewSurface>
    );
  }

  if (name === "inertia-form-card") {
    return (
      <PreviewSurface>
        <div className="mx-auto max-w-md">
          <InertiaFormCard
            title="Invite user"
            description="Send an invitation with a role already assigned."
            errors={{ email: "The email field is required." }}
            submitLabel="Send invite"
          >
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium">
                Email
                <input
                  className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="name@example.com"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Role
                <select className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
                  <option>Editor</option>
                  <option>Admin</option>
                </select>
              </label>
            </div>
          </InertiaFormCard>
        </div>
      </PreviewSurface>
    );
  }

  if (name === "resource-table") {
    return (
      <PreviewSurface>
        <ResourceTable
          items={users}
          columns={userColumns}
          getRowKey={(user) => user.id}
        />
      </PreviewSurface>
    );
  }

  if (name === "confirm-dialog") {
    return (
      <PreviewSurface>
        <div className="flex min-h-60 items-center justify-center">
          <ConfirmDialog
            destructive
            title="Delete user?"
            description="This will remove Avery Stone from the workspace."
            confirmLabel="Delete"
            triggerIcon={<Trash2 className="size-4" aria-hidden="true" />}
            triggerLabel="Delete user"
            triggerVariant="destructive"
          />
        </div>
      </PreviewSurface>
    );
  }

  if (name === "inertia-page-shell" || name === "users-resource-page") {
    return <UsersResourcePreview />;
  }

  return (
    <PreviewSurface>
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <ConfigRow label="Style" value="laravel-inertia" />
        <ConfigRow label="RSC" value="false" />
        <ConfigRow label="CSS" value="resources/css/app.css" />
        <ConfigRow label="Components" value="@/Components" />
        <ConfigRow label="UI" value="@/Components/ui" />
        <ConfigRow label="Lib" value="@/lib" />
        <ConfigRow label="Hooks" value="@/hooks" />
      </dl>
    </PreviewSurface>
  );
}

function UsersResourcePreview() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-background dark:border-zinc-800">
      <InertiaPageShell
        title="Users"
        description="Manage application access, roles, and invitations."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users" },
        ]}
        actions={[{ label: "Invite user", href: "/users/create", icon: Plus }]}
        className="px-5 py-5 sm:px-5 lg:px-5"
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <ResourceTable
            items={users}
            columns={userColumns}
            getRowKey={(user) => user.id}
          />
          <InertiaFormCard
            title="Invite user"
            description="Send an invitation with a role already assigned."
            errors={{ email: "The email field is required." }}
            submitLabel="Send invite"
          >
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium">
                Email
                <input
                  className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="name@example.com"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Role
                <select className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
                  <option>Editor</option>
                  <option>Admin</option>
                </select>
              </label>
            </div>
          </InertiaFormCard>
        </div>
      </InertiaPageShell>
    </div>
  );
}

function PreviewSurface({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
      {children}
    </div>
  );
}

function RegistryThumbnail({ name }: { name: string }) {
  if (name === "button") {
    return (
      <div className="flex h-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <span className="rounded-md bg-zinc-950 px-3 py-2 text-xs font-medium text-white dark:bg-zinc-50 dark:text-zinc-950">
          Save
        </span>
        <span className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-medium dark:border-zinc-800">
          Cancel
        </span>
      </div>
    );
  }

  if (name === "inertia-page-shell") {
    return (
      <div className="h-full rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="h-2 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="h-4 w-36 rounded bg-zinc-900 dark:bg-zinc-100" />
            <div className="h-2 w-44 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="h-8 w-20 rounded bg-blue-600" />
        </div>
        <div className="mt-5 h-16 rounded border border-dashed border-zinc-300 dark:border-zinc-700" />
      </div>
    );
  }

  if (name === "form-errors") {
    return (
      <div className="flex h-full items-center justify-center rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-950 dark:bg-red-950/30">
        <div className="w-full max-w-52 space-y-2">
          <div className="h-3 w-36 rounded bg-red-300 dark:bg-red-800" />
          <div className="h-2 w-44 rounded bg-red-200 dark:bg-red-900" />
          <div className="h-2 w-32 rounded bg-red-200 dark:bg-red-900" />
        </div>
      </div>
    );
  }

  if (name === "empty-state") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed border-zinc-300 bg-white p-4 text-center dark:border-zinc-700 dark:bg-zinc-950">
        <div className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800" />
        <div className="mt-4 h-3 w-32 rounded bg-zinc-900 dark:bg-zinc-100" />
        <div className="mt-2 h-2 w-44 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  }

  if (name === "inertia-form-card") {
    return (
      <div className="h-full rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="h-3 w-28 rounded bg-zinc-900 dark:bg-zinc-100" />
        <div className="mt-2 h-2 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-5 space-y-3">
          <div className="h-8 rounded border border-zinc-200 dark:border-zinc-800" />
          <div className="h-8 rounded border border-zinc-200 dark:border-zinc-800" />
          <div className="ml-auto h-8 w-24 rounded bg-zinc-950 dark:bg-zinc-50" />
        </div>
      </div>
    );
  }

  if (name === "resource-table") {
    return (
      <div className="h-full rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="grid grid-cols-3 gap-2 border-b border-zinc-200 pb-2 dark:border-zinc-800">
          <div className="h-2 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-2 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-2 rounded bg-zinc-300 dark:bg-zinc-700" />
        </div>
        <div className="mt-3 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="h-3 rounded bg-zinc-900 dark:bg-zinc-100" />
            <div className="h-3 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-3 rounded bg-zinc-900 dark:bg-zinc-100" />
            <div className="h-3 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  if (name === "confirm-dialog") {
    return (
      <div className="flex h-full items-center justify-center rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="w-full max-w-48 rounded-lg border border-zinc-200 p-4 shadow-sm dark:border-zinc-800">
          <div className="h-3 w-28 rounded bg-zinc-900 dark:bg-zinc-100" />
          <div className="mt-3 h-2 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-5 flex justify-end gap-2">
            <div className="h-7 w-16 rounded border border-zinc-200 dark:border-zinc-800" />
            <div className="h-7 w-16 rounded bg-red-600" />
          </div>
        </div>
      </div>
    );
  }

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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-[#f6f7f9] p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
      <p className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}

function CommandLine({ command, label }: { command: string; label: string }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase text-zinc-500">
        {label}
      </p>
      <code className="block overflow-x-auto rounded-md border border-white/10 bg-black px-3 py-3 text-sm leading-6 text-zinc-100">
        {command}
      </code>
    </div>
  );
}

function Endpoint({ label, href }: { label: string; href: string }) {
  return (
    <a
      className="flex items-center justify-between gap-3 rounded-md border border-white/10 px-3 py-2 hover:bg-white/5"
      href={href}
    >
      <span>{label}</span>
      <span className="font-mono text-xs text-zinc-500">{href}</span>
    </a>
  );
}

function ConfigRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 rounded-md border border-zinc-200 px-3 py-2 dark:border-zinc-800">
      <dt className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </dt>
      <dd className="break-all font-mono text-sm text-zinc-800 dark:text-zinc-200">
        {value}
      </dd>
    </div>
  );
}
