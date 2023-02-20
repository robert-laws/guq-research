import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/book.svg';

export const Navigation = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Publications', href: '/publications' },
    { name: 'Authors', href: '/authors' },
    { name: 'Annual Reports', href: '/annual-reports' },
    { name: 'Research Impact', href: '/research-impact' },
    { name: 'Contact', href: '/contact' },
    // { name: 'New', href: '/admin/new' },
  ];

  return (
    <header className=' bg-cyan-900'>
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='flex w-full items-center justify-between border-b border-cyan-500 py-6 lg:border-none'>
          <div className='flex items-center'>
            <Link to='/'>
              <span className='sr-only'>GU-Q Publications</span>
              <img
                className='h-10 w-auto'
                src={Logo}
                alt='GU-Q Publications Logo'
              />
            </Link>
            <div className='ml-12 hidden space-x-8 lg:block'>
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className='text-base font-medium text-white hover:text-cyan-50'
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className='ml-10 space-x-4'>
            {/* <Link
              to='/login'
              className='inline-block rounded-md border border-transparent bg-cyan-700 py-2 px-3 text-base font-medium text-white hover:bg-cyan-50 hover:text-cyan-600'
            >
              Login
            </Link> */}
          </div>
        </div>
        <div className='flex flex-wrap justify-center space-x-6 py-4 lg:hidden'>
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='text-base font-medium text-white hover:text-cyan-50'
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
