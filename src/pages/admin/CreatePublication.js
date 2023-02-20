import { useState, useContext } from 'react';
import { Heading, Container } from '../../components';
import PublicationsContext from '../../context/publications/publicationsContext';
import { useNavigate } from 'react-router-dom';

export const CreatePublication = () => {
  const navigate = useNavigate();

  const { createSinglePublication } = useContext(PublicationsContext);

  const [newPublication, setNewPublication] = useState({
    pubId: '',
    firstName: '',
    lastName: '',
    authorScopusId: '',
    authorResearcherId: '',
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
    pageCount: '',
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
    eid: '',
    callNumber: '',
    sustainableDevelopmentGoals: [''],
    publicationAffiliation: '',
    cirsSponsored: '',
    publishingGroup: '',
    fullText: '',
  });

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
    'Journal Article',
    'Research Paper',
    'Other',
  ];

  const handleTextChange = (e) => {
    setNewPublication({
      ...newPublication,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (e) => {
    setNewPublication({
      ...newPublication,
      [e.target.name]: e.target.value.split(';'),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docId = await createSinglePublication(newPublication);

    navigate(`/publications/${docId}`);
    // navigate('/publications');
  };

  const handleCancel = () => {
    navigate('/publications');
  };

  return (
    <Container>
      <Heading>Add New Publication</Heading>
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
                <p className='mt-1 text-sm text-gray-500'>...</p>
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
                      value={newPublication.firstName}
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
                      value={newPublication.lastName}
                    />
                  </div>
                </div>

                <div className='sm:col-span-full'>
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
                      value={newPublication.authors.join(';')}
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    Separate authors (last name, first name) with a semicolon.
                  </p>
                </div>

                <div className='sm:col-span-full'>
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
                      value={newPublication.title}
                    />
                  </div>
                </div>

                <div className='sm:col-span-full'>
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
                      value={newPublication.sourceTitle}
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
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
                      value={newPublication.language}
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

                <div className='sm:col-span-3'>
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
                      value={newPublication.documentType}
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

                {/* <div className='sm:col-span-1'>
                <label
                  htmlFor='year'
                  className='block text-sm font-medium text-gray-700'
                >
                  Publication Year
                </label>
                <div className='mt-1'>
                  <select
                    id='year'
                    name='year'
                    autoComplete='year-number'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  >
                    {Array.from({ length: 50 }, (_, i) => (
                      <option key={i} value={i + 1990}>
                        {i + 1990}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}

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
                      value={newPublication.year}
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
                      value={newPublication.volume}
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
                      value={newPublication.issue}
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
                      value={newPublication.pageStart}
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
                      value={newPublication.pageEnd}
                    />
                  </div>
                </div>

                <div className='sm:col-span-1'>
                  <label
                    htmlFor='pageCount'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Page Count
                  </label>
                  <div className='mt-1'>
                    <input
                      id='pageCount'
                      name='pageCount'
                      type='text'
                      placeholder='ex. 24'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                      onChange={(e) => handleTextChange(e)}
                      value={newPublication.pageCount}
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
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
                      value={newPublication.doi}
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='link'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Permanent Link
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
                      value={newPublication.link}
                    />
                  </div>
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
                      value={newPublication.abstract}
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
                      value={newPublication.bookReview}
                      placeholder='Enter book review text'
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    Provide the book review text for the publication, if
                    available.
                  </p>
                </div>

                <div className='sm:col-span-full'>
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
                      value={newPublication.authorKeywords.join(';')}
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    Separate author keywords with a semicolon.
                  </p>
                </div>

                <div className='sm:col-span-full'>
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
                      value={newPublication.indexKeywords.join(';')}
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    Separate index keywords with a semicolon.
                  </p>
                </div>

                <div className='sm:col-span-full'>
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
                      value={newPublication.editors.join(';')}
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
                      value={newPublication.publisher}
                    />
                  </div>
                </div>

                <div className='sm:col-span-1'>
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
                      value={newPublication.issn}
                    />
                  </div>
                </div>

                <div className='sm:col-span-1'>
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
                      value={newPublication.isbn.join(';')}
                    />
                  </div>
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
                      value={newPublication.callNumber}
                    />
                  </div>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='authorScopusId'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Author Scopus ID
                  </label>
                  <div className='mt-1'>
                    <input
                      id='authorScopusId'
                      name='authorScopusId'
                      type='text'
                      placeholder='ex. 7004210000'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                      onChange={(e) => handleTextChange(e)}
                      value={newPublication.authorScopusId}
                    />
                  </div>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='authorResearcherId'
                    className='block text-sm font-medium text-gray-700'
                  >
                    WoS ResearcherID
                  </label>
                  <div className='mt-1'>
                    <input
                      id='authorResearcherId'
                      name='authorResearcherId'
                      type='text'
                      placeholder='ex. 0-7315-2104'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                      onChange={(e) => handleTextChange(e)}
                      value={newPublication.authorResearcherId}
                    />
                  </div>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='eid'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Scopus EID
                  </label>
                  <div className='mt-1'>
                    <input
                      id='eid'
                      name='eid'
                      type='text'
                      placeholder='ex. 2-s2.0-84881394200'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                      onChange={(e) => handleTextChange(e)}
                      value={newPublication.eid}
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='sustainableDevelopmentGoals'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Sustainable Development Goals
                  </label>
                  <div className='mt-1'>
                    <input
                      id='sustainableDevelopmentGoals'
                      name='sustainableDevelopmentGoals'
                      type='text'
                      placeholder='SDG 6; SDG 8; SDG 13'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300'
                      onChange={(e) => handleArrayChange(e)}
                      value={newPublication.sustainableDevelopmentGoals.join(
                        ';'
                      )}
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    Separate sustainable development goals with a semicolon.
                  </p>
                </div>

                <div className='sm:col-span-1'>
                  <label
                    htmlFor='cirsSponsored'
                    className='block text-sm font-medium text-gray-700'
                  >
                    CIRS Sponsored
                  </label>
                  <div className='mt-1'>
                    <select
                      id='cirsSponsored'
                      name='cirsSponsored'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      onChange={(e) => handleTextChange(e)}
                      value={newPublication.cirsSponsored}
                    >
                      <option key='Select' value=''>
                        Select...
                      </option>
                      <option key='Yes' value='Yes'>
                        Yes
                      </option>
                      <option key='No' value='No'>
                        No
                      </option>
                    </select>
                  </div>
                </div>

                <div className='sm:col-span-1'>
                  <label
                    htmlFor='publicationAffiliation'
                    className='block text-sm font-medium text-gray-700'
                  >
                    GUQ Affiliated
                  </label>
                  <div className='mt-1'>
                    <select
                      id='publicationAffiliation'
                      name='publicationAffiliation'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      onChange={(e) => handleTextChange(e)}
                      value={newPublication.publicationAffiliation}
                    >
                      <option key='Select' value=''>
                        Select...
                      </option>
                      <option key='GUQ' value='GUQ'>
                        GUQ
                      </option>
                      <option key='Non-GUQ' value='Non-GUQ'>
                        Non-GUQ
                      </option>
                    </select>
                  </div>
                </div>

                <div className='sm:col-span-1'>
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
                      value={newPublication.publishingGroup}
                    >
                      <option key='Select' value=''>
                        Select...
                      </option>
                      <option key='Faculty (FT)' value='Faculty (FT)'>
                        Faculty (FT)
                      </option>
                      <option key='Students' value='Students'>
                        Students
                      </option>
                      <option
                        key='Staff (excluding CIRS)'
                        value='Staff (excluding CIRS)'
                      >
                        Staff (excluding CIRS)
                      </option>
                      <option key='CIRS Staff' value='CIRS Staff'>
                        CIRS Staff
                      </option>
                      <option key='Other' value='Other'>
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* <div className='sm:col-span-2'>
                  <label
                    htmlFor='fullText'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Full Text File Upload
                  </label>
                  <div className='mt-1 flex items-center'>
                    <div className='mt-1'>
                      <input
                        id='fullText'
                        name='fullText'
                        type='text'
                        placeholder='ex. document.pdf'
                        disabled
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-300 bg-slate-50'
                      />
                    </div>
                    <button
                      type='button'
                      className='ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Upload
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className='pt-5'>
            <div className='flex justify-start'>
              <button
                type='submit'
                className='mr-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                Save New Publication
              </button>
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
    </Container>
  );
};
