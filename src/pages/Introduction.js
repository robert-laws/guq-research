import React from 'react';
import { Heading, Container } from '../components';

export const Introduction = () => {
  return (
    <Container>
      <Heading>Introduction</Heading>
      <main>
        <div className='relative px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl py-14 sm:py-16 lg:py-18'>
            <p className='mt-6 text-lg leading-8 text-gray-600 text-justify'>
              This is a comprehensive database of publications completed by
              members of Georgetown University in Qatar (GU-Q). It includes (1)
              works published during an author's tenure at GU-Q, from the year
              following appointment on and (2) publications that list GU-Q as an
              author's affiliation. The database does not include works
              published before joining GU-Q or works where the authors list
              institutions other than GU-Q or Georgetown University as their
              affiliation. Please search the database to discover researchers,
              browse and access publications and author profiles, and visualize
              GU-Q's research output and impact.
            </p>
          </div>
        </div>
      </main>
    </Container>
  );
};
