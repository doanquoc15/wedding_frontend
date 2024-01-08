export function removeNullUndefined(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "undefined" || !obj[key]) {
      delete obj[key];
    }
  });
  return obj;
}