import { useContext, useEffect } from 'react';
import AuthorsContext from '../context/authors/authorsContext';
import { Container, Heading, Spinner, AuthorCard } from '../components';

export const Authors = () => {
  const {
    authors,
    isLoading,
    authorsError,
    getAllAuthors,
    resetSingleAuthorLoading,
    resetSingleAuthorPublicationsLoading,
  } = useContext(AuthorsContext);

  useEffect(() => {
    if (authors.length === 0) {
      getAllAuthors();
    }
  }, [authors, getAllAuthors]);

  useEffect(() => {
    resetSingleAuthorLoading();
  }, [resetSingleAuthorLoading]);

  useEffect(() => {
    resetSingleAuthorPublicationsLoading();
  }, [resetSingleAuthorPublicationsLoading]);

  return (
    <Container>
      <Heading>
        Authors{' '}
        <span className='font-normal text-base ml-3'>(GUQ tenure years)</span>
      </Heading>
      {isLoading && !authorsError ? (
        <div className='text-center pt-10'>
          <Spinner />
        </div>
      ) : authors ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6'>
          {authors.map((author) => (
            <AuthorCard key={author.id} {...author} />
          ))}
        </div>
      ) : (
        <div>No Authors</div>
      )}
      {authorsError && <div>{authorsError}</div>}
    </Container>
  );
};
