import { useContext, useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { Container, Heading, PublicationCard, Spinner } from '../components';
import PublicationsContext from '../context/publications/publicationsContext';
import interactionsContext from '../context/interactions/interactionsContext';

export const PublicationsSearch = () => {
  const {
    publications,
    filteredPublications,
    isLoading,
    publicationsError,
    getAllPublications,
    filterPublications,
  } = useContext(PublicationsContext);

  useEffect(() => {
    if (publications.length === 0) {
      getAllPublications();
    }
  }, [publications, getAllPublications]);

  const { query, setQuery } = useContext(interactionsContext);
  const [localQuery, setLocalQuery] = useState('');

  const options = {
    includeScore: true,
    keys: [
      { name: 'title', weight: 0.2 },
      { name: 'sourceTitle', weight: 0.2 },
      { name: 'abstract', weight: 0.25 },
      { name: 'lastName', weight: 0.2 },
      { name: 'firstName', weight: 0.2 },
    ],
    useExtendedSearch: true,
    threshold: 0.25,
  };

  const fuse = new Fuse(publications, options);

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset filters

    setQuery(localQuery);
  };

  useEffect(() => {
    const searchWithFuse = (searchQuery) => {
      if (searchQuery.length === 0) return [];
      const results = fuse.search(searchQuery).map((result) => result.item);
      return results;
    };

    if (query.length > 0 && publications.length > 0) {
      const results = searchWithFuse(query);
      filterPublications(results);
    } else if (query.length === 0 && publications.length > 0) {
      filterPublications(publications);
    }
  }, [query, publications, filterPublications]);

  return (
    <Container>
      <Heading>Publications - Search</Heading>
      <>
        <div className='flex justify-center my-2'>
          <form
            className='mb-2 w-full lg:w-full flex flex-row space-x-2'
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              className='min-w-0 flex-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'
              id='searchQuery'
              placeholder='Enter search'
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
            <div className='sm:mt-0'>
              <button
                type='submit'
                className='block w-full rounded-md border border-transparent bg-blue-500 px-2 py-2 text-base font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 sm:px-10'
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </>

      {isLoading && !publicationsError ? (
        <div className='text-center pt-10'>
          <Spinner />
        </div>
      ) : publications ? (
        <>
          <div className='py-6'>
            <div className='relative mx-auto flex flex-col max-w-8xl justify-center sm:px-2 lg:flex-row lg:px-2 xl:px-4'>
              <div className='flex-auto lg:relative lg:block lg:flex-none mb-6 lg:mb-0'>
                <div className='sticky top-[2rem] ml-5 lg:-ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-2 pl-0.5'>
                  <aside className='w-64 pr-2 xl:w-72 xl:pr-4'>
                    <div className='self-start sticky top-0 space-y-4 overflow-y-auto'>
                      <div className='flex justify-center'>
                        {/* Sort Controls */}
                      </div>
                      <div className='sm:mt-0'>{/* Reset Button */}</div>
                      <div className='flex flex-col pl-2'>
                        {/* Filter Checkbox Groups */}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
              <div className='min-w-0 max-w-3xl flex-auto px-4 py-2 lg:max-w-6xl lg:pr-0 lg:pl-8 xl:px-10'>
                <main className=''>
                  <div className='mb-2 -mt-2'>
                    <span className='font-bold text-lg'>
                      {filteredPublications.length} Results
                    </span>
                  </div>
                  <div className=' space-y-4'>
                    {/* Publications Result List */}
                    {filteredPublications.length > 0 ? (
                      filteredPublications.map((publication) => (
                        <PublicationCard
                          key={publication.pubId}
                          docId={publication.id}
                          authorId={publication.authorId}
                          title={
                            publication.title === ''
                              ? publication.sourceTitle
                              : publication.title
                          }
                          sourceTitle={publication.sourceTitle}
                          author={`${publication.firstName} ${publication.lastName}`}
                          year={publication.year}
                          language={publication.language}
                          documentType={publication.documentType}
                          doi={publication.doi}
                          link={publication.link}
                        />
                      ))
                    ) : (
                      <div>
                        <div className='whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                          No Publications
                        </div>
                      </div>
                    )}
                  </div>
                </main>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No Publications</div>
      )}
      {publicationsError && (
        <div className='font-bold'>{publicationsError}</div>
      )}
    </Container>
  );
};
