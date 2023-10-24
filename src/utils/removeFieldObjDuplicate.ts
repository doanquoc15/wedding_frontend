export const removeDuplicatesByField = (
  objects: Record<string, any>[],
  fieldName: string
): Record<string, any>[] => {
  const uniqueObjects: Record<string, any>[] = [];
  const fieldValues: Record<string, boolean> = {};

  for (const obj of objects) {
    const fieldValue = obj[fieldName];

    if (!fieldValues[fieldValue]) {
      fieldValues[fieldValue] = true;
      uniqueObjects.push(obj);
    }
  }

  return uniqueObjects;
};
