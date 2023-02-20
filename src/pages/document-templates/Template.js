import { Heading } from '../../components';
import { Link } from 'react-router-dom';

export const Template = ({
  title,
  sourceTitle,
  authorId,
  firstName,
  lastName,
  authorScopusId,
  authorResearcherId,
  authors,
  editors,
  year,
  documentType,
  abstract,
  bookReview,
  language,
  pageCount,
  pageStart,
  pageEnd,
  link,
  volume,
  issue,
  issn,
  isbn,
  doi,
  publisher,
  authorKeywords,
  indexKeywords,
  sustainableDevelopmentGoals,
  callNumber,
  publicationAffiliation,
  cirsSponsored,
  publishingGroup,
}) => {
  return (
    <>
      <div className='mb-4 flex flex-col'>
        <Heading>{title ? title : sourceTitle}</Heading>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
            <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
              Author
            </dt>
            <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
              <Link
                className='text-blue-500 hover:text-blue-800 hover:underline'
                to={`/authors/${authorId}`}
              >
                {firstName} {lastName}
              </Link>
            </dd>
          </div>
          {authorScopusId && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Author Scopus ID
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {authorScopusId}
              </dd>
            </div>
          )}
          {authorResearcherId && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                WoS ResearcherID
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {authorResearcherId}
              </dd>
            </div>
          )}
          {authors.length > 0 && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                All Authors
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {authors.map((author) => (
                  <p key={author}>{author}</p>
                ))}
              </dd>
            </div>
          )}
          {editors.length > 0 && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Editors
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {editors.map((editor) => (
                  <p key={editor}>{editor}</p>
                ))}
              </dd>
            </div>
          )}
          {year && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Publication Year
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {year}
              </dd>
            </div>
          )}
          {documentType && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Document Type
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {documentType}
              </dd>
            </div>
          )}
          {abstract && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Abstract
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {abstract}
              </dd>
            </div>
          )}
          {bookReview && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Book Review Text
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {bookReview}
              </dd>
            </div>
          )}
          {language && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Language
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {language}
              </dd>
            </div>
          )}
          {(pageStart || pageEnd) && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Pages
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {pageStart}-{pageEnd}
              </dd>
            </div>
          )}
          {(doi || link) && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Permanent Link
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {doi ? (
                  <a
                    className='text-blue-500 hover:text-blue-800 hover:underline'
                    rel='noreferrer'
                    target='_blank'
                    href={`${doi}`}
                  >
                    {doi}
                  </a>
                ) : (
                  <a
                    className='text-blue-500 hover:text-blue-800 hover:underline'
                    rel='noreferrer'
                    target='_blank'
                    href={`${link}`}
                  >
                    Link to full text
                  </a>
                )}
              </dd>
            </div>
          )}
          {(volume || issue) && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Volume, Issue
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {volume ? `volume: ${volume} ` : ''}
                {issue ? `issue: ${issue}` : ''}
              </dd>
            </div>
          )}
          {issn && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                ISSN
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {issn}
              </dd>
            </div>
          )}
          {isbn.length > 0 && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                ISBN
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {isbn.map((isbn) => (
                  <p key={isbn}>{isbn}</p>
                ))}
              </dd>
            </div>
          )}
          {doi && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                DOI
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {doi ? (
                  <a
                    className='text-blue-500 hover:text-blue-800 hover:underline'
                    rel='noreferrer'
                    target='_blank'
                    href={`${doi}`}
                  >
                    {doi}
                  </a>
                ) : (
                  ''
                )}
              </dd>
            </div>
          )}
          {publisher && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Publisher
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {publisher}
              </dd>
            </div>
          )}
          {authorKeywords.length > 0 && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Author Keywords
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {authorKeywords.map((keyword) => (
                  <p key={keyword}>{keyword}</p>
                ))}
              </dd>
            </div>
          )}
          {indexKeywords.length > 0 && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Index Keywords
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {indexKeywords.map((keyword) => (
                  <p key={keyword}>{keyword}</p>
                ))}
              </dd>
            </div>
          )}
          {sustainableDevelopmentGoals.length > 0 && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Sustainable Development Goals
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {sustainableDevelopmentGoals.map((goal) => (
                  <p key={goal}>{goal}</p>
                ))}
              </dd>
            </div>
          )}
          {callNumber && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Call Number
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {callNumber}
              </dd>
            </div>
          )}
          {publicationAffiliation && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                GUQ Affiliated
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {publicationAffiliation}
              </dd>
            </div>
          )}
          {cirsSponsored && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                CIRS Sponsored
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {cirsSponsored}
              </dd>
            </div>
          )}
          {publishingGroup && (
            <div className='py-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-900 text-left md:text-right'>
                Author Status
              </dt>
              <dd className='mt-1 text-sm text-gray-600 sm:col-span-5 sm:mt-0'>
                {publishingGroup}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </>
  );
};
