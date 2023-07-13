import React from 'react';
import { Heading, Container } from '../components';
import FacultyBooks from '../images/faculty-books-2.jpg';

export const Introduction = () => {
  return (
    <Container>
      <Heading>Introduction</Heading>
      <main>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
          <div className='lg:pr-8 lg:pt-4'>
            <div className='lg:max-w-lg'>
              <p className='mt-6 text-lg leading-8 text-gray-600 text-justify'>
                This is a comprehensive database of publications completed by
                members of Georgetown University in Qatar (GU-Q). It includes
                (1) works published during an author's tenure at GU-Q, from the
                year following appointment on and (2) publications that list
                GU-Q as an author's affiliation. The database does not include
                works published before joining GU-Q or works where the authors
                list institutions other than GU-Q or Georgetown University as
                their affiliation. Please search the database to discover
                researchers, browse and access publications and author profiles,
                and visualize GU-Q's research output and impact.
              </p>
            </div>
          </div>
          <img
            src={FacultyBooks}
            alt='Faculty Publications'
            className='lg:max-w-xl max-w-md rounded-xl shadow-xl ring-1 ring-gray-400/10 lg:mt-12 mt-0'
          />
        </div>
      </main>
    </Container>
  );
};
