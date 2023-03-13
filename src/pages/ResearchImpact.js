import { Link } from 'react-router-dom';
import { Heading, Container } from '../components';
import ReportSDG from '../reports/GUQ-Research-SDGs.pptx';
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
          <li>
            Citations to GU-Q research by institution (chart,{' '}
            <a
              href='https://app.vosviewer.com/?json=https://drive.google.com/uc?id=1Cqo1fitkqCJl_XYLu3e6wsDYsdXJZUir'
              target='_blank'
              rel='noreferrer'
              className='hover:underline text-blue-700'
            >
              map
            </a>
            )
          </li>
          <li>
            GUQ-United Nations Sustainable Development Goals (
            <Link
              to={ReportSDG}
              target='_blank'
              download='GUQ-Research-SDGs.pptx'
              className='hover:underline text-blue-700'
            >
              chart
            </Link>
            )
          </li>
        </ul>
      </main>
    </Container>
  );
};
