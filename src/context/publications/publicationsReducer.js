import {
  GET_ALL_PUBLICATIONS,
  GET_FILTERED_PUBLICATIONS,
  GET_SINGLE_PUBLICATION,
  PUBLICATIONS_ERROR,
  SINGLE_PUBLICATION_ERROR,
  RESET_SINGLE_PUBLICATION_LOADING,
  CREATE_SINGLE_PUBLICATION,
  UPDATE_SINGLE_PUBLICATION,
  DELETE_SINGLE_PUBLICATION,
  SEARCH_QUERY,
} from '../types';

const publicationsReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
        filteredPublications: action.payload,
        isLoading: false,
        publicationsError: null,
      };

    case GET_FILTERED_PUBLICATIONS:
      return {
        ...state,
        filteredPublications: action.payload,
        isLoading: false,
        publicationsError: null,
      };

    case GET_SINGLE_PUBLICATION:
      return {
        ...state,
        singlePublication: action.payload,
        isLoadingSingle: false,
        singlePublicationError: null,
      };

    case PUBLICATIONS_ERROR:
      return {
        ...state,
        publicationsError: action.payload,
        isLoading: false,
      };

    case SINGLE_PUBLICATION_ERROR:
      return {
        ...state,
        singlePublicationError: action.payload,
        isLoadingSingle: false,
      };

    case RESET_SINGLE_PUBLICATION_LOADING:
      return {
        ...state,
        isLoadingSingle: true,
      };

    case CREATE_SINGLE_PUBLICATION:
      return {
        ...state,
        isLoadingSingle: true,
        publications: [...state.publications, action.payload],
        filteredPublications: [...state.publications, action.payload],
      };

    case UPDATE_SINGLE_PUBLICATION:
      return {
        ...state,
        isLoadingSingle: true,
        publications: state.publications.map((publication) =>
          publication.id === action.payload.id ? action.payload : publication
        ),
        filteredPublications: state.publications.map((publication) =>
          publication.id === action.payload.id ? action.payload : publication
        ),
      };

    case DELETE_SINGLE_PUBLICATION:
      return {
        ...state,
        isLoadingSingle: true,
        publications: state.publications.filter(
          (publication) => publication.id !== action.payload
        ),
        filteredPublications: state.publications.filter(
          (publication) => publication.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default publicationsReducer;
