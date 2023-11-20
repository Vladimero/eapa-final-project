import React from 'react';

export default function UserProfileForm() {
  return (
    <>
      <div className="col-span-5">
        <hr />
        <br />

        <div className="form-control w-full">
          <h2 className="text-2xl ">User Information</h2>

          <label htmlFor="username" className="label">
            <span className="label-text">Username</span>
          </label>
          <input id="username" className="input input-bordered w-full mb-2" />

          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            placeholder="New password"
            className="input input-bordered join-item w-full mb-2"
          />

          {/* Personal Information */}
          <h2 className="text-2xl mt-4">Personal Information</h2>
          <label htmlFor="firstName" className="label">
            <span className="label-text">First name</span>
          </label>
          <input
            id="firstName"
            placeholder="First name"
            className="input input-bordered w-full mb-2"
          />

          <label htmlFor="lastName" className="label">
            <span className="label-text">Last name</span>
          </label>
          <input
            id="lastName"
            placeholder="Last name"
            className="input input-bordered w-full mb-2"
          />

          <label htmlFor="birthDate" className="label">
            <span className="label-text">Birth Date</span>
          </label>
          <input
            id="birthDate"
            type="date"
            placeholder="Birth Date"
            className="input input-bordered w-full mb-2"
          />
          {/* Contact Information */}
          <h2 className="text-2xl mt-4">Contact Information</h2>
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.xyz"
            className="input input-bordered join-item w-full mb-2"
          />

          <label htmlFor="phone" className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            id="phone"
            placeholder="06XX 123 456 78"
            className="input input-bordered w-full mb-2"
          />

          {/* Address */}
          <h2 className="text-2xl mt-4">Address</h2>
          <label htmlFor="address" className="label">
            <span className="label-text">Street</span>
          </label>
          <input
            id="address"
            placeholder="Street Name 1/2"
            className="input input-bordered w-full mb-2"
          />

          <label htmlFor="city" className="label">
            <span className="label-text">City</span>
          </label>
          <input
            id="city"
            placeholder="City"
            className="input input-bordered w-full mb-2"
          />

          <label htmlFor="country" className="label">
            <span className="label-text">Country</span>
          </label>
          <input
            id="country"
            placeholder="Last name"
            className="input input-bordered w-full mb-2"
          />

          <label htmlFor="postalCode" className="label">
            <span className="label-text">Postal code</span>
          </label>
          <input
            id="postalCode"
            placeholder="Postal code"
            className="input input-bordered w-full mb-2"
          />
        </div>
      </div>
    </>
  );
}
