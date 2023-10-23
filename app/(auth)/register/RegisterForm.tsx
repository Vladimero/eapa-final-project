'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Citizen');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isAdmin = selectedRole === 'Government';
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        isAdmin,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    router.push('/');
  }
  return (
    <div>
      <form onSubmit={async (event) => await handleRegister(event)}>
        <label>
          First Name:
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
        </label>
        <label>
          Email:
          <input
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <label>
          Role:
          <select
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.currentTarget.value)}
          >
            <option value="user">Citizen</option>
            <option value="admin">Government</option>
          </select>
        </label>
        <button>Register</button>

        {errors.map((error) => (
          <div key={`error-${error.message}`}> Error: {error.message} </div>
        ))}
      </form>
    </div>
  );
}
