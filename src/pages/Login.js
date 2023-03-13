import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks';
import { Container, SpinnerButton } from '../components';
import AuthContext from '../context/auth/authContext';

export const Login = () => {
  const { login, loginError, isLoginPending } = useLogin();
  const { authenticatedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticatedUser) {
      navigate('/');
    }
  }, [authenticatedUser, navigate]);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.email === '' || credentials.password === '') {
      return;
    } else {
      login(credentials.email, credentials.password);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <main className='grid min-h-full place-items-center bg-white py-20 px-6 sm:py-24 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900'>
            Login
          </h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white border border-gray-100 py-8 px-4 shadow-md sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit}>
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
                <SpinnerButton loading={isLoginPending} buttonText='Login' />
                {loginError && (
                  <p className='text-red-500 text-center mt-2'>{loginError}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </Container>
  );
};
