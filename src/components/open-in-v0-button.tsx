import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

export function OpenInV0Button({
  name,
  className,
}: { name: string } & React.ComponentProps<typeof Button>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  return (
    <Button
      aria-label={`Open ${name} in v0`}
      size="sm"
      className={cn(
        "bg-black text-white shadow-none hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
        className,
      )}
      asChild
    >
      <a
        href={`https://v0.dev/chat/api/open?url=${baseUrl}/r/${name}.json`}
        target="_blank"
        rel="noreferrer"
      >
        Open in v0
      </a>
    </Button>
  );
}
