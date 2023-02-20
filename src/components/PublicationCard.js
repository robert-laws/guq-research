import React from 'react';
import { Link } from 'react-router-dom';

export const PublicationCard = ({
  docId,
  title,
  sourceTitle,
  authorId,
  author,
  year,
  language,
  documentType,
  doi,
  link,
}) => {
  return (
    <div className='relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-blue-600 hover:bg-cyan-50'>
      <div className='flex-shrink-0'>{/* Future Checkbox */}</div>
      <div>
        <dl className=''>
          <div className=''>
            <dt className='text-lg'>
              <span className='block hover:underline text-blue-700 font-medium'>
                <Link to={`/publications/${docId}`}>{title}</Link>
              </span>
              <span className='block hover:underline text-blue-700 font-normal'>
                <Link to={`/authors/${authorId}`}>{author}</Link>
              </span>
              {documentType !== 'Authored Book' && (
                <span className='block'>{sourceTitle}</span>
              )}
            </dt>
            <dd className='mt-1 text-base font-semibold tracking-tight text-gray-900'>
              <span>
                Published: <span className='text-gray-700'>{year}</span>
              </span>
              <span className='px-2 text-gray-200' aria-hidden='true'>
                |
              </span>
              <span>
                Language: <span className='text-gray-700'>{language}</span>
              </span>
              <span className='px-2 text-gray-200' aria-hidden='true'>
                |
              </span>
              <span>
                <span className='text-gray-700'>{documentType}</span>
              </span>
              {(doi || link) && (
                <>
                  <span className='px-2 text-gray-200' aria-hidden='true'>
                    |
                  </span>
                  <span>
                    {doi ? (
                      <a
                        className='text-blue-500 hover:text-blue-800 hover:underline'
                        rel='noreferrer'
                        target='_blank'
                        href={`${doi}`}
                      >
                        Full Text
                      </a>
                    ) : (
                      <a
                        className='text-blue-500 hover:text-blue-800 hover:underline'
                        rel='noreferrer'
                        target='_blank'
                        href={`${link}`}
                      >
                        Full Text
                      </a>
                    )}
                  </span>
                </>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
