import type { NextConfig } from "next";

// Статический экспорт для GitHub Pages. BASE_PATH задаётся в CI (например, /lgr-group);
// при локальной разработке и на собственном домене остаётся пустым.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
