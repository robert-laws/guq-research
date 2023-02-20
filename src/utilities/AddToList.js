export const AddToList = (array, field) => {
  const data = {};

  array.forEach((item) => {
    const dataField = item[field];

    if (data[dataField]) {
      data[dataField]++;
    } else {
      data[dataField] = 1;
    }
  });

  return data;
};
