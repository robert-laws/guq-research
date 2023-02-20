import React from 'react';

export const Heading = ({ children }) => {
  return (
    <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight flex items-center'>
      {children}
    </h2>
  );
};
