import { SortByNumberField, SortByTextField } from '.';

export const SortData = ({ array, field }) => {
  let sortedPublications = [];

  switch (field) {
    case 'author':
      sortedPublications = SortByTextField(array, 'lastName');
      break;
    case 'title':
      sortedPublications = SortByTextField(array, 'title');
      break;
    case 'year-newest':
      sortedPublications = SortByNumberField(array, 'year').reverse();
      break;
    case 'year-oldest':
      sortedPublications = SortByNumberField(array, 'year');
      break;
    default:
      sortedPublications = array;
      break;
  }

  return sortedPublications;
};
