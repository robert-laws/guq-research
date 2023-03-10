import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Heading, PublicationCard, Spinner } from '../components';
import { AddToList } from '../utilities';
import PublicationsContext from '../context/publications/publicationsContext';
import interactionsContext from '../context/interactions/interactionsContext';

export const PublicationsFilter = () => {
  const {
    publications,
    filteredPublications,
    isLoading,
    publicationsError,
    getAllPublications,
    filterPublications,
  } = useContext(PublicationsContext);

  const { filters, setFilters } = useContext(interactionsContext);

  // initializes the publications list
  useEffect(() => {
    if (publications.length === 0) {
      getAllPublications();
    }
  }, [publications, getAllPublications]);

  const filterListRef = useRef([]);

  const [filtersTouched, setFiltersTouched] = useState(false);

  // local state for filters to populate the checkbox inputs
  const [filterLists, setFilterLists] = useState({
    publishingGroup: [],
    year: [],
    lastName: [],
    documentType: [],
    language: [],
  });

  const [filterListsResultCount, setFilterListsResultCount] = useState({
    publishingGroup: [],
    year: [],
    lastName: [],
    documentType: [],
    language: [],
  });

  const [countList, setCountList] = useState([]);

  // sets the initial filter lists used for checkboxes when the publications list loads
  useEffect(() => {
    if (publications.length > 0) {
      setFilterLists({
        publishingGroup: AddToList(publications, 'publishingGroup'),
        year: AddToList(publications, 'year'),
        lastName: AddToList(publications, 'lastName'),
        documentType: AddToList(publications, 'documentType'),
        language: AddToList(publications, 'language'),
      });
    }
  }, [publications]);

  useEffect(() => {
    if (filteredPublications.length > 0) {
      setFilterListsResultCount({
        publishingGroup: AddToList(filteredPublications, 'publishingGroup'),
        year: AddToList(filteredPublications, 'year'),
        lastName: AddToList(filteredPublications, 'lastName'),
        documentType: AddToList(filteredPublications, 'documentType'),
        language: AddToList(filteredPublications, 'language'),
      });
    }
  }, [filteredPublications]);

  useEffect(() => {
    const allLists = [];
    let flatList = [];
    let finalList = [];

    for (const property in filterListsResultCount) {
      const list = filterListsResultCount[property];

      const myList = Object.keys(list).map((key) => {
        return [key, list[key]];
      });

      allLists.push([property, myList]);
    }

    allLists.forEach((list) => {
      flatList = [...flatList, ...list[1]];
    });

    flatList.forEach((item) => {
      let elementName = `${item[0].replace(/\s+/g, '-').toLowerCase()}-count`;
      let count = item[1];

      finalList.push([elementName, count]);
    });

    setCountList(finalList);
  }, [filterListsResultCount]);

  useEffect(() => {
    if (countList.length > 0 && filtersTouched) {
      const resultsCountList = document
        .getElementById('filter-checkboxes')
        .querySelectorAll('.result-count-label');

      if (resultsCountList.length > 0) {
        resultsCountList.forEach((item) => {
          let id = item.querySelector('span').getAttribute('id');
          if (countList.find((item) => item[0] === id)) {
            let count = countList.find((item) => item[0] === id)[1];
            item.querySelector('span').innerHTML = `(${count})`;
          } else {
            item.querySelector('span').innerHTML = '(0)';
          }
        });
      }
    }
  }, [countList, filtersTouched]);

  // updates the selected filters in InteractionsContext
  const updateFilters = (list, filter) => {
    setFiltersTouched(true);
    if (filters[list].includes(filter)) {
      const newFilters = filters[list].filter((item) => item !== filter);
      setFilters({
        ...filters,
        [list]: newFilters,
      });
    } else {
      setFilters({
        ...filters,
        [list]: [...filters[list], filter],
      });
    }
  };

  // used to build the checkbox inputs for each filter list on page load
  const getLists = (lists) => {
    const allLists = [];

    for (const property in lists) {
      const list = lists[property];

      const myList = Object.keys(list).map((key) => {
        return [key, list[key]];
      });

      if (property === 'year') {
        myList.sort((a, b) => b[0] - a[0]);
      }

      if (property === 'lastName') {
        myList.sort((a, b) => {
          const nameA = a[0].toUpperCase(); // ignore upper and lowercase
          const nameB = b[0].toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      }

      allLists.push([property, myList]);
    }

    return allLists;
  };

  useEffect(() => {
    const filtersArray = Object.entries(filters);

    const applyFilters = (filterArray) => {
      let filteredPublications = publications;

      for (let i = 0; i < filterArray.length; i++) {
        const list = filterArray[i][0];
        const filters = filterArray[i][1];

        if (filters.length > 0) {
          filteredPublications = filteredPublications.filter((publication) =>
            filters.includes(publication[list])
          );
        }
      }

      return filteredPublications;
    };

    if (filtersTouched) {
      filterPublications(applyFilters(filtersArray));
    }
  }, [filters]);

  const handleListToggle = (index) => {
    const list = filterListRef.current[index];
    list.classList.toggle('filter-list');
    if (list.querySelectorAll('p')[1].innerHTML === 'Show More') {
      list.querySelectorAll('p')[1].innerHTML = 'Show Less';
    } else {
      list.querySelectorAll('p')[1].innerHTML = 'Show More';
    }
  };

  const handleResetClick = () => {
    setFilters({
      publishingGroup: [],
      year: [],
      lastName: [],
      documentType: [],
      language: [],
    });
    filterPublications(publications);

    if (filterListRef.current.length > 0) {
      filterListRef.current.forEach((list) => {
        if (list) {
          list.querySelectorAll('input').forEach((input) => {
            input.checked = false;
          });
        }
      });
    }

    // setCurrentPage(1);
    // saveSearchQuery('');
    // setSearchQueryPublications('');
  };

  return (
    <Container>
      <Heading>Publications - Filter</Heading>

      {isLoading && !publicationsError ? (
        <div className='text-center pt-10'>
          <Spinner />
        </div>
      ) : filteredPublications ? (
        <>
          <div className='py-6'>
            <div className='relative mx-auto flex flex-col max-w-8xl justify-center sm:px-2 lg:flex-row lg:px-2 xl:px-4'>
              <div className='flex-auto lg:relative lg:block lg:flex-none mb-6 lg:mb-0'>
                <div className='sticky top-[2rem] ml-5 lg:-ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-2 pl-0.5'>
                  <aside className='w-64 pr-2 xl:w-72 xl:pr-4'>
                    <div className='self-start sticky top-0 overflow-y-auto'>
                      <div className='flex justify-center'>
                        {/* Sort Controls */}
                      </div>
                      <div className='flex justify-center'>
                        {/* Keyword Search Form */}
                      </div>
                      <div className='sm:mt-0 mt-2 mb-4'>
                        <button
                          onClick={handleResetClick}
                          type='button'
                          className='block w-full rounded-md border border-transparent bg-rose-500 px-2 py-2 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-0 sm:px-10'
                        >
                          Reset All Filters
                        </button>
                      </div>
                      <div
                        id='filter-checkboxes'
                        className='flex flex-col pl-2'
                      >
                        {/* Filter Checkbox Groups */}
                        {getLists(filterLists).map((list, index) => {
                          return (
                            <div
                              className='pr-4 pb-4 filter-list'
                              ref={(ref) =>
                                (filterListRef.current[index] = ref)
                              }
                              key={index}
                            >
                              <p className='mb-2'>
                                {list[0] === 'documentType'
                                  ? 'Document Type'
                                  : list[0] === 'publishingGroup'
                                  ? 'Author Status'
                                  : list[0] === 'lastName'
                                  ? 'Author Name'
                                  : list[0].charAt(0).toUpperCase() +
                                    list[0].slice(1)}
                              </p>
                              {list[1].map((option, i) => {
                                return (
                                  <div
                                    className='flex items-start filter-item'
                                    key={i}
                                  >
                                    <div className='flex h-5 items-center mb-1'>
                                      <input
                                        type='checkbox'
                                        className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
                                        id={option[0]}
                                        name={option[0]}
                                        value={option[0]}
                                        onChange={(e) => {
                                          updateFilters(
                                            list[0],
                                            e.target.value
                                          );
                                        }}
                                        checked={
                                          filters &&
                                          filters[list[0]].includes(option[0])
                                        }
                                      ></input>
                                    </div>
                                    <div className='ml-1 text-sm mb-1'>
                                      <label
                                        htmlFor={option[0]}
                                        className='result-count-label ml-1.5 font-medium text-gray-700'
                                      >
                                        {option[0]}{' '}
                                        <span
                                          id={`${option[0]
                                            .replace(/\s+/g, '-')
                                            .toLowerCase()}-count`}
                                          name={`${option[0]
                                            .replace(/\s+/g, '-')
                                            .toLowerCase()}-count`}
                                          className='text-gray-500 font-normal'
                                        >
                                          ({option[1]})
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                );
                              })}
                              <p
                                onClick={() => handleListToggle(index)}
                                className='text-blue-500 hover:underline hover:cursor-pointer filter-list-show'
                              >
                                {list[1].length > 5 ? 'Show More' : ''}
                              </p>
                            </div>
                          );
                        })}
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
