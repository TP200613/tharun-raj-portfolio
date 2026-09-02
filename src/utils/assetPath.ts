/**
 * Helper to safely resolve public asset paths for GitHub Pages sub-directories and local dev.
 * Completely idempotent: prevents double prefixing if called multiple times.
 */
export const getAssetUrl = (path?: string): string => {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const rawBase = import.meta.env.BASE_URL || '/';
  const prefix = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const cleanBase = prefix.replace(/^\/|\/$/g, ''); // e.g. "tharun-raj-portfolio"

  let cleanPath = path.trim();
  // Strip leading ./ or /
  cleanPath = cleanPath.replace(/^\.?\//, '');

  // Strip duplicate base prefix if it already exists in cleanPath
  if (cleanBase && cleanPath.startsWith(cleanBase + '/')) {
    cleanPath = cleanPath.slice(cleanBase.length + 1);
  } else if (cleanBase && cleanPath === cleanBase) {
    cleanPath = '';
  }

  // Strip leading slashes again after base removal
  cleanPath = cleanPath.replace(/^\.?\//, '');

  return `${prefix}${cleanPath}`;
};

export default getAssetUrl;
