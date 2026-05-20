import * as React from "react";

import { EmptyState } from "@/Components/empty-state";
import { cn } from "@/lib/utils";

type ResourceColumn<TItem> = {
  key: string;
  header: React.ReactNode;
  cell: (item: TItem) => React.ReactNode;
  className?: string;
};

type ResourceTableProps<TItem> = {
  items: TItem[];
  columns: ResourceColumn<TItem>[];
  getRowKey: (item: TItem) => React.Key;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
};

export function ResourceTable<TItem>({
  items,
  columns,
  getRowKey,
  emptyTitle = "No records found",
  emptyDescription = "Try changing your filters or creating a new record.",
  className,
}: ResourceTableProps<TItem>) {
  if (items.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-card text-card-foreground",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs font-medium uppercase text-muted-foreground">
            <tr>
              {columns.map((column) => (
                <th
                  className={cn("px-4 py-3", column.className)}
                  key={column.key}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr
                className="transition-colors hover:bg-muted/40"
                key={getRowKey(item)}
              >
                {columns.map((column) => (
                  <td
                    className={cn("px-4 py-3 align-middle", column.className)}
                    key={column.key}
                  >
                    {column.cell(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type { ResourceColumn };
