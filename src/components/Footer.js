import { Link } from 'react-router-dom';

export const Footer = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Publications', href: '/publications' },
    { name: 'Authors', href: '/authors' },
    { name: 'Annual Reports', href: '/annual-reports' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className=' bg-cyan-900'>
      <div className='mx-auto max-w-7xl overflow-hidden py-6 px-6 sm:py-10 lg:px-8'>
        <nav
          className='-mb-8 columns-2 sm:flex sm:justify-center sm:space-x-10'
          aria-label='Footer'
        >
          {navigation.map((item) => (
            <div key={item.name} className='pb-6'>
              <Link
                to={item.href}
                className='text-sm leading-6 text-white hover:text-cyan-50'
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className='mt-6 text-center text-xs leading-5 text-white opacity-80'>
          &copy; 2023 Georgetown University in Qatar Library, Inc. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};
