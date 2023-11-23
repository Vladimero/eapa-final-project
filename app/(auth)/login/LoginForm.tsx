'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.firstName}`,
    );

    router.refresh();
  }

  const bodyBgStyle = {
    backgroundColor: '#e86a21',
    backgroundImage: 'linear-gradient(315deg, #d78657 0%, #dae6db 74%)',
  };

  return (
    <div
      className="body-bg min-h-screen pt-4 md:pt-12 pb-6 px-2 md:px-0"
      style={bodyBgStyle}
    >
      <main className="bg-white max-w-lg mx-auto p-8 mt-32 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Sign In</h3>
        </section>
        <section className="mt-10">
          <form
            className="flex flex-col"
            onSubmit={async (event) => await handleLogin(event)}
          >
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                Email:
                <input
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </label>
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                Password:
                <input
                  type="password"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange transition duration-500 px-3 pb-3"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
              </label>
            </div>
            <div className="flex justify-end">
              <Link
                href="/"
                className="text-sm text-black hover:text-customOrange hover:underline mb-6"
              >
                Forgot your password?
              </Link>
            </div>
            <button className="hover:bg-customOrange text-black font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 border border-gray-300">
              Login
            </button>

            {errors.map((error) => (
              <div key={`error-${error.message}`}> Error: {error.message} </div>
            ))}
          </form>
        </section>
      </main>
      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-black">
          Haven't registered yet?{' '}
          <Link href="/register" className="font-bold hover:underline">
            Sign Up
          </Link>
          .
        </p>
      </div>
      <div className="max-w-lg mx-auto flex justify-center text-black">
        <Link href="/" className="hover:underline">
          Contact
        </Link>
        <span className="mx-3">•</span>
        <Link href="/" className="hover:underline">
          Privacy
        </Link>
      </div>
    </div>
  );
}
