import {
  GET_ALL_AUTHORS,
  AUTHORS_ERROR,
  GET_SINGLE_AUTHOR,
  SINGLE_AUTHOR_ERROR,
  RESET_SINGLE_AUTHOR_LOADING,
  GET_ALL_AUTHOR_PUBLICATIONS,
  AUTHOR_PUBLICATIONS_ERROR,
  RESET_SINGLE_AUTHOR_PUBLICATIONS_LOADING,
  CREATE_SINGLE_AUTHOR,
  UPDATE_SINGLE_AUTHOR,
  DELETE_SINGLE_AUTHOR,
} from '../types';

const authorsReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_AUTHORS:
      return {
        ...state,
        authors: action.payload,
        isLoading: false,
        authorsError: null,
      };

    case GET_SINGLE_AUTHOR:
      return {
        ...state,
        singleAuthor: action.payload,
        isLoadingSingle: false,
        singleAuthorError: null,
      };

    case GET_ALL_AUTHOR_PUBLICATIONS:
      return {
        ...state,
        authorPublications: action.payload,
        isLoadingAuthorPublications: false,
        authorPublicationsError: null,
      };

    case AUTHORS_ERROR:
      return {
        ...state,
        authorsError: action.payload,
        isLoading: false,
      };

    case SINGLE_AUTHOR_ERROR:
      return {
        ...state,
        singleAuthorError: action.payload,
        isLoadingSingle: false,
      };

    case AUTHOR_PUBLICATIONS_ERROR:
      return {
        ...state,
        authorPublicationsError: action.payload,
        isLoadingAuthorPublications: false,
      };

    case RESET_SINGLE_AUTHOR_LOADING:
      return {
        ...state,
        isLoadingSingle: true,
        singleAuthor: null,
      };

    case RESET_SINGLE_AUTHOR_PUBLICATIONS_LOADING:
      return {
        ...state,
        isLoadingAuthorPublications: true,
        authorPublications: [],
      };

    case CREATE_SINGLE_AUTHOR:
      return {
        ...state,
        authors: [...state.authors, action.payload],
        isLoading: true,
        authorsError: null,
      };

    case UPDATE_SINGLE_AUTHOR:
      return {
        ...state,
        isLoadingSingle: true,
        authors: state.authors.map((author) =>
          author.id === action.payload.id ? action.payload : author
        ),
        authorsError: null,
      };

    case DELETE_SINGLE_AUTHOR:
      return {
        ...state,
        isLoading: true,
        isLoadingSingle: true,
        authors: state.authors.filter(
          (author) => author._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default authorsReducer;
