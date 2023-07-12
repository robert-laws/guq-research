import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import Logo from '../images/book.svg';
import AuthContext from '../context/auth/authContext';
import { useLogout } from '../hooks';
import Report2020 from '../reports/GUQ-Research-2020.pdf';
import MapCitations from '../reports/MapCitations.pdf';
// import { DataSources, Introduction, Methodology } from '../pages';

export const Navigation = () => {
  const { authenticatedUser } = useContext(AuthContext);
  const { logout } = useLogout();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const navigation = [
    { name: 'Publications', href: '/publications' },
    { name: 'Authors', href: '/authors' },
  ];

  // { name: 'Annual Reports', href: '/annual-reports' },
  // { name: 'Research Impact', href: '/research-impact' },
  // { name: 'Contact', href: '/contact' },

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
              <Menu
                as='div'
                className='sm:relative inline-block text-left ml-8'
              >
                <div>
                  <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-0 font-medium text-white hover:bg-transparent'>
                    About
                    {/* <ChevronDownIcon
                      className='-mr-1 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    /> */}
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/introduction'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Introduction
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/data-sources'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Data Sources
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/methodology'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Methodology
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className='text-base font-medium text-white hover:text-cyan-50'
                >
                  {link.name}
                </Link>
              ))}

              <Menu
                as='div'
                className='sm:relative inline-block text-left ml-8'
              >
                <div>
                  <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-0 font-medium text-white hover:bg-transparent'>
                    Annual Reports
                    {/* <ChevronDownIcon
                      className='-mr-1 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    /> */}
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={Report2020}
                            target='_blank'
                            download='GUQ-Research-2020.pdf'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            2022 Annual Report (PDF)
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={Report2020}
                            target='_blank'
                            download='GUQ-Research-2020.pdf'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            2021 Annual Report (PDF)
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={Report2020}
                            target='_blank'
                            download='GUQ-Research-2020.pdf'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            2020 Annual Report (PDF)
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <Menu
                as='div'
                className='sm:relative inline-block text-left ml-8'
              >
                <div>
                  <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-0 font-medium text-white hover:bg-transparent'>
                    Research Impact
                    {/* <ChevronDownIcon
                      className='-mr-1 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    /> */}
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='https://app.vosviewer.com/?json=https://drive.google.com/uc?id=1CYKE0nrMOugPlzcL93s0slXlbd-PWU7l'
                            target='_blank'
                            rel='noreferrer'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Research Areas
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={MapCitations}
                            target='_blank'
                            download='MapCitations.pdf'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Global
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className='ml-10 space-x-4'>
            {!authenticatedUser && (
              <Link
                to='/login'
                className='inline-block rounded-md border border-transparent bg-cyan-700 py-2 px-3 text-base font-medium text-white hover:bg-cyan-50 hover:text-cyan-600'
              >
                Login
              </Link>
            )}
            {authenticatedUser && (
              <>
                <span className='text-white'>
                  Welcome,{' '}
                  {authenticatedUser.email.substring(
                    0,
                    authenticatedUser.email.indexOf('@')
                  )}
                </span>
                <button
                  onClick={logout}
                  className='inline-block rounded-md border border-transparent bg-cyan-700 py-2 px-3 text-base font-medium text-white hover:bg-cyan-50 hover:text-cyan-600'
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        <div className='flex flex-wrap justify-start space-x-6 py-4 lg:hidden'>
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='text-base font-medium text-white hover:text-cyan-50'
            >
              {link.name}
            </a>
          ))}
          <Menu as='div' className='sm:relative inline-block text-left ml-8'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-0 font-semibold text-white hover:bg-transparent'>
                Annual Reports
                {/* <ChevronDownIcon
                  className='-mr-1 h-5 w-5 text-gray-400'
                  aria-hidden='true'
                /> */}
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={Report2020}
                        target='_blank'
                        download='GUQ-Research-2020.pdf'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        2022 Annual Report (PDF)
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={Report2020}
                        target='_blank'
                        download='GUQ-Research-2020.pdf'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        2021 Annual Report (PDF)
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={Report2020}
                        target='_blank'
                        download='GUQ-Research-2020.pdf'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        2020 Annual Report (PDF)
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as='div' className='sm:relative inline-block text-left ml-8'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-0 font-semibold text-white hover:bg-transparent'>
                Research Impact
                {/* <ChevronDownIcon
                  className='-mr-1 h-5 w-5 text-gray-400'
                  aria-hidden='true'
                /> */}
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to='https://app.vosviewer.com/?json=https://drive.google.com/uc?id=1CYKE0nrMOugPlzcL93s0slXlbd-PWU7l'
                        target='_blank'
                        rel='noreferrer'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Research Areas
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={MapCitations}
                        target='_blank'
                        download='MapCitations.pdf'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Global
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    </header>
  );
};
