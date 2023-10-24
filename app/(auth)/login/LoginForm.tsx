'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(
      getSafeReturnToPath(props.returnTo) ||
        `/profile/${data.user.firstName}${data.user.lastName}`,
    );
  }

  return (
    <div>
      <form onSubmit={async (event) => await handleRegister(event)}>
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
        <button>Login</button>

        {errors.map((error) => (
          <div key={`error-${error.message}`}> Error: {error.message} </div>
        ))}
      </form>
    </div>
  );
}
