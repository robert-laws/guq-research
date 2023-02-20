import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner } from '../components';
import {
  AuthoredBook,
  EditedBook,
  JournalArticle,
  BookChapter,
  Editorial,
  ConferencePaper,
  ResearchPaper,
  Other,
} from './document-templates';
import PublicationsContext from '../context/publications/publicationsContext';

export const Publication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    singlePublication,
    isLoadingSingle,
    singlePublicationError,
    getSinglePublicationById,
    deleteSinglePublication,
  } = useContext(PublicationsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      getSinglePublicationById(id);
    }
  }, [getSinglePublicationById, id]);

  const handleEditClick = () => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDeleteClick = () => {
    const answer = window.confirm(
      'Are you sure you want to delete this publication?'
    );

    if (answer) {
      deleteSinglePublication(id);
      navigate('/publications');
    }
  };

  const showTemplate = (documentType) => {
    switch (singlePublication.documentType) {
      case 'Journal Article':
        return <JournalArticle {...singlePublication} />;
      case 'Authored Book':
        return <AuthoredBook {...singlePublication} />;
      case 'Edited Book':
        return <EditedBook {...singlePublication} />;
      case 'Book Chapter':
        return <BookChapter {...singlePublication} />;
      case 'Editorial':
        return <Editorial {...singlePublication} />;
      case 'Conference Paper':
        return <ConferencePaper {...singlePublication} />;
      case 'Research Paper':
        return <ResearchPaper {...singlePublication} />;
      default:
        return <Other {...singlePublication} />;
    }
  };

  return (
    <Container>
      {isLoadingSingle && !singlePublicationError ? (
        <div className='text-center pt-10'>
          <Spinner />
        </div>
      ) : singlePublication ? (
        <div className='px-4 py-5 sm:px-6'>
          <div className='flex justify-end mt-4'>
            <button
              type='button'
              className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              onClick={handleEditClick}
            >
              Edit this Publication
            </button>
            <button
              type='button'
              className='inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-4'
              onClick={handleDeleteClick}
            >
              Delete this Publication
            </button>
          </div>
          <div className='mt-4'>
            {showTemplate(singlePublication.documentType)}
          </div>
        </div>
      ) : (
        <div>No Publication</div>
      )}
    </Container>
  );
};
