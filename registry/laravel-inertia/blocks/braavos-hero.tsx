import { cn } from "@/lib/utils";

export type BraavosHeroData = {
  foreground: {
    title: string;
    body?: string | null;
  };
  background: {
    image: string;
    url?: string | null;
  };
  settings?: {
    theme?: "light" | "dark";
    width?: "full" | "grid";
  };
};

export type BraavosHeroProps = {
  data: BraavosHeroData;
  className?: string;
};

const defaultSettings = {
  theme: "light",
  width: "full",
} satisfies Required<NonNullable<BraavosHeroData["settings"]>>;

export function BraavosHero({ data, className }: BraavosHeroProps) {
  const settings = { ...defaultSettings, ...data.settings };
  const imageUrl = data.background.url ?? data.background.image;
  const isDark = settings.theme === "dark";
  const isGridWidth = settings.width === "grid";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-background",
        isGridWidth ? "mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8" : "w-full",
        className,
      )}
    >
      <div
        className={cn(
          "relative min-h-125 overflow-hidden",
          isGridWidth && "rounded-lg",
        )}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${JSON.stringify(imageUrl)})` }}
        />
        <div
          className={cn(
            "absolute inset-0",
            isDark ? "bg-zinc-950/68" : "bg-white/70",
          )}
        />

        <div className="relative flex min-h-125 items-center">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
            <div
              className={cn(
                "max-w-3xl",
                isDark ? "text-white" : "text-zinc-950",
              )}
            >
              <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl lg:text-6xl">
                {data.foreground.title}
              </h1>
              {data.foreground.body ? (
                <div
                  className={cn(
                    "mt-6 max-w-2xl text-base leading-8 sm:text-lg [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:pl-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5",
                    isDark
                      ? "text-zinc-100 [&_a]:text-white"
                      : "text-zinc-700 [&_a]:text-zinc-950",
                  )}
                  dangerouslySetInnerHTML={{ __html: data.foreground.body }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const braavosHeroPreviewData = {
  foreground: {
    title: "Lorem Ipsum",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
  },
  background: {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
  },
  settings: {
    theme: "dark",
    width: "full",
  },
} satisfies BraavosHeroData;
