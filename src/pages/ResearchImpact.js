import { Link } from 'react-router-dom';
import { Heading, Container } from '../components';
import MapCitations from '../reports/MapCitations.pdf';

export const ResearchImpact = () => {
  return (
    <Container>
      <Heading>Research Impact</Heading>
      <main>
        <ul className='list-disc mt-4 ml-8'>
          <li>
            Research areas/strengths (chart,{' '}
            <a
              href='https://app.vosviewer.com/?json=https://drive.google.com/uc?id=1DHkas86637cEVp9JLVvUN4nhiV8hj1l4'
              target='_blank'
              rel='noreferrer'
              className='hover:underline text-blue-700'
            >
              map
            </a>
            )
          </li>
          <li>
            Citations to GU-Q research by country (chart,{' '}
            <Link
              to={MapCitations}
              target='_blank'
              download='MapCitations.pdf'
              className='hover:underline text-blue-700'
            >
              map
            </Link>
            )
          </li>
        </ul>
      </main>
    </Container>
  );
};
