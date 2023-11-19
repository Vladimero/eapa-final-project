import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import FooterForm from './components/FooterForm';
import NavBarForm from './components/NavbarForm';

export const metadata: Metadata = {
  title: 'EAPA',
  description: 'Environmental Assessment Platform of Austria',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout(props: Props) {
  return (
    <html lang="en" data-theme="lemonade">
      <body>
        <NavBarForm />
        <div className="mt-36 mb-24">{props.children}</div>
        <FooterForm />
      </body>
    </html>
  );
}
