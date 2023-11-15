import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUserBySessionToken } from '../../database/users';
import Logo from '../../public/images/logo.png';

export default async function NavbarForm() {
  // 1. Check if a session token from the cookie of the browser exists
  const cookieFromBrowser = cookies();

  const sessionToken = cookieFromBrowser.get('sessionToken');

  // 2. Get the current logged-in user from the database using sessions token value
  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <header className="sticky top-0 z-40">
      <nav className="w-full fixed top-0 z-50">
        <div className="navbar bg-base-100">
          <div className="navbar-start ml-2">
            <Link className="btn btn-ghost normal-case text-xl" href="/">
              <Image src={Logo} alt="Logo" width={300} height={80} />
            </Link>
          </div>

          <div className="navbar-center">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/" tabIndex={0} className="text-lg">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/dashboard" tabIndex={0} className="text-lg">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/contact" tabIndex={0} className="text-lg">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="navbar-end mr-2">
            {user ? (
              <>
                <ul className="menu menu-horizontal px-1 flex items-center">
                  <li className="mr-4">Welcome</li>{' '}
                  <li className="text-lg">{user.firstName}</li>{' '}
                  <li className="ml-4">
                    <LogoutButton />
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="menu menu-horizontal px-1 text-lg">
                  <li>
                    <Link href="/register">
                      <p>
                        <button className="btn">Register</button>
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <p>
                        <button className="btn">Login</button>
                      </p>
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
