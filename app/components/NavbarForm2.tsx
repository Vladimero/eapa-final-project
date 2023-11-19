import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUserBySessionToken } from '../../database/users';
import Logo from '../../public/images/logo.png';

export default async function NavBarForm2() {
  // 1. Check if a session token from the cookie of the browser exists
  const cookieFromBrowser = cookies();

  const sessionToken = cookieFromBrowser.get('sessionToken');

  // 2. Get the current logged-in user from the database using sessions token value
  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  const bodyBgStyle = {
    backgroundColor: '#e86a21',
    backgroundImage: 'linear-gradient(315deg, #e86a21 0%, #85b989 74%)',
  };

  return (
    <header
      id="header"
      className="fixed w-full z-30 top-0 text-white"
      style={bodyBgStyle}
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <Link
            className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="#"
          >
            <Image
              className="h-12 w-auto"
              src={Logo}
              alt="Logo"
              width={300}
              height={80}
            />
          </Link>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            {user ? (
              <li className="mr-3">
                <Link
                  className="inline-block py-2 px-4 text-black font-bold no-underline"
                  href={`/profile/${user.firstName}`}
                >
                  Profile
                </Link>
              </li>
            ) : (
              <li className="mr-3">
                <Link
                  className="inline-block py-2 px-4 text-black font-bold no-underline"
                  href="/login"
                >
                  Profile
                </Link>
              </li>
            )}
            <li className="mr-3">
              <Link
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="mr-3">
              <Link
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {user ? (
            <>
              <p className="inline-block py-2 px-4 text-black font-bold no-underline">
                {user.firstName}
              </p>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                id="navAction"
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="/register"
              >
                Register
              </Link>
              <Link
                id="navAction"
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="/login"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </header>
  );
}
