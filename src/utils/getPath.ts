export const getPath = (path: string) => {
  if (!path) return;
  return path.split("/")[path?.split("/").length - 1];
};