import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heading, Container, Spinner, SpinnerButton } from '../../components';
import AuthorsContext from '../../context/authors/authorsContext';

export const UpdateAuthor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [dataIsLoading, setDataIsLoading] = useState(false);

  const {
    isLoadingSingle,
    singleAuthor,
    singleAuthorError,
    getSingleAuthorById,
    updateSingleAuthor,
  } = useContext(AuthorsContext);

  const [editedAuthor, setEditedAuthor] = useState({
    authorId: '',
    firstName: '',
    lastName: '',
    joinYear: '',
    leftYear: '',
    googleScholarProfileUrl: '',
    researchGateUrl: '',
    scopusId: '',
    threeSixtyProfileUrl: '',
    woSId: '',
    orcidId: '',
  });

  useEffect(() => {
    if (id) {
      getSingleAuthorById(id);
    }
  }, [getSingleAuthorById, id]);

  useEffect(() => {
    setEditedAuthor(singleAuthor);
  }, [singleAuthor]);

  const handleTextChange = (e) => {
    setEditedAuthor({
      ...editedAuthor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDataIsLoading(true);
    await updateSingleAuthor(editedAuthor);
    setDataIsLoading(false);
    navigate(`/authors/${id}`);
  };

  const handleCancel = () => {
    navigate(`/authors/${id}`);
  };

  return (
    <Container>
      {isLoadingSingle && !singleAuthorError ? (
        <div className='text-center pt-10'>
          <Spinner />
        </div>
      ) : (
        <>
          <Heading>Update Author</Heading>
          <div className='container mx-auto px-4 py-4'>
            {editedAuthor && !singleAuthorError ? (
              <form
                className='space-y-8 divide-y divide-gray-200'
                onSubmit={handleSubmit}
              >
                <div className='space-y-8 divide-y divide-gray-200'>
                  <div className='pt-8 space-y-6 '>
                    <div className='pb-7 border-b border-gray-200'>
                      <h3 className='text-lg font-medium leading-6 text-gray-900'>
                        Author Information
                      </h3>
                      <p className='mt-1 text-sm text-gray-500'>
                        Use this form to update author data.
                      </p>
                    </div>
                    <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='first-name'
                          className='block text-sm font-medium text-gray-700'
                        >
                          First name
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='firstName'
                            id='first-name'
                            placeholder='ex. Yousef'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedAuthor.firstName}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='last-name'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Last name
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='lastName'
                            id='last-name'
                            placeholder='ex. Haji'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedAuthor.lastName}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 pt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='join-year'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Year author joined GU-Q
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='joinYear'
                            id='join-year'
                            placeholder='ex. 2009'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedAuthor.joinYear}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='left-year'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Year author left GU-Q (leave blank if still here)
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='leftYear'
                            id='left-year'
                            placeholder='ex. 2022'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedAuthor.leftYear}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 pt-4 sm:col-span-full'>
                      <label
                        htmlFor='scopus-id'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Scopus Profile URL
                      </label>
                      <div className='mt-1'>
                        <input
                          id='scopus-id'
                          name='scopusId'
                          type='text'
                          placeholder='ex. https://www.scopus.com/authid/detail.uri?authorId=304239618000'
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                          onChange={(e) => handleTextChange(e)}
                          value={editedAuthor.scopusId}
                        />
                      </div>
                    </div>

                    <div className='mt-6 pt-4 sm:col-span-full'>
                      <label
                        htmlFor='google-scholar-profile-url'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Google Scholar Profile URL
                      </label>
                      <div className='mt-1'>
                        <input
                          id='google-scholar-profile-url'
                          name='googleScholarProfileUrl'
                          type='text'
                          placeholder='ex. https://scholar.google.com/citations?hl=en&user=AqBe0vC5BAAJ'
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                          onChange={(e) => handleTextChange(e)}
                          value={editedAuthor.googleScholarProfileUrl}
                        />
                      </div>
                    </div>

                    <div className='mt-6 pt-4 sm:col-span-full'>
                      <label
                        htmlFor='ocrid-id'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Orcid ID Profile URL
                      </label>
                      <div className='mt-1'>
                        <input
                          id='ocrid-id'
                          name='orcidId'
                          type='text'
                          placeholder='ex. https://orcid.org/0000-0001-8639-1431'
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                          onChange={(e) => handleTextChange(e)}
                          value={editedAuthor.orcidId}
                        />
                      </div>
                    </div>

                    <div className='mt-6 pt-4 sm:col-span-full'>
                      <label
                        htmlFor='research-gate-url'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Research Gate Profile URL
                      </label>
                      <div className='mt-1'>
                        <input
                          id='research-gate-url'
                          name='researchGateUrl'
                          type='text'
                          placeholder='ex. https://www.researchgate.net/profile/Sharif-Elmusa-2'
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                          onChange={(e) => handleTextChange(e)}
                          value={editedAuthor.researchGateUrl}
                        />
                      </div>
                    </div>

                    <div className='mt-6 pt-4 sm:col-span-full'>
                      <label
                        htmlFor='three-sixty-profile-url'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Three Sixty Profile URL
                      </label>
                      <div className='mt-1'>
                        <input
                          id='three-sixty-profile-url'
                          name='threeSixtyProfileUrl'
                          type='text'
                          placeholder='ex. https://gufaculty360.georgetown.edu/s/contact/00336000014TX9yAAG/jose-asturias'
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                          onChange={(e) => handleTextChange(e)}
                          value={editedAuthor.threeSixtyProfileUrl}
                        />
                      </div>
                    </div>

                    <div className='mt-6 pt-4 sm:col-span-full'>
                      <label
                        htmlFor='web-of-science-profile-url'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Web of Science Profile URL
                      </label>
                      <div className='mt-1'>
                        <input
                          id='web-of-science-profile-url'
                          name='woSId'
                          type='text'
                          placeholder='ex. https://www-webofscience-com.proxy.library.georgetown.edu/wos/author/record/78822325'
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                          onChange={(e) => handleTextChange(e)}
                          value={editedAuthor.woSId}
                        />
                      </div>
                    </div>

                    <div className='mt-6 pt-4 sm:col-span-full'>
                      <label
                        htmlFor='academia-edu-profile-url'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Academia.edu Profile URL
                      </label>
                      <div className='mt-1'>
                        <input
                          id='academia-edu-profile-url'
                          name='academiaEdu'
                          type='text'
                          placeholder='ex. https://www1-georgetown.academia.edu/JohnQuincy'
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                          onChange={(e) => handleTextChange(e)}
                          value={editedAuthor.academiaEdu}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='pt-8'>
                  <div className='flex justify-start'>
                    <SpinnerButton
                      loading={dataIsLoading}
                      buttonText='Update'
                      buttonActionText='Saving...'
                    />
                    <button
                      type='button'
                      className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div>No Author</div>
            )}
          </div>
        </>
      )}
    </Container>
  );
};
