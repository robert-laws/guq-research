import { useState } from 'react';
import { db } from '../firebase/firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import allData from '../data/publications-data-july-24-2023.json';

export const DataLoadPublications = () => {
  const [loading, setLoading] = useState(false);

  const loadData = async (dataFields) => {
    console.log(dataFields.pubId);

    await addDoc(collection(db, 'publications'), {
      pubId: dataFields.pubId,
      authorId: dataFields.authorId,
      lastName: dataFields.lastName,
      firstName: dataFields.firstName,
      authors: dataFields.authors,
      title: dataFields.title,
      year: dataFields.year,
      sourceTitle: dataFields.sourceTitle,
      volume: dataFields.volume,
      issue: dataFields.issue,
      pageStart: dataFields.pageStart,
      pageEnd: dataFields.pageEnd,
      doi: dataFields.doi,
      link: dataFields.link,
      abstract: dataFields.abstract,
      bookReview: dataFields.bookReview,
      authorKeywords: dataFields.authorKeywords,
      indexKeywords: dataFields.indexKeywords,
      editors: dataFields.editors,
      publisher: dataFields.publisher,
      issn: dataFields.issn,
      isbn: dataFields.isbn,
      language: dataFields.language,
      documentType: dataFields.documentType,
      callNumber: dataFields.callNumber,
      publicationAffiliation: dataFields.publicationAffiliation,
      publishingGroup: dataFields.publishingGroup,
      fundingSource: dataFields.fundingSource,
      fundingDetails: dataFields.fundingDetails,
      sustainableDevelopmentGoals: dataFields.sustainableDevelopmentGoals,
    });
  };

  const handleDataLoad = () => {
    allData.forEach((dataFields) => {
      loadData(dataFields);
    });
  };

  const handleClick = () => {
    setLoading(true);

    handleDataLoad();

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      <h2>Data Load - Publications</h2>
      <div className='flex items-center justify-center'>
        <button
          type='button'
          className={`${
            loading ? 'cursor-not-allowed' : 'cursor-pointer'
          } inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-700 transition ease-in-out duration-150`}
          disabled={loading}
          onClick={handleClick}
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
          {loading ? 'Saving...' : 'Load'}
        </button>
      </div>
    </div>
  );
};
