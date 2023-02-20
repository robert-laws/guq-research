export const SortText = (array) => {
  const sortByLastName = (a, b) => {
    const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
    const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  };

  return array.sort(sortByLastName);
};
