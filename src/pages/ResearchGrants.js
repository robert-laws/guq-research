import React from 'react';
import { Heading, Container } from '../components';

export const ResearchGrants = () => {
  return (
    <Container>
      <Heading>Methodology</Heading>
      <main>
        <div className='mx-auto lg:mx-0 lg:max-w-none'>
          <div className='lg:pr-8 lg:pt-4'>
            <div className='lg:max-w-full'>
              <table border='1' className='min-w-full divide-y divide-gray-300'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                    >
                      Location of authors citing GU-Q publications
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Number of documents citing GU-Q publications (as of end of
                      July 2023)
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  <tr>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      TAMU-Q
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      618
                    </td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      HBKU
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      573
                    </td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      WCM-Q
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      363
                    </td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      CMU-Q
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      132
                    </td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      GU-Q
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      73
                    </td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      NU-Q
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      39
                    </td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      VCU-Q
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      34
                    </td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      UCL-Q
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      16
                    </td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      HEC PARIS-Q
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      3
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
};
