import React from 'react';

export const ResearchIcon = ({
  iconImage,
  link,
  altText,
  location = 'profile',
}) => {
  return (
    <a href={link} rel='noreferrer' target='_blank' className=''>
      <img
        className={
          location === 'card'
            ? 'h-7 w-auto inline-block ml-0 -mt-0 mr-1 rounded-md'
            : 'h-7 w-auto inline-block ml-4 -mt-2 rounded-md'
        }
        title={altText}
        src={iconImage}
        alt={altText}
      />
    </a>
  );
};
