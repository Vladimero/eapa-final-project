import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUserBySessionToken } from '../../database/users';
import Logo from '../../public/images/logo.png';

export default async function NavBarForm() {
  // 1. Check if a session token from the cookie of the browser exists
  const cookieFromBrowser = cookies();

  const sessionToken = cookieFromBrowser.get('sessionToken');

  // 2. Get the current logged-in user from the database using sessions token value
  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <header
      className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-xl border border-gray-100 bg-white/80 py-4 md:py-6 shadow backdrop-blur-lg md:top-6 md:rounded-3xl"

      // second
      // className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-4 md:py-6 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg"

      // first
      // className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg"
    >
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <div aria-current="page" className="flex items-center">
              <Link href="/">
                <Image
                  className="h-12 w-auto"
                  // className="h-7 w-auto"
                  src={Logo}
                  alt="Logo"
                  width={300}
                  height={80}
                />
              </Link>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            {user ? (
              <Link
                aria-current="page"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href={`/profile/${user.firstName}`}
              >
                Profile
              </Link>
            ) : (
              <Link
                aria-current="page"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href="/login"
              >
                Profile
              </Link>
            )}
            <Link
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="/about"
            >
              About
            </Link>
          </div>

          <div className="flex items-center justify-end gap-3">
            {user ? (
              <>
                <p className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                  {user.firstName}
                </p>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href="/register"
                >
                  Register
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href="/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
