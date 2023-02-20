export const SortByTextField = (array, field) => {
  const sortByTextField = (a, b) => {
    const nameA = a[field].toUpperCase(); // ignore upper and lowercase
    const nameB = b[field].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  };

  return array.sort(sortByTextField);
};
