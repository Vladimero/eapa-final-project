import React from 'react';

export default function UserProfileForm() {
  return (
    <div className="mx-4 md:mx-auto max-w-2xl">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">User Information</h2>
              <div className="flex flex-col">
                <label htmlFor="username" className="label">
                  <span className="label-text hover:text-customOrange">
                    Email
                  </span>
                </label>
                <input
                  id="username"
                  placeholder="Your email"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
                />
              </div>
              <label htmlFor="username" className="label">
                <span className="label-text hover:text-customOrange">
                  Password
                </span>
              </label>
              <input
                id="username"
                type="password"
                placeholder="New password"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-6">Personal Information</h2>
              <div className="flex flex-col">
                <label htmlFor="firstName" className="label">
                  <span className="label-text hover:text-customOrange">
                    First name
                  </span>
                </label>
                <input
                  id="firstName"
                  placeholder="First name"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
                />
                <label htmlFor="lastName" className="label">
                  <span className="label-text hover:text-customOrange">
                    Last name
                  </span>
                </label>
                <input
                  id="lastName"
                  placeholder="Last name"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
                />
                <label htmlFor="birthDate" className="label">
                  <span className="label-text hover:text-customOrange">
                    Birth Date
                  </span>
                </label>
                <input
                  id="birthDate"
                  type="date"
                  placeholder="Birth Date"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <div className="flex flex-col">
                <label htmlFor="phone" className="label">
                  <span className="label-text hover:text-customOrange">
                    Phone
                  </span>
                </label>
                <input
                  id="phone"
                  placeholder="+43 XXX XXX XXX XX"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-6">Address</h2>
              <div className="flex flex-col">
                <label htmlFor="street" className="label">
                  <span className="label-text hover:text-customOrange">
                    Street
                  </span>
                </label>
                <input
                  id="street"
                  placeholder="Street"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
                />
                <label htmlFor="city" className="label">
                  <span className="label-text hover:text-customOrange">
                    City
                  </span>
                </label>
                <input
                  id="city"
                  placeholder="City"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
                />

                <label htmlFor="country" className="label">
                  <span className="label-text hover:text-customOrange">
                    Country
                  </span>
                </label>
                <input
                  id="country"
                  placeholder="Last name"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
                />

                <label htmlFor="postalCode" className="label">
                  <span className="label-text hover:text-customOrange">
                    Postal code
                  </span>
                </label>
                <input
                  id="postalCode"
                  placeholder="Postal code"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-customOrange  transition duration-500 px-3 pb-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
