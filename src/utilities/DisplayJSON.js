import { useState, useContext, useEffect } from 'react';
import PublicationsContext from '../context/publications/publicationsContext';
import AuthorsContext from '../context/authors/authorsContext';

export const DisplayJSON = () => {
  const [dataForJSONPublications, setDataForJSONPublications] = useState([]);
  const [dataForJSONAuthors, setDataForJSONAuthors] = useState([]);

  const { publications, getAllPublications } = useContext(PublicationsContext);
  const { authors, getAllAuthors } = useContext(AuthorsContext);

  // Publications
  useEffect(() => {
    if (publications.length === 0) {
      getAllPublications();
    }
  }, [publications, getAllPublications]);

  useEffect(() => {
    if (publications.length > 0) {
      setDataForJSONPublications(publications);
    }
  }, [publications]);

  // Authors
  useEffect(() => {
    if (authors.length === 0) {
      getAllAuthors();
    }
  }, [authors, getAllAuthors]);

  useEffect(() => {
    if (authors.length > 0) {
      setDataForJSONAuthors(authors);
    }
  }, [authors]);

  return (
    <div>
      <h2>Display Data as JSON</h2>
      <h3>All Publications</h3>
      <pre>
        {dataForJSONPublications.length > 0 &&
          JSON.stringify(dataForJSONPublications, null, 2)}
      </pre>
      <div className='mb-4 mt-4 pt-2 border-t border-gray-200'>&nbsp;</div>
      <h3>All Authors</h3>
      <pre>
        {dataForJSONAuthors.length > 0 &&
          JSON.stringify(dataForJSONAuthors, null, 2)}
      </pre>
    </div>
  );
};
