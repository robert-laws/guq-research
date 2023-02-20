import { useReducer, useCallback } from 'react';
import {
  SET_QUERY,
  SET_FILTERS,
  SET_SORT,
  TOGGLE_FILTERS_TOUCHED,
  SEARCH_RESULTS,
} from '../types';
import InteractionsContext from './interactionsContext';
import interactionsReducer from './interactionsReducer';

const InteractionsState = ({ children }) => {
  const initialState = {
    query: '',
    filters: {
      publishingGroup: [],
      year: [],
      lastName: [],
      documentType: [],
      language: [],
    },
    sort: {
      field: 'lastName',
      direction: 'asc',
    },
    filtersTouched: false,
    searchResults: [],
  };

  const [state, dispatch] = useReducer(interactionsReducer, initialState);

  const setQuery = useCallback(
    (query) => {
      dispatch({
        type: SET_QUERY,
        payload: query,
      });
    },
    [dispatch]
  );

  const setFilters = useCallback(
    (filters) => {
      dispatch({
        type: SET_FILTERS,
        payload: filters,
      });
    },
    [dispatch]
  );

  const setSort = useCallback(
    (sort) => {
      dispatch({
        type: SET_SORT,
        payload: sort,
      });
    },
    [dispatch]
  );

  const setFiltersTouched = useCallback(
    (boolean) => {
      dispatch({
        type: TOGGLE_FILTERS_TOUCHED,
        payload: boolean,
      });
    },
    [dispatch]
  );

  const setSearchResults = useCallback(
    (searchResults) => {
      dispatch({
        type: SEARCH_RESULTS,
        payload: searchResults,
      });
    },
    [dispatch]
  );

  return (
    <InteractionsContext.Provider
      value={{
        query: state.query,
        filters: state.filters,
        sort: state.sort,
        filtersTouched: state.filtersTouched,
        searchResults: state.searchResults,
        setQuery,
        setFilters,
        setSort,
        setFiltersTouched,
        setSearchResults,
      }}
    >
      {children}
    </InteractionsContext.Provider>
  );
};

export default InteractionsState;
