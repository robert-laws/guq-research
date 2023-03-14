import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, SpinnerButton } from '../components';
import { useSignup } from '../hooks';
import AuthContext from '../context/auth/authContext';

export const SignUp = () => {
  const { authenticatedUser } = useContext(AuthContext);
  const { signupUser, signupError, isSignupPending } = useSignup();
  const navigate = useNavigate();

  const [signup, setSignup] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (authenticatedUser && authenticatedUser.displayName) {
      navigate('/profile');
    }
  }, [authenticatedUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser(signup);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  return (
    <Container>
      <main className='grid min-h-full place-items-center bg-white py-20 px-6 sm:py-24 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900'>
            Sign Up
          </h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-lg'>
          <div className='bg-white border border-gray-100 py-8 px-4 shadow-md sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-semibold leading-6 text-gray-900'
                  >
                    First name
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='text'
                      name='firstName'
                      id='firstName'
                      onChange={handleChange}
                      required
                      className='block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-semibold leading-6 text-gray-900'
                  >
                    Last name
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='text'
                      name='lastName'
                      id='lastName'
                      onChange={handleChange}
                      required
                      className='block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    onChange={handleChange}
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    onChange={handleChange}
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='pt-2'>
                <SpinnerButton
                  loading={isSignupPending}
                  buttonText='Login'
                  buttonActionText='Logging in...'
                />
                {signupError && (
                  <p className='text-red-500 text-center mt-2'>{signupError}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </Container>
  );
};
