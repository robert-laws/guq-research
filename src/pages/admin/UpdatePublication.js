import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heading, Container, Spinner, SpinnerButton } from '../../components';
import PublicationsContext from '../../context/publications/publicationsContext';

export const UpdatePublication = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [dataIsLoading, setDataIsLoading] = useState(false);

  const {
    isLoadingSingle,
    singlePublication,
    singlePublicationError,
    getSinglePublicationById,
    updateSinglePublication,
  } = useContext(PublicationsContext);

  const [editedPublication, setEditedPublication] = useState({
    pubId: '',
    firstName: '',
    lastName: '',
    authors: [''],
    title: '',
    sourceTitle: '',
    language: '',
    documentType: '',
    year: '',
    volume: '',
    issue: '',
    pageStart: '',
    pageEnd: '',
    doi: '',
    link: '',
    abstract: '',
    bookReview: '',
    authorKeywords: [''],
    indexKeywords: [''],
    editors: [''],
    publisher: '',
    issn: '',
    isbn: [''],
    callNumber: '',
    publicationAffiliation: '',
    publishingGroup: '',
    fundingSource: '',
    fundingDetails: '',
  });

  useEffect(() => {
    if (id) {
      getSinglePublicationById(id);
    }
  }, [getSinglePublicationById, id]);

  useEffect(() => {
    setEditedPublication(singlePublication);
  }, [singlePublication]);

  const languages = [
    'Arabic',
    'English',
    'French',
    'German',
    'Italian',
    'Spanish',
    'Turkish',
    'Other',
  ];

  const documentTypes = [
    'Authored Book',
    'Book Chapter',
    'Conference Paper',
    'Editorial',
    'Edited Book',
    'Edited Journal Issue',
    'Journal Article',
    'Research Paper',
    'Other Document Type',
  ];

  const publishingGroupTypes = [
    'CIRS Staff',
    'Faculty',
    'Visiting Faculty/Scholar',
    'Postdoc',
    'Student',
    'Staff',
    'Other',
  ];

  const publicationAffiliationTypes = [
    'GU-Q',
    'GU-Main Campus',
    'Other Institutions',
    'No Affiliation',
  ];

  const fundingSourceTypes = ['GU-Q', 'QNRF', 'Other'];

  const handleTextChange = (e) => {
    setEditedPublication({
      ...editedPublication,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (e) => {
    setEditedPublication({
      ...editedPublication,
      [e.target.name]: e.target.value.split(';'),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDataIsLoading(true);
    await updateSinglePublication(editedPublication);
    setDataIsLoading(false);
    navigate(`/publications/${id}`);
  };

  const handleCancel = () => {
    navigate(`/publications/${id}`);
  };

  return (
    <Container>
      {isLoadingSingle && !singlePublicationError ? (
        <div className='text-center pt-10'>
          <Spinner />
        </div>
      ) : (
        <>
          <Heading>Publication</Heading>
          {editedPublication && !singlePublicationError ? (
            <div className='container mx-auto px-4 py-4'>
              <form
                className='space-y-8 divide-y divide-gray-200'
                onSubmit={handleSubmit}
              >
                <div className='space-y-8 divide-y divide-gray-200'>
                  <div className='pt-8 space-y-8 divide-y divide-gray-200'>
                    <div>
                      <h3 className='text-lg font-medium leading-6 text-gray-900'>
                        Publication Information
                      </h3>
                      <p className='mt-1 text-sm text-gray-500'>
                        Use this form to edit an existing publication in the
                        database.
                      </p>
                    </div>
                    <div className='mt-6 pt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
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
                            value={editedPublication.firstName}
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
                            value={editedPublication.lastName}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='publicationAffiliation'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Publication Affiliation
                        </label>
                        <div className='mt-1'>
                          <select
                            id='publicationAffiliation'
                            name='publicationAffiliation'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.publicationAffiliation}
                          >
                            <option key='Select' value=''>
                              Select...
                            </option>
                            {publicationAffiliationTypes.map(
                              (publicationAffiliationType) => (
                                <option
                                  key={publicationAffiliationType}
                                  value={publicationAffiliationType}
                                >
                                  {publicationAffiliationType}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='publishingGroup'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Publishing Group
                        </label>
                        <div className='mt-1'>
                          <select
                            id='publishingGroup'
                            name='publishingGroup'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.publishingGroup}
                          >
                            <option key='Select' value=''>
                              Select...
                            </option>
                            {publishingGroupTypes.map((publishingGroupType) => (
                              <option
                                key={publishingGroupType}
                                value={publishingGroupType}
                              >
                                {publishingGroupType}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='documentType'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Document Type
                        </label>
                        <div className='mt-1'>
                          <select
                            id='documentType'
                            name='documentType'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.documentType}
                          >
                            <option value=''>Select...</option>
                            {documentTypes.map((documentType) => (
                              <option key={documentType} value={documentType}>
                                {documentType}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='title'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Title
                        </label>
                        <div className='mt-1'>
                          <input
                            id='title'
                            name='title'
                            type='text'
                            placeholder='ex. The Impact of COVID-19 on the Global Economy'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.title}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='sourceTitle'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Source Title
                        </label>
                        <div className='mt-1'>
                          <input
                            id='sourceTitle'
                            name='sourceTitle'
                            type='text'
                            placeholder='ex. Journal of International Affairs'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.sourceTitle}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='authors'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Authors
                        </label>
                        <div className='mt-1'>
                          <input
                            id='authors'
                            name='authors'
                            type='text'
                            placeholder='ex. Habib, Mohamed; Smith, David'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleArrayChange(e)}
                            value={editedPublication.authors.join(';')}
                          />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          Separate authors (last name, first name) with a
                          semicolon.
                        </p>
                      </div>

                      <div className='sm:col-span-1'>
                        <label
                          htmlFor='year'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Year
                        </label>
                        <div className='mt-1'>
                          <input
                            id='year'
                            name='year'
                            type='text'
                            placeholder='ex. 2012'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.year}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-1'>
                        <label
                          htmlFor='volume'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Volume
                        </label>
                        <div className='mt-1'>
                          <input
                            id='volume'
                            name='volume'
                            type='text'
                            placeholder='ex. 4'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.volume}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-1'>
                        <label
                          htmlFor='issue'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Issue
                        </label>
                        <div className='mt-1'>
                          <input
                            id='issue'
                            name='issue'
                            type='text'
                            placeholder='ex. 2'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.issue}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-1'>
                        <label
                          htmlFor='pageStart'
                          className='block text-sm font-medium text-gray-700'
                        >
                          First Page
                        </label>
                        <div className='mt-1'>
                          <input
                            id='pageStart'
                            name='pageStart'
                            type='text'
                            placeholder='ex. 34'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.pageStart}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-1'>
                        <label
                          htmlFor='pageEnd'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Last Page
                        </label>
                        <div className='mt-1'>
                          <input
                            id='pageEnd'
                            name='pageEnd'
                            type='text'
                            placeholder='ex. 58'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.pageEnd}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='doi'
                          className='block text-sm font-medium text-gray-700'
                        >
                          DOI
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='doi'
                            id='doi'
                            placeholder='ex. doi:10.1038/nphys1170'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.doi}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='language'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Language
                        </label>
                        <div className='mt-1'>
                          <select
                            id='language'
                            name='language'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.language}
                          >
                            <option value=''>Select...</option>
                            {languages.map((language) => (
                              <option key={language} value={language}>
                                {language}
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          Original language of the publication.
                        </p>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='fundingSource'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Funding Source
                        </label>
                        <div className='mt-1'>
                          <select
                            id='fundingSource'
                            name='fundingSource'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.fundingSource}
                          >
                            <option value=''>Select...</option>
                            {fundingSourceTypes.map((fundingSource) => (
                              <option key={fundingSource} value={fundingSource}>
                                {fundingSource}
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          Funding Source of the publication.
                        </p>
                      </div>

                      <div className='sm:col-span-4'>
                        <label
                          htmlFor='fundingDetails'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Funding Details
                        </label>
                        <div className='mt-1'>
                          <input
                            id='fundingDetails'
                            name='fundingDetails'
                            type='text'
                            placeholder='ex. Funding through an external grant'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.fundingDetails}
                          />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          Details about the funding source.
                        </p>
                      </div>

                      <div className='sm:col-span-full'>
                        <label
                          htmlFor='abstract'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Abstract
                        </label>
                        <div className='mt-1'>
                          <textarea
                            id='abstract'
                            name='abstract'
                            rows={3}
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.abstract}
                            placeholder='Enter abstract text'
                          />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          Provide the abstract for the publication.
                        </p>
                      </div>

                      <div className='sm:col-span-full'>
                        <label
                          htmlFor='bookReview'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Book Review Text
                        </label>
                        <div className='mt-1'>
                          <textarea
                            id='bookReview'
                            name='bookReview'
                            rows={3}
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.bookReview}
                            placeholder='Enter book review text'
                          />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          Provide the book review text for the publication, if
                          available.
                        </p>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='authorKeywords'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Author Keywords
                        </label>
                        <div className='mt-1'>
                          <input
                            id='authorKeywords'
                            name='authorKeywords'
                            type='text'
                            placeholder='ex. Legitimacy; Pakistan Army; Terrorism'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleArrayChange(e)}
                            value={editedPublication.authorKeywords.join(';')}
                          />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          Separate author keywords with a semicolon.
                        </p>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='indexKeywords'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Index Keywords
                        </label>
                        <div className='mt-1'>
                          <input
                            id='indexKeywords'
                            name='indexKeywords'
                            type='text'
                            placeholder='ex. United States--US; Afghanistan; Kabul Afghanistan'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleArrayChange(e)}
                            value={editedPublication.indexKeywords.join(';')}
                          />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          Separate index keywords with a semicolon.
                        </p>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='link'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Permanent Link (if a DOI is not available)
                        </label>
                        <div className='mt-1'>
                          <input
                            type='text'
                            name='link'
                            id='link'
                            placeholder='ex. https://www.webofscience.com/wos/woscc/full-record/WOS:000668817900007'
                            autoComplete='address-level2'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.link}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='editors'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Editors
                        </label>
                        <div className='mt-1'>
                          <input
                            id='editors'
                            name='editors'
                            type='text'
                            placeholder='ex. Jamison, Daniel; Kharas, Homi; Nye, Joseph S.'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleArrayChange(e)}
                            value={editedPublication.editors.join(';')}
                          />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          Separate editors with a semicolon.
                        </p>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='publisher'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Publisher
                        </label>
                        <div className='mt-1'>
                          <input
                            id='publisher'
                            name='publisher'
                            type='text'
                            placeholder='ex. Oxford University Press'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.publisher}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='issn'
                          className='block text-sm font-medium text-gray-700'
                        >
                          ISSN
                        </label>
                        <div className='mt-1'>
                          <input
                            id='issn'
                            name='issn'
                            type='text'
                            placeholder='ex. 0022-1996'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.issn}
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='isbn'
                          className='block text-sm font-medium text-gray-700'
                        >
                          ISBN
                        </label>
                        <div className='mt-1'>
                          <input
                            id='isbn'
                            name='isbn'
                            type='text'
                            placeholder='ex. 978-0-19-067472-3'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleArrayChange(e)}
                            value={editedPublication.isbn.join(';')}
                          />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                          Separate ISBNs with a semicolon.
                        </p>
                      </div>

                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='callNumber'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Call Number
                        </label>
                        <div className='mt-1'>
                          <input
                            id='callNumber'
                            name='callNumber'
                            type='text'
                            placeholder='ex. DS 135.5 .A1 2008'
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                            onChange={(e) => handleTextChange(e)}
                            value={editedPublication.callNumber}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='pt-5'>
                  <div className='flex justify-start'>
                    <SpinnerButton
                      loading={dataIsLoading}
                      buttonText='Update'
                      buttonActionText='Saving...'
                    />
                    <button
                      type='button'
                      className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>No Publication</div>
          )}
        </>
      )}
    </Container>
  );
};
