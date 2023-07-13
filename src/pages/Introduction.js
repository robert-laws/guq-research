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
                The Georgetown University in Qatar (GU-Q) Research Database is a
                platform for exploring and understanding the diverse
                intellectual contributions from our esteemed scholars. This
                dynamic and all-encompassing database houses a broad spectrum of
                scholarly works produced by members of the GU-Q community. It
                encapsulates an array of publications crafted during each
                author's tenure at GU-Q, starting from the year subsequent to
                their appointment. It also includes works that proudly bear GU-Q
                as the author's institutional affiliation. However, please note
                that the database does not encompass publications prior to the
                author's affiliation with GU-Q or those affiliated with
                institutions other than GU-Q or Georgetown University. This
                digital hub not only enables you to uncover our researchers and
                their groundbreaking work but also offers you an opportunity to
                explore their profiles and delve into the depth and breadth of
                GU-Q's scholarly impact. Navigate this platform, discover our
                research prowess, and join us on a journey of intellectual
                exploration and discovery.
              </p>
            </div>
          </div>
          <img
            src={FacultyBooks}
            alt='Scholar Publications'
            className='lg:max-w-xl max-w-md rounded-xl shadow-xl ring-1 ring-gray-400/10 lg:mt-12 mt-0'
          />
        </div>
      </main>
    </Container>
  );
};
