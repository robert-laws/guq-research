import {
  SET_QUERY,
  SET_FILTERS,
  SET_SORT,
  TOGGLE_FILTERS_TOUCHED,
  SEARCH_RESULTS,
} from '../types';

const interactionsReducer = (state, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    case SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    case TOGGLE_FILTERS_TOUCHED:
      return {
        ...state,
        filtersTouched: action.payload,
      };

    case SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };

    default:
      return state;
  }
};

export default interactionsReducer;
