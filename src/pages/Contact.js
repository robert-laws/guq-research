import React from 'react';
import { Heading, Container } from '../components';

export const Contact = () => {
  return (
    <Container>
      <Heading>Contact</Heading>
      <main>
        {/* <div className='max-w-prose text-lg pb-10'>
          <p className='mt-8 text-xl leading-8 text-gray-500'>
            For the content of the database:
          </p>
          <p>
            <strong>Lokman I. Meho</strong>
            <br />
            Director of the Library Georgetown University in Qatar
            <br />
            Education City | P.O. Box 23689 | Doha, Qatar
            <br />
            phone: + 974 4457 8493
            <br />
            mobile: + 974 5542 0190
            <br />
            email:{' '}
            <a
              className='hover:underline text-blue-700'
              href='mailto:lm1470@georgetown.edu'
            >
              lm1470@georgetown.edu
            </a>
          </p>
        </div> */}
        <div className='max-w-prose text-lg border-b border-gray-200'>
          <p className='mt-8 text-xl leading-8 text-gray-500'>
            For the design and technical features of the database:
          </p>
          <p>
            <strong>Robert Laws</strong>
            <br />
            Data, Web, and Media Services Librarian
            <br />
            Education City | P.O. Box 23689 | Doha, Qatar
            <br />
            phone: + 974 4457 8315
            <br />
            email:{' '}
            <a
              className='hover:underline text-blue-700'
              href='mailto:rdl27@georgetown.edu'
            >
              rdl27@georgetown.edu
            </a>
          </p>
        </div>
      </main>
    </Container>
  );
};
