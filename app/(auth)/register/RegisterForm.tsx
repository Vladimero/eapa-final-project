'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Citizen');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (selectedRole !== 'Citizen') {
      setIsAdmin(true);
    }
  }, [selectedRole]);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        isAdmin,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    router.push(`/profile/${data.user.firstName}`);
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
      <main className="bg-white max-w-lg mx-auto p-8 mt-28 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Sign Up</h3>
          <p className="text-gray-600 pt-2">Create your account</p>
        </section>
        <section className="mt-10">
          <form
            className="flex flex-col"
            onSubmit={async (event) => await handleRegister(event)}
          >
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                First Name:
                <input
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange transition duration-500 px-3 pb-3"
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              </label>
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                Last Name:
                <input
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange transition duration-500 px-3 pb-3"
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
              </label>
            </div>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                Email:
                <input
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange transition duration-500 px-3 pb-3"
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
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
                Role:
                <select
                  onChange={(event) =>
                    setSelectedRole(event.currentTarget.value)
                  }
                >
                  <option value="false">Citizen</option>
                  <option value="true">Government</option>
                </select>
              </label>
            </div>
            <button className="hover:bg-customOrange text-black font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 border border-gray-300">
              Register
            </button>

            {errors.map((error) => (
              <div key={`error-${error.message}`}> Error: {error.message} </div>
            ))}
          </form>
        </section>
      </main>
      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-black">
          Already have an account?{' '}
          <Link href="/login" className="font-bold hover:underline">
            Login
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
