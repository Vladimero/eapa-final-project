import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/images/Logo.png';

export default function FooterForm() {
  return (
    <footer>
      <div className="container mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex-1 mb-6 mr-24">
            <Link href="/">
              <Image
                className="h-12 w-auto"
                src={Logo}
                alt="Logo"
                width={200}
                height={60}
              />
            </Link>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Links</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  FAQ
                </Link>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  Help
                </Link>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Legal</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  Terms
                </Link>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Social</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  Facebook
                </Link>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  Linkedin
                </Link>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Company</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  Official Blog
                </Link>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/about"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  About Us
                </Link>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link
                  href="/"
                  className="no-underline hover:underline text-gray-800 hover:text-customOrange"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <aside className="text-center text-sm no-underline hover:underline text-gray-800">
          <p>Copyright © 2023 - All right reserved by EAPA</p>
        </aside>
      </div>
      <br />
      <br />
    </footer>
  );
}
