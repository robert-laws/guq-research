import { Link } from 'react-router-dom';
import { ResearchIcon } from '../components';
import ScopusIcon from '../images/scopus.png';
import WebOfScienceIcon from '../images/web-of-science.png';
import GoogleScholarIcon from '../images/google-scholar.png';
import GU360Icon from '../images/gu-360.png';
import ResearchGateIcon from '../images/research-gate.png';
import OrcidIcon from '../images/orcid.png';

export const AuthorCard = ({
  id,
  authorId,
  firstName,
  lastName,
  joinYear,
  leftYear,
  scopusId,
  woSId,
  orcidId,
  researchGateUrl,
  threeSixtyProfileUrl,
  googleScholarProfileUrl,
}) => {
  return (
    <div
      key={id}
      className='col-span-1 relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-blue-600 hover:bg-cyan-50'
    >
      <div className='flex w-full items-center justify-between space-x-6 p-1'>
        <div className='flex-1 truncate'>
          <div className='flex items-center space-x-3 mb-1'>
            <h3 className='truncate text-md font-medium text-gray-900'>
              <Link
                to={`/authors/${authorId}`}
                className='block hover:underline text-blue-700 font-medium'
              >
                {lastName}, {firstName}
              </Link>
            </h3>
            <span>
              ({joinYear}-{leftYear})
            </span>
          </div>
          <div className='flex items-start space-x-1'>
            {scopusId && (
              <ResearchIcon
                iconImage={ScopusIcon}
                link={scopusId}
                altText='Scopus'
                location='card'
              />
            )}
            {woSId && (
              <ResearchIcon
                iconImage={WebOfScienceIcon}
                link={woSId}
                altText='Web of Science'
                location='card'
              />
            )}
            {googleScholarProfileUrl && (
              <ResearchIcon
                iconImage={GoogleScholarIcon}
                link={googleScholarProfileUrl}
                altText='Google Scholar'
                location='card'
              />
            )}
            {threeSixtyProfileUrl && (
              <ResearchIcon
                iconImage={GU360Icon}
                link={threeSixtyProfileUrl}
                altText='GU 360'
                location='card'
              />
            )}
            {orcidId && (
              <ResearchIcon
                iconImage={OrcidIcon}
                link={orcidId}
                altText='Orcid'
                location='card'
              />
            )}
            {researchGateUrl && (
              <ResearchIcon
                iconImage={ResearchGateIcon}
                link={researchGateUrl}
                altText='Research Gate'
                location='card'
              />
            )}
          </div>
          <p className='mt-1 truncate text-sm text-gray-500'>
            <strong></strong>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};
