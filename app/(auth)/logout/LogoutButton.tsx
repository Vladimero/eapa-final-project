import React from 'react';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button
        className="inline-flex items-center justify-center rounded-xl bg-customOrange px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-customGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        formAction={logout}
      >
        Logout
      </button>
    </form>
  );
}
