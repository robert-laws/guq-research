import { GET_USER_BY_UID, CLEAR_USER, USER_ERROR } from '../types';

const usersReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_BY_UID:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        userError: null,
      };

    case USER_ERROR:
      return {
        ...state,
        userError: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
