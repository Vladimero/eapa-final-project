import React from 'react';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button
        className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
        formAction={logout}
      >
        Logout
      </button>
    </form>
  );
}
