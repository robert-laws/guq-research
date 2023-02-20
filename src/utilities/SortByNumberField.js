export const SortByNumberField = (array, field) => {
  return array.sort((a, b) => {
    return a[field] - b[field];
  });
};
