import { useReducer, useCallback } from 'react';
import { db } from '../../firebase/firebase-config';
import {
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
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
  GET_ALL_AUTHOR_NAMES,
} from '../types';
import AuthorsContext from './authorsContext';
import authorsReducer from './authorsReducer';
import { SortText } from '../../utilities';

const AuthorsState = ({ children }) => {
  const initialState = {
    authors: [],
    authorPublications: [],
    isLoading: true,
    authorsError: null,
    singleAuthor: null,
    isLoadingSingle: true,
    singleAuthorError: null,
    isLoadingAuthorPublications: true,
    authorPublicationsError: null,
  };

  const [state, dispatch] = useReducer(authorsReducer, initialState);

  const getAllAuthors = useCallback(async () => {
    const authorsRef = collection(db, 'authors');

    try {
      const querySnapshot = await getDocs(authorsRef);
      if (querySnapshot.empty) {
        dispatch({
          type: AUTHORS_ERROR,
          payload: 'No authors found',
        });
      } else {
        let allAuthors = [];
        querySnapshot.forEach((doc) => {
          allAuthors.push({ ...doc.data(), id: doc.id });
        });

        dispatch({
          type: GET_ALL_AUTHORS,
          payload: SortText(allAuthors),
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHORS_ERROR,
        payload: error.message,
      });
    }
  }, [dispatch]);

  const getSingleAuthorById = useCallback(
    async (authorId) => {
      const docRef = doc(db, 'authors', authorId);
      const docSnap = await getDoc(docRef);
      try {
        if (!docSnap.exists()) {
          dispatch({
            type: SINGLE_AUTHOR_ERROR,
            payload: 'Author not found',
          });
        } else {
          let singleAuthor = [];
          singleAuthor.push({ ...docSnap.data(), id: docSnap.id });

          dispatch({
            type: GET_SINGLE_AUTHOR,
            payload: singleAuthor[0],
          });
        }
      } catch (error) {
        dispatch({
          type: SINGLE_AUTHOR_ERROR,
          payload: error.message,
        });
      }
    },
    [dispatch]
  );

  const getPublicationsByAuthorId = useCallback(
    async (authorId) => {
      const pubsRef = collection(db, 'publications');
      const q = query(pubsRef, where('authorId', '==', authorId));

      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          dispatch({
            type: AUTHOR_PUBLICATIONS_ERROR,
            payload: 'No publications found',
          });
        } else {
          let allPublications = [];
          querySnapshot.forEach((doc) => {
            allPublications.push({ ...doc.data(), id: doc.id });
          });

          dispatch({
            type: GET_ALL_AUTHOR_PUBLICATIONS,
            payload: allPublications,
          });
        }
      } catch (error) {
        dispatch({
          type: AUTHOR_PUBLICATIONS_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  const resetSingleAuthorLoading = useCallback(() => {
    dispatch({
      type: RESET_SINGLE_AUTHOR_LOADING,
    });
  }, [dispatch]);

  const resetSingleAuthorPublicationsLoading = useCallback(() => {
    dispatch({
      type: RESET_SINGLE_AUTHOR_PUBLICATIONS_LOADING,
    });
  }, [dispatch]);

  const createSingleAuthor = useCallback(
    async (newAuthor) => {
      const authorsRef = collection(db, 'authors');
      let newDocId = '';

      try {
        const newDoc = await addDoc(authorsRef, newAuthor);
        newDocId = newDoc.id;

        dispatch({
          type: CREATE_SINGLE_AUTHOR,
          payload: { ...newAuthor, id: newDocId },
        });
      } catch (error) {
        dispatch({
          type: SINGLE_AUTHOR_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }

      return newDocId;
    },
    [dispatch]
  );

  const updateSingleAuthor = useCallback(
    async (authorData) => {
      const docId = authorData.id;
      delete authorData.id;
      const docRef = doc(db, 'authors', docId);

      try {
        const updatedAuthor = await updateDoc(docRef, authorData);

        if (updatedAuthor.exists()) {
          dispatch({
            type: UPDATE_SINGLE_AUTHOR,
            payload: { ...updatedAuthor.data(), id: updatedAuthor.id },
          });
        } else {
          dispatch({
            type: SINGLE_AUTHOR_ERROR,
            payload: 'Error Updating Author',
          });
        }
      } catch (error) {
        dispatch({
          type: SINGLE_AUTHOR_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  const deletePublicationsByAuthorId = useCallback(
    async (authorId) => {
      const pubsRef = collection(db, 'authors');
      const q = query(pubsRef, where('authorId', '==', authorId));

      try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // do nothing
        } else {
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });

          // dispatch({
          //   type: DELETE_PUBLICATIONS_BY_AUTHOR_ID,
          //   payload: authorId,
          // });
        }
      } catch (error) {
        dispatch({
          type: AUTHOR_PUBLICATIONS_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  const deleteSingleAuthor = useCallback(
    async (authorId) => {
      const docRef = doc(db, 'authors', authorId);

      try {
        await deleteDoc(docRef);
        await deletePublicationsByAuthorId(authorId);

        dispatch({
          type: DELETE_SINGLE_AUTHOR,
          payload: authorId,
        });
      } catch (error) {
        dispatch({
          type: SINGLE_AUTHOR_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }
    },
    [dispatch, deletePublicationsByAuthorId]
  );

  return (
    <AuthorsContext.Provider
      value={{
        authors: state.authors,
        authorPublications: state.authorPublications,
        isLoading: state.isLoading,
        authorsError: state.authorsError,
        singleAuthor: state.singleAuthor,
        isLoadingSingle: state.isLoadingSingle,
        singleAuthorError: state.singleAuthorError,
        authorPublicationsError: state.authorPublicationsError,
        isLoadingAuthorPublications: state.isLoadingAuthorPublications,
        getAllAuthors,
        getSingleAuthorById,
        resetSingleAuthorLoading,
        getPublicationsByAuthorId,
        resetSingleAuthorPublicationsLoading,
        createSingleAuthor,
        updateSingleAuthor,
        deleteSingleAuthor,
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
};

export default AuthorsState;
