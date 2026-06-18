const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(
  /\/api\/?$/,
  ""
);

export function assetUrl(path) {
  if (!path) return "";
  if (/^(https?:|blob:|data:)/.test(path)) return path;
  if (path.startsWith("/uploads/")) return API_ORIGIN + path;
  return path;
}
