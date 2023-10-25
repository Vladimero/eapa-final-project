import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';
import LogoutButton from './(auth)/logout/LogoutButton';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body>
        {/* <NavbarForm /> */}
        <nav>
          <div>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </div>

          <div>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
            <LogoutButton />
          </div>
        </nav>
        <main>{props.children}</main>
        {/* <FooterForm /> */}
      </body>
    </html>
  );
}
