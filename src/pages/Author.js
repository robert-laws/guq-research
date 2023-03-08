import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Heading,
  Container,
  Spinner,
  PublicationCard,
  ResearchIcon,
} from '../components';
import ScopusIcon from '../images/scopus.png';
import WebOfScienceIcon from '../images/web-of-science.png';
import GoogleScholarIcon from '../images/google-scholar.png';
import GU360Icon from '../images/gu-360.png';
import ResearchGateIcon from '../images/research-gate.png';
import OrcidIcon from '../images/orcid.png';
import AuthorsContext from '../context/authors/authorsContext';

export const Author = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    singleAuthor,
    authorPublications,
    isLoadingSingle,
    isLoadingAuthorPublications,
    singleAuthorError,
    authorPublicationsError,
    getSingleAuthorById,
    getPublicationsByAuthorId,
  } = useContext(AuthorsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      getSingleAuthorById(id);
    }
  }, [getSingleAuthorById, id]);

  useEffect(() => {
    if (singleAuthor) {
      getPublicationsByAuthorId(singleAuthor.id);
    }
  }, [getPublicationsByAuthorId, singleAuthor]);

  const handleEditClick = () => {
    navigate(`/admin/author/edit/${id}`);
  };

  const handleDeleteClick = () => {
    const answer = window.confirm(
      'Are you sure you want to delete this author and their publications?'
    );

    if (answer) {
      // deleteSingleAuthor(id);
      navigate('/authors');
    }
  };

  return (
    <Container>
      {isLoadingSingle && !singleAuthorError ? (
        <div className='text-center pt-10'>
          <Spinner />
        </div>
      ) : singleAuthor ? (
        <div className='px-4 py-5 sm:px-6'>
          <div className='flex justify-end mt-4'>
            <button
              type='button'
              className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              onClick={handleEditClick}
            >
              Edit this Author
            </button>
            <button
              type='button'
              className='inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-4'
              onClick={handleDeleteClick}
            >
              Delete this Author
            </button>
          </div>
          <div className='mb-4 flex flex-col'>
            <Heading>
              {`${singleAuthor.firstName} ${singleAuthor.lastName}`}
              <span className='ml-2 mr-1'>
                ({singleAuthor.joinYear} - {singleAuthor.leftYear})
              </span>
              {singleAuthor.scopusId && (
                <ResearchIcon
                  iconImage={ScopusIcon}
                  link={singleAuthor.scopusId}
                  altText='Scopus'
                />
              )}
              {singleAuthor.woSId && (
                <ResearchIcon
                  iconImage={WebOfScienceIcon}
                  link={singleAuthor.woSId}
                  altText='Web of Science'
                />
              )}
              {singleAuthor.googleScholarProfileUrl && (
                <ResearchIcon
                  iconImage={GoogleScholarIcon}
                  link={singleAuthor.googleScholarProfileUrl}
                  altText='Google Scholar'
                />
              )}
              {singleAuthor.threeSixtyProfileUrl && (
                <ResearchIcon
                  iconImage={GU360Icon}
                  link={singleAuthor.threeSixtyProfileUrl}
                  altText='GU 360'
                />
              )}
              {singleAuthor.orcidId && (
                <ResearchIcon
                  iconImage={OrcidIcon}
                  link={singleAuthor.orcidId}
                  altText='Orcid'
                />
              )}
              {singleAuthor.researchGateUrl && (
                <ResearchIcon
                  iconImage={ResearchGateIcon}
                  link={singleAuthor.researchGateUrl}
                  altText='Research Gate'
                />
              )}
            </Heading>
            <div className='flex justify-end mt-4'>{/* buttons */}</div>
          </div>

          <div className='mb-4 mt-4 pt-2 border-t border-gray-200 flex flex-col'>
            {isLoadingAuthorPublications &&
            !authorPublicationsError &&
            authorPublications.length === 0 ? (
              <div className='text-center pt-10'>
                <Spinner />
              </div>
            ) : authorPublications ? (
              <>
                <div className='mt-1 mb-4'>
                  <span className='font-bold text-lg'>
                    {authorPublications.length} publications
                  </span>
                </div>
                <section className='md:col-span-12 lg:col-span-10 xl:col-span-9'>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-1'>
                    {authorPublications.map((publication) => (
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
                        language={
                          publication.language === ''
                            ? 'Not Specified'
                            : publication.language
                        }
                        documentType={publication.documentType}
                        doi={publication.doi}
                        link={publication.link}
                      />
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <div>No Publications</div>
            )}
          </div>
        </div>
      ) : (
        <div>No Author</div>
      )}
    </Container>
  );
};
