import { Link } from 'react-router-dom';
import { Heading, Container } from '../components';
import Report2020 from '../reports/GUQ-Research-2020.pdf';

export const AnnualReports = () => {
  return (
    <Container>
      <Heading>Annual Reports</Heading>
      <main>
        <ul className='list-disc mt-4 ml-8'>
          <li>
            <Link
              to={Report2020}
              target='_blank'
              download='GUQ-Research-2020.pdf'
              className='hover:underline text-blue-700'
            >
              2020 Annual Report (PDF)
            </Link>
          </li>
        </ul>
      </main>
    </Container>
  );
};
