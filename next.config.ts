import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [
            {
              type: "header",
              key: "accept",
              value: "(.*)application/vnd\\.shadcn\\.v1\\+json(.*)",
            },
          ],
          destination: "/r/index.json",
        },
        {
          source: "/",
          has: [
            {
              type: "header",
              key: "user-agent",
              value: "shadcn",
            },
          ],
          destination: "/r/index.json",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "Vary", value: "Accept, User-Agent" }],
      },
    ];
  },
};

export default nextConfig;
