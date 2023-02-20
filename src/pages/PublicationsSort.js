import { useContext, useEffect } from 'react';
import { Container, Heading, PublicationCard, Spinner } from '../components';
import { SortData } from '../utilities';
import PublicationsContext from '../context/publications/publicationsContext';
import interactionsContext from '../context/interactions/interactionsContext';

export const PublicationsSort = () => {
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

  const { sort, setSort } = useContext(interactionsContext);

  useEffect(() => {
    if (filteredPublications.length > 0 && sort) {
      const sortedResults = SortData({
        array: filteredPublications,
        field: sort.field,
      });

      filterPublications(sortedResults);
    }
  }, [filteredPublications, filterPublications, sort]);

  return (
    <Container>
      <Heading>Publications - Sort</Heading>

      {isLoading && !publicationsError ? (
        <div className='text-center pt-10'>
          <Spinner />
        </div>
      ) : filterPublications ? (
        <>
          <div className='py-6'>
            <div className='relative mx-auto flex flex-col max-w-8xl justify-center sm:px-2 lg:flex-row lg:px-2 xl:px-4'>
              <div className='flex-auto lg:relative lg:block lg:flex-none mb-6 lg:mb-0'>
                <div className='sticky top-[2rem] ml-5 lg:-ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-2 pl-0.5'>
                  <aside className='w-64 pr-2 xl:w-72 xl:pr-4'>
                    <div className='self-start sticky top-0 space-y-4 overflow-y-auto'>
                      <div className='flex justify-center'>
                        {/* Sort Controls */}
                        {sort && (
                          <div className='block w-full'>
                            <label
                              htmlFor='sortOptions'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Sort
                            </label>
                            <select
                              id='sortOptions'
                              name='sortOptions'
                              className='mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                              value={sort.field}
                              onChange={(e) => {
                                setSort({
                                  field: e.target.value,
                                  direction:
                                    e.target.value === 'year-newest'
                                      ? 'desc'
                                      : 'asc',
                                });
                              }}
                            >
                              <option value='author'>Author</option>
                              <option value='title'>Title</option>
                              <option value='year-newest'>Year - Newest</option>
                              <option value='year-oldest'>Year - Oldest</option>
                            </select>
                          </div>
                        )}
                      </div>
                      <div className='flex justify-center'>
                        {/* Keyword Search Form */}
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
