import { useReducer, useCallback } from 'react';
// import { v4 as uuid } from 'uuid';
import { db } from '../../firebase/firebase-config';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  GET_ALL_PUBLICATIONS,
  GET_FILTERED_PUBLICATIONS,
  PUBLICATIONS_ERROR,
  GET_SINGLE_PUBLICATION,
  SINGLE_PUBLICATION_ERROR,
  RESET_SINGLE_PUBLICATION_LOADING,
  CREATE_SINGLE_PUBLICATION,
  UPDATE_SINGLE_PUBLICATION,
  DELETE_SINGLE_PUBLICATION,
} from '../types';
import PublicationsContext from './publicationsContext';
import publicationsReducer from './publicationsReducer';
import { SortByTextField } from '../../utilities';
// import data from '../../data/faculty-data-jan-31-2022.json';

const PublicationsState = ({ children }) => {
  const initialState = {
    publications: [],
    filteredPublications: [],
    isLoading: true,
    publicationsError: null,
    singlePublication: null,
    isLoadingSingle: true,
    singlePublicationError: null,
  };

  const [state, dispatch] = useReducer(publicationsReducer, initialState);

  const getAllPublications = useCallback(async () => {
    const pubsRef = collection(db, 'publications');
    try {
      const querySnapshot = await getDocs(pubsRef);
      if (querySnapshot.empty) {
        dispatch({
          type: PUBLICATIONS_ERROR,
          payload: 'No publications found',
        });
      } else {
        let allPublications = [];
        querySnapshot.forEach((doc) => {
          allPublications.push({ ...doc.data(), id: doc.id });
        });

        dispatch({
          type: GET_ALL_PUBLICATIONS,
          payload: SortByTextField(allPublications, 'lastName'),
        });
      }
    } catch (error) {
      dispatch({
        type: PUBLICATIONS_ERROR,
        payload: `Database Error: ${error.message}`,
      });
    }

    // let allPublications = [];
    // data.forEach((faculty, index) => {
    //   allPublications.push({ id: index, ...faculty });
    // });

    // try {
    //   dispatch({
    //     type: GET_ALL_PUBLICATIONS,
    //     payload: SortByTextField(allPublications, 'lastName'),
    //   });
    // } catch (error) {
    //   dispatch({
    //     type: PUBLICATIONS_ERROR,
    //     payload: error,
    //   });
    // }
  }, [dispatch]);

  const getSinglePublicationById = useCallback(
    async (docId) => {
      const docRef = doc(db, 'publications', docId);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch({
            type: GET_SINGLE_PUBLICATION,
            payload: { ...docSnap.data(), id: docSnap.id },
          });
        } else {
          dispatch({
            type: SINGLE_PUBLICATION_ERROR,
            payload: 'No publication found',
          });
        }
      } catch (error) {
        dispatch({
          type: SINGLE_PUBLICATION_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  const filterPublications = useCallback(
    (results) => {
      dispatch({
        type: GET_FILTERED_PUBLICATIONS,
        payload: results,
      });
    },
    [dispatch]
  );

  const resetSinglePublicationLoading = useCallback(() => {
    dispatch({
      type: RESET_SINGLE_PUBLICATION_LOADING,
    });
  }, [dispatch]);

  const createSinglePublication = useCallback(
    async (newPublication) => {
      const pubsRef = collection(db, 'publications');
      let newDocId = '';

      try {
        const newDoc = await addDoc(pubsRef, newPublication);
        newDocId = newDoc.id;

        dispatch({
          type: CREATE_SINGLE_PUBLICATION,
          payload: { ...newPublication, id: newDocId },
        });
      } catch (error) {
        dispatch({
          type: SINGLE_PUBLICATION_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }

      return newDocId;
    },
    [dispatch]
  );

  const updateSinglePublication = useCallback(
    async (publicationData) => {
      const docId = publicationData.id;
      delete publicationData.id;
      const docRef = doc(db, 'publications', docId);

      try {
        const updatedPublication = await updateDoc(docRef, publicationData);

        if (updatedPublication.exists()) {
          dispatch({
            type: UPDATE_SINGLE_PUBLICATION,
            payload: {
              ...updatedPublication.data(),
              id: updatedPublication.id,
            },
          });
        } else {
          dispatch({
            type: SINGLE_PUBLICATION_ERROR,
            payload: 'Error Updating Publication',
          });
        }
      } catch (error) {
        dispatch({
          type: SINGLE_PUBLICATION_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  const deleteSinglePublication = useCallback(
    async (docId) => {
      const docRef = doc(db, 'publications', docId);

      try {
        await deleteDoc(docRef);

        dispatch({
          type: DELETE_SINGLE_PUBLICATION,
          payload: docId,
        });
      } catch (error) {
        dispatch({
          type: SINGLE_PUBLICATION_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  return (
    <PublicationsContext.Provider
      value={{
        publications: state.publications,
        filteredPublications: state.filteredPublications,
        isLoading: state.isLoading,
        publicationsError: state.publicationsError,
        singlePublication: state.singlePublication,
        isLoadingSingle: state.isLoadingSingle,
        singlePublicationError: state.singlePublicationError,
        getAllPublications,
        filterPublications,
        getSinglePublicationById,
        resetSinglePublicationLoading,
        createSinglePublication,
        updateSinglePublication,
        deleteSinglePublication,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};

export default PublicationsState;
