export const AddToAndSortList = (array, field) => {
  const data = {};

  array.forEach((item) => {
    const dataField = item[field];

    if (data[dataField]) {
      data[dataField]++;
    } else {
      data[dataField] = 1;
    }
  });

  console.log(data);
  // return SortList(data);
};

const SortList = (data) => {
  let sortable = [];

  for (let field in data) {
    sortable.push([field, data[field]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  return sortable;
};
