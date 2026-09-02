/**
 * Helper to safely resolve public asset paths for GitHub Pages sub-directories and local dev.
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
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || './';
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${prefix}${cleanPath}`;
};

export default getAssetUrl;
