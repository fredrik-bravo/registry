import { Plus, Trash2 } from "lucide-react";

import { ConfirmDialog } from "@/Components/confirm-dialog";
import { InertiaFormCard } from "@/Components/inertia-form-card";
import { InertiaPageShell } from "@/Components/inertia-page-shell";
import {
  ResourceTable,
  type ResourceColumn,
} from "@/Components/resource-table";

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

const columns: ResourceColumn<User>[] = [
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

export default function UsersResourcePage() {
  return (
    <InertiaPageShell
      title="Users"
      description="Manage application access, invitations, and roles."
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Users" },
      ]}
      actions={[{ label: "Invite user", href: "/users/create", icon: Plus }]}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <ResourceTable
          items={users}
          columns={columns}
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
  );
}
