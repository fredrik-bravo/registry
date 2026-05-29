# Laravel Inertia shadcn Registry

This is a custom [shadcn](https://ui.shadcn.com/docs/registry) registry hosted by Next.js for Laravel React Inertia applications.

## Getting Started

Build the registry JSON files:

```bash
npm run registry:build
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to inspect the registry. Built items are served from `/r`.

Install the starter bundle in a Laravel React Inertia app:

```bash
npx shadcn@latest add http://localhost:3000/r/index.json
```

Install a single item:

```bash
npx shadcn@latest add http://localhost:3000/r/inertia-page-shell.json
```

## Laravel Inertia Notes

- Components avoid Next.js APIs, server components, and `next/link`.
- Link-aware components accept a `linkComponent` prop, so you can pass `Link` from `@inertiajs/react`.
- Registry file targets use `@components`, `@ui`, and `@lib` placeholders so installs follow the consumer project's `components.json` aliases.
- The base item sets `rsc` to `false` and defaults aliases toward common Laravel paths.

Example usage with Inertia's `Link`:

```tsx
import { Link } from "@inertiajs/react";
import { InertiaPageShell } from "@/Components/inertia-page-shell";

export default function UsersIndex() {
  return (
    <InertiaPageShell
      title="Users"
      description="Manage application access."
      linkComponent={Link}
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Users" },
      ]}
      actions={[{ label: "Create user", href: "/users/create" }]}
    >
      {/* page content */}
    </InertiaPageShell>
  );
}
```

## Registry Source

- `registry.json` defines registry metadata and items.
- `registry/laravel-inertia` contains source files used by `shadcn build`.
- `public/r` is generated output and can be regenerated at any time.

# Features and changes needed for production

## Deployment

Fix deployment with github action automation

## Fix naming

Change the name of registry to something bravomedia specific

## Registry structure

### Components

- ui/ → base components (Button, Input, Dialog)
- forms/ → form-related compositions
- layouts/ → page layouts and sections
- blocks/ → reusable modules, framework sections and pages
- hooks/ → reusable custom React hooks for shared state, logic, and behavior
- lib/ → shared utilities, helper functions, configuration, and core application logic

## naming conventions

Use predictable and descriptive names:

- user-card.tsx
- settings-form.tsx
- dashboard-sidebar.tsx

## Registry metadata

Each registry item should include:

- component name
- description
- dependencies
- category/type
- files included
- optional demo/example usage
