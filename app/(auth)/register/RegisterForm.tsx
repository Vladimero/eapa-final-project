'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Citizen');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (selectedRole !== 'Citizen') {
      setIsAdmin(true);
    }
  }, [selectedRole]);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        </label>
        <label>
          Last Name:
          <input onChange={(event) => setLastName(event.currentTarget.value)} />
        </label>
        <label>
          Email:
          <input onChange={(event) => setEmail(event.currentTarget.value)} />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <label>
          Role:
          <select
            onChange={(event) => setSelectedRole(event.currentTarget.value)}
          >
            <option value="false">Citizen</option>
            <option value="true">Government</option>
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
