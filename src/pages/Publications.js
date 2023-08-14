import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Container, Heading, PublicationCard, Spinner } from '../components';
import { AddToList, SortData } from '../utilities';
import ReactPaginate from 'react-paginate';
import PublicationsContext from '../context/publications/publicationsContext';
import AuthorsContext from '../context/authors/authorsContext';
import interactionsContext from '../context/interactions/interactionsContext';
import AuthContext from '../context/auth/authContext';

export const Publications = () => {
  const { authenticatedUser } = useContext(AuthContext);

  const {
    publications,
    filteredPublications,
    isLoading,
    publicationsError,
    getAllPublications,
    filterPublications,
    resetSinglePublicationLoading,
  } = useContext(PublicationsContext);

  const { resetSingleAuthorLoading, resetSingleAuthorPublicationsLoading } =
    useContext(AuthorsContext);

  const {
    query,
    setQuery,
    searchResults,
    setSearchResults,
    sort,
    filters,
    filtersTouched,
    setSort,
    setFilters,
    setFiltersTouched,
  } = useContext(interactionsContext);

  const [localQuery, setLocalQuery] = useState(query || '');

  const [currentPage, setCurrentPage] = useState(1);
  const [publicationsPerPage, setPublicationsPerPage] = useState(10);
  const [buttonFilterSpinner, setButtonFilterSpinner] = useState(false);
  const [selectedFiltersArray, setSelectedFiltersArray] = useState([]);

  // initializes the publications list
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
      { name: 'abstract', weight: 0.25 },
      { name: 'lastName', weight: 0.2 },
      { name: 'firstName', weight: 0.2 },
    ],
    useExtendedSearch: true,
    threshold: 0.25,
  };

  const fuse = new Fuse(publications, options);

  useEffect(() => {
    const searchWithFuse = (searchQuery) => {
      if (searchQuery.length === 0) return [];
      const results = fuse.search(searchQuery).map((result) => result.item);
      return results;
    };
    if (query.length > 0 && publications.length > 0) {
      setFilters({
        publicationAffiliation: [],
        publishingGroup: [],
        year: [],
        fullName: [],
        documentType: [],
        language: [],
        fundingSource: [],
      });
      const results = searchWithFuse(query);
      setFiltersTouched(true);
      filterPublications(results);
      setSearchResults(results);
    } else if (query.length === 0 && publications.length > 0) {
      filterPublications(publications);
      setSearchResults([]);
    }
  }, [query, publications, filterPublications]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(localQuery);
  };

  const filterListRef = useRef([]);

  // local state for filters to populate the checkbox inputs
  const [filterLists, setFilterLists] = useState({
    publicationAffiliation: [],
    publishingGroup: [],
    year: [],
    fullName: [],
    documentType: [],
    language: [],
    fundingSource: [],
  });

  const [filterListsResultCount, setFilterListsResultCount] = useState({
    publicationAffiliation: [],
    publishingGroup: [],
    year: [],
    fullName: [],
    documentType: [],
    language: [],
    fundingSource: [],
  });

  const [countList, setCountList] = useState([]);

  // sets the initial filter lists used for checkboxes when the publications list loads
  useEffect(() => {
    if (publications.length > 0) {
      setFilterLists({
        publicationAffiliation: AddToList(
          publications,
          'publicationAffiliation'
        ),
        publishingGroup: AddToList(publications, 'publishingGroup'),
        year: AddToList(publications, 'year'),
        fullName: AddToList(publications, 'fullName'),
        documentType: AddToList(publications, 'documentType'),
        language: AddToList(publications, 'language'),
        fundingSource: AddToList(publications, 'fundingSource'),
      });
    }
  }, [publications]);

  useEffect(() => {
    if (filteredPublications.length > 0) {
      setFilterListsResultCount({
        publicationAffiliation: AddToList(
          filteredPublications,
          'publicationAffiliation'
        ),
        publishingGroup: AddToList(filteredPublications, 'publishingGroup'),
        year: AddToList(filteredPublications, 'year'),
        fullName: AddToList(filteredPublications, 'fullName'),
        documentType: AddToList(filteredPublications, 'documentType'),
        language: AddToList(filteredPublications, 'language'),
        fundingSource: AddToList(filteredPublications, 'fundingSource'),
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
            item.parentElement.parentElement.style.display = 'flex';
          } else {
            item.querySelector('span').innerHTML = '(0)';
            item.parentElement.parentElement.style.display = 'none';
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

  // const updateFiltersFromBubble = (filterItem) => {
  //   setFiltersTouched(true);
  //   const keys = Object.keys(filters);

  //   keys.forEach((key) => {
  //     if (filters[key].includes(filterItem)) {
  //       const newFilters = filters[key].filter((item) => item !== filterItem);

  //       setFilters({
  //         ...filters,
  //         [key]: newFilters,
  //       });
  //     }
  //   });

  //   setSelectedFiltersArray(
  //     selectedFiltersArray.filter((item) => item !== filterItem)
  //   );
  // };

  // used to build the checkbox inputs for each filter list on page load
  const getLists = (lists) => {
    const allLists = [];

    for (const property in lists) {
      const list = lists[property];

      const myList = Object.keys(list).map((key) => {
        return [key, list[key]];
      });

      if (
        property === 'documentType' ||
        property === 'publishingGroup' ||
        property === 'publicationAffiliation' ||
        property === 'language' ||
        property === 'fundingSource'
      ) {
        myList.sort((a, b) => b[1] - a[1]);
      }

      if (property === 'year') {
        myList.sort((a, b) => b[0] - a[0]);
      }

      if (property === 'fullName') {
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

  // code used to apply filters to the publications list when a checkbox is clicked
  useEffect(() => {
    // const filtersArray = Object.entries(filters);
    // const applyFilters = (filterArray) => {
    //   let filteredPublications = [];
    //   searchResults.length > 0
    //     ? (filteredPublications = searchResults)
    //     : (filteredPublications = publications);
    //   for (let i = 0; i < filterArray.length; i++) {
    //     const list = filterArray[i][0];
    //     const filters = filterArray[i][1];
    //     if (filters.length > 0) {
    //       filteredPublications = filteredPublications.filter((publication) =>
    //         filters.includes(publication[list])
    //       );
    //     }
    //   }
    //   return filteredPublications;
    // };
    // if (filtersTouched) {
    //   filterPublications(applyFilters(filtersArray));
    // }
    // const allFiltersList = getAllSelectedFiltersArray();
    // setSelectedFiltersArray(allFiltersList);
  }, [filters]);

  const getAllSelectedFiltersArray = () => {
    const filtersArray = Object.entries(filters);
    let filteredSelections = [];

    filtersArray.forEach((item) => {
      if (item[1].length > 0) {
        if (item[1].length === 1) {
          filteredSelections.push(item[1]);
        } else {
          item[1].forEach((filter) => {
            filteredSelections.push(filter);
          });
        }
      }
    });

    return filteredSelections;
  };

  // const handleListToggle = (index) => {
  //   const list = filterListRef.current[index];
  //   list.classList.toggle('filter-list');
  //   if (list.querySelectorAll('p')[1].innerHTML === 'Show More') {
  //     list.querySelectorAll('p')[1].innerHTML = 'Show Less';
  //   } else {
  //     list.querySelectorAll('p')[1].innerHTML = 'Show More';
  //   }
  // };

  useEffect(() => {
    if (filteredPublications.length > 0 && sort) {
      const sortedResults = SortData({
        array: filteredPublications,
        field: sort.field,
      });

      filterPublications(sortedResults);
    }
  }, [filteredPublications, filterPublications, sort]);

  const handleResetClick = () => {
    setFilters({
      publicationAffiliation: [],
      publishingGroup: [],
      year: [],
      fullName: [],
      documentType: [],
      language: [],
      fundingSource: [],
    });

    filterPublications(publications);

    setCurrentPage(1);

    setLocalQuery('');
    setQuery('');
    setSearchResults([]);
    setSelectedFiltersArray([]);
  };

  // pagination
  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = filteredPublications.slice(
    indexOfFirstPublication,
    indexOfLastPublication
  );

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // filter buttons
  const handleFilterClick = () => {
    // hide/show spinner
    setButtonFilterSpinner(true);

    // moved filtering functionality from useEffect after filters to a button click
    const filtersArray = Object.entries(filters);

    const applyFilters = (filterArray) => {
      let filteredPublications = [];
      searchResults.length > 0
        ? (filteredPublications = searchResults)
        : (filteredPublications = publications);

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

    const allFiltersList = getAllSelectedFiltersArray();
    setSelectedFiltersArray(allFiltersList);

    // hide/show spinner
    setButtonFilterSpinner(false);
  };

  useEffect(() => {
    resetSinglePublicationLoading();
  }, [resetSinglePublicationLoading]);

  useEffect(() => {
    resetSingleAuthorLoading();
  }, [resetSingleAuthorLoading]);

  useEffect(() => {
    resetSingleAuthorPublicationsLoading();
  }, [resetSingleAuthorPublicationsLoading]);

  return (
    <Container>
      <div className='flex justify-between'>
        <Heading>Publications</Heading>
        {authenticatedUser && (
          <Link
            to='/admin/publication/new'
            className='block w-auto rounded-md border border-transparent bg-cyan-500 px-1 py-1 text-base font-medium text-white shadow hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 sm:px-4'
          >
            Add New Publication
          </Link>
        )}
      </div>

      {isLoading && !publicationsError ? (
        <div className='text-center pt-10'>
          <Spinner />
        </div>
      ) : filteredPublications ? (
        <>
          <div className='flex py-5 justify-center my-2 bg-gray-100 rounded-lg'>
            <form
              className='w-full lg:w-2/3 flex flex-row items-center space-x-2 px-4'
              onSubmit={handleSubmit}
            >
              <div className='flex flex-col min-w-0 flex-1 w-full px-3 py-1.5 mb-1'>
                <label
                  htmlFor='searchQuery'
                  className='block text-sm font-medium text-gray-700'
                >
                  Enter your search terms
                </label>
                <input
                  type='text'
                  className='form-control min-w-0 flex-1 w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'
                  id='searchQuery'
                  name='searchQuery'
                  placeholder='ex. Qatar, "Gulf Cooperation Council", Al-Jazeera'
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                />
              </div>
              <div className='h-6'>
                <button
                  type='submit'
                  className='block w-full rounded-md border border-transparent bg-blue-500 px-2 py-2 text-base font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 sm:px-10'
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className='flex py-1 my-1 mx-28 rounded-lg'>
            {selectedFiltersArray.length > 0 && (
              <span className='font-bold text-gray-900 px-3 pt-0'>
                Applied Filters:
              </span>
            )}
            {selectedFiltersArray.length > 0 &&
              selectedFiltersArray.map((filter) => {
                // console.log(filter);
                return (
                  <div key={filter} className='flex justify-center'>
                    <div className='inline-flex items-center px-3.5 py-0.5 rounded-full text-md font-medium bg-blue-100 text-gray-800 mr-1 mb-2'>
                      {filter}
                      {/* <svg // X icon
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 ml-1'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        // onClick={() => updateFiltersFromBubble(filter)}
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 12.586L5.707 16.88a1 1 0 11-1.414-1.414L8.586 11 4.293 6.707a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414L11.414 11l4.293 4.293a1 1 0 11-1.414 1.414L10 12.586z'
                          clipRule='evenodd'
                        />
                      </svg> */}
                    </div>
                  </div>
                );
              })}
          </div>

          <div className='py-6'>
            <div className='relative mx-auto flex flex-col max-w-8xl justify-center sm:px-2 lg:flex-row lg:px-2 xl:px-4'>
              <div className='flex-auto lg:relative lg:block lg:flex-none mb-6 lg:mb-0'>
                <div className='sticky top-[2rem] ml-5 lg:-ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-2 pl-0.5'>
                  <aside className='w-64 pr-1 xl:w-72 xl:pr-3'>
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
                          Clear Search and Filters
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
                              // className='pr-4 pb-4 filter-list'
                              className='pr-4 pb-4'
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
                                  : list[0] === 'fullName'
                                  ? 'Author Name'
                                  : list[0] === 'fundingSource'
                                  ? 'Funding Source'
                                  : list[0] === 'publicationAffiliation'
                                  ? 'Publication Affiliation'
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
                              {/* <p
                                onClick={() => handleListToggle(index)}
                                className='text-blue-500 hover:underline hover:cursor-pointer filter-list-show'
                              >
                                {list[1].length > 5 ? 'Show More' : ''}
                              </p> */}
                              {/* Filter Button for Each Group */}
                              <div className='flex flex-row justify-end mt-1'>
                                {/* <button
                                  onClick={() => handleFilterClick()}
                                  type='button'
                                  className='rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                                >
                                  Apply Filter
                                </button> */}
                                {/* <div className='p-1'>&nbsp;</div> */}
                                <button
                                  type='button'
                                  onClick={() => handleFilterClick()}
                                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-1.5 text-center ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'
                                  // style={
                                  //   buttonFilter
                                  //     ? { display: 'block' }
                                  //     : { display: 'none' }
                                  // }
                                >
                                  <div
                                    style={
                                      buttonFilterSpinner
                                        ? { display: 'block' }
                                        : { display: 'none' }
                                    }
                                  >
                                    <svg
                                      aria-hidden='true'
                                      role='status'
                                      className='inline w-4 h-4 mr-3 text-white animate-spin'
                                      viewBox='0 0 100 101'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                        fill='#E5E7EB'
                                      />
                                      <path
                                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                        fill='currentColor'
                                      />
                                    </svg>
                                  </div>
                                  Apply Filter
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
              <div className='min-w-0 max-w-3xl flex-auto pl-4 py-2 lg:max-w-6xl lg:pr-0 lg:pl-8 xl:pl-10'>
                <main className=''>
                  <div className='mb-2 -mt-2 flex justify-between'>
                    <div className='font-bold text-lg'>
                      {filteredPublications.length} Results
                    </div>
                    <div className='flex items-center'>
                      <div>
                        {/* Sort Controls */}
                        {sort && (
                          <div className='flex items-center'>
                            <label
                              htmlFor='sortOptions'
                              className='text-sm font-medium text-gray-700 mr-2'
                            >
                              Sort by
                            </label>
                            <select
                              id='sortOptions'
                              name='sortOptions'
                              className='rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
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
                              <option value='year-newest'>Year - Newest</option>
                              <option value='year-oldest'>Year - Oldest</option>
                              <option value='author'>Author</option>
                              <option value='title'>Title</option>
                            </select>
                          </div>
                        )}
                      </div>
                      <div>
                        <select
                          id='currentPageSize'
                          name='currentPageSize'
                          className='w-full lg:w-auto ml-0 lg:ml-3 inline rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                          value={publicationsPerPage}
                          onChange={(e) => {
                            setPublicationsPerPage(Number(e.target.value));
                          }}
                        >
                          {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                              Show {pageSize}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className=' space-y-4'>
                    {/* Publications Result List */}
                    {filteredPublications.length > 0 ? (
                      currentPublications.map((publication) => (
                        <PublicationCard
                          key={publication.id}
                          docId={publication.id}
                          authorId={publication.authorId}
                          title={
                            publication.title === ''
                              ? publication.sourceTitle
                              : publication.title
                          }
                          sourceTitle={publication.sourceTitle}
                          author={`${publication.lastName}, ${publication.firstName}`}
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
          <div>
            <ReactPaginate
              onPageChange={paginate}
              pageCount={Math.ceil(
                filteredPublications.length / publicationsPerPage
              )}
              previousLabel={'Prev'}
              nextLabel={'Next'}
              containerClassName={'pagination'}
              pageLinkClassName={'page-number'}
              previousLinkClassName={'page-number'}
              nextLinkClassName={'page-number'}
              activeLinkClassName={'active'}
              disabledClassName={'disabled'}
            />
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
