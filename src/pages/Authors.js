import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthorsContext from '../context/authors/authorsContext';
import { Container, Heading, Spinner, AuthorCard } from '../components';
import AuthContext from '../context/auth/authContext';

export const Authors = () => {
  const { authenticatedUser } = useContext(AuthContext);

  const {
    authors,
    isLoading,
    authorsError,
    getAllAuthors,
    resetSingleAuthorLoading,
    resetSingleAuthorPublicationsLoading,
  } = useContext(AuthorsContext);

  useEffect(() => {
    if (authors.length <= 1) {
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
      <div className='flex justify-between'>
        <Heading>
          Authors{' '}
          <span className='font-normal text-base ml-3'>(GUQ tenure years)</span>
        </Heading>
        {authenticatedUser && (
          <Link
            to='/admin/author/new'
            className='block w-auto rounded-md border border-transparent bg-cyan-500 px-1 py-1 text-base font-medium text-white shadow hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 sm:px-4'
          >
            Add New Author
          </Link>
        )}
      </div>
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
