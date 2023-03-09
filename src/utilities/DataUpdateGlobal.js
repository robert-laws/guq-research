import { useState } from 'react';
import { db } from '../firebase/firebase-config';
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';

export const DataUpdateGlobal = () => {
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);

  const dataCollectionUpdate = async () => {
    const pubsRef = collection(db, 'publications');
    try {
      // const q = query(pubsRef, where('publicationAffiliation', '==', 'GUQ'));
      // const querySnapshot = await getDocs(q);
      const querySnapshot = await getDocs(pubsRef);
      if (querySnapshot.empty) {
        console.log('No publications found');
      }
      querySnapshot.forEach((document) => {
        if (document.data().doi === '') {
          // console.log('No DOI...');
        } else {
          const docId = document.id;
          const docRef = doc(db, 'publications', docId);
          const doiData = document.data().doi;
          // console.log('DOI - ', document.data().doi);
          updateDoc(docRef, {
            link: doiData,
          });
        }
      });
    } catch (error) {
      console.log(`Database Error: ${error.message}`);
    }
  };

  const dataCollectionList = async () => {
    const pubsRef = collection(db, 'publications');
    try {
      const querySnapshot = await getDocs(pubsRef);
      if (querySnapshot.empty) {
        console.log('No publications found');
      }
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    } catch (error) {
      console.log(`Database Error: ${error.message}`);
    }
  };

  const handleClickUpdate = () => {
    setLoading(true);

    dataCollectionUpdate();

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleClickList = () => {
    setLoadingTwo(true);

    dataCollectionList();

    setTimeout(() => {
      setLoadingTwo(false);
    }, 3000);
  };

  return (
    <div>
      <h2>Data Update Global</h2>
      <div className='flex items-center justify-center'>
        <button
          type='button'
          className={`${
            loading ? 'cursor-not-allowed' : 'cursor-pointer'
          } mr-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-700 transition ease-in-out duration-150`}
          disabled={loading}
          onClick={handleClickUpdate}
        >
          <svg
            className={`${
              loading ? 'animate-spin -ml-1 mr-3 h-5 w-5 text-white' : ''
            }`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          {loading ? 'Saving...' : 'Update'}
        </button>
        <button
          type='button'
          className={`${
            loadingTwo ? 'cursor-not-allowed' : 'cursor-pointer'
          } inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-700 transition ease-in-out duration-150`}
          disabled={loadingTwo}
          onClick={handleClickList}
        >
          <svg
            className={`${
              loadingTwo ? 'animate-spin -ml-1 mr-3 h-5 w-5 text-white' : ''
            }`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          {loadingTwo ? 'Saving...' : 'List'}
        </button>
      </div>
    </div>
  );
};
