import { useReducer, useCallback } from 'react';
import { db } from '../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { GET_USER_BY_UID, CLEAR_USER, USER_ERROR } from '../types';
import UsersContext from './usersContext';
import usersReducer from './usersReducer';

const UsersState = ({ children }) => {
  const initialState = {
    user: null,
    isLoading: true,
    userError: null,
  };

  const [state, dispatch] = useReducer(usersReducer, initialState);

  const getUserByUid = useCallback(
    async (uid) => {
      const userRef = doc(db, 'users', uid);

      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          dispatch({
            type: GET_USER_BY_UID,
            payload: docSnap.data(),
          });
        } else {
          dispatch({
            type: USER_ERROR,
            payload: 'No user found',
          });
        }
      } catch (error) {
        dispatch({
          type: USER_ERROR,
          payload: error.message,
        });
      }
    },
    [dispatch]
  );

  return (
    <UsersContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        userError: state.userError,
        getUserByUid,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersState;
