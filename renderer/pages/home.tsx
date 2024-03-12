import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import { useUser } from '../hooks/use-user';

export default function HomePage() {
  const { login, loading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-tailwindcss)</title>
      </Head>
      <div className='mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0'>
        <div className='dark:bg-magic-purple-dark dark:border-magic-purple-background w-full rounded-lg shadow sm:max-w-md md:mt-0 xl:p-0 dark:border'>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <div className='flex flex-row items-center'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Sign in
              </h1>
            </div>
            <form
              onSubmit={async (event: FormEvent) => {
                event.preventDefault();

                // console.log(password);

                await login(email, password);
              }}
              className='space-y-4 md:space-y-6'
              action='#'
            >
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  Email
                </label>
                <input
                  value={email}
                  onChange={(event: any) => {
                    setEmail(event.target.value);
                  }}
                  type='email'
                  name='email'
                  id='email'
                  className='focus:ring-primary-600 focus:border-primary-600 dark:bg-magic-black block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='name@company.com'
                  required
                />
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label>
                <input
                  value={password}
                  onChange={(event: any) => setPassword(event.target.value)}
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='focus:ring-primary-600 focus:border-primary-600 dark:bg-black block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  required
                />
              </div>

              <button
                type='submit'
                disabled={loading}
                className={`bg-blue-500 w-full rounded-lg  px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                  loading ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
