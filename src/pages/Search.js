import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import PublicationsContext from '../context/publications/publicationsContext';
import { Container, Heading } from '../components';

export const Search = () => {
  const navigate = useNavigate();

  const { publications, getAllPublications, filterPublications } =
    useContext(PublicationsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (publications.length === 0) {
      getAllPublications();
    }
  }, [publications, getAllPublications]);

  const options = {
    includeScore: true,
    keys: [
      { name: 'title', weight: 0.2 },
      { name: 'sourceTitle', weight: 0.2 },
      { name: 'abstract', weight: 0.2 },
      { name: 'lastName', weight: 0.2 },
      { name: 'firstName', weight: 0.2 },
    ],
    useExtendedSearch: true,
    threshold: 0.25,
  };

  const fuse = new Fuse(publications, options);

  const searchWithFuse = (query) => {
    if (query.length === 0) return [];

    const results = fuse.search(query).map((result) => result.item);

    return results;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const results = searchWithFuse(searchQuery);
    setSearchResults(results);

    navigate('/publications');
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      filterPublications(searchResults);
    }
  }, [searchResults, filterPublications]);

  return (
    <Container>
      <Heading>Search</Heading>
      <>
        <div className='flex justify-center'>
          <form
            className='mt-20 mb-3 w-full lg:w-2/3 flex'
            onSubmit={handleSubmit}
          >
            <input
              type='search'
              className='min-w-0 flex-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'
              id='searchQuery'
              placeholder='Enter search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='mt-4 sm:mt-0 sm:ml-3'>
              <button
                type='submit'
                className='block w-full rounded-md border border-transparent bg-rose-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10'
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
        {searchResults.length > 0 && (
          <div className='mt-1 w-full lg:w-2/3'>
            <h2 className='text-2xl font-bold mb-3'>Search Results</h2>
            <ul className='list-disc list-inside'>
              {searchResults.map((result) => (
                <li key={result.id}>
                  <p>{result.title ? result.title : result.sourceTitle}</p>
                  <p>{result.lastName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    </Container>
  );
};
