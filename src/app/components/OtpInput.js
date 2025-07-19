// components/OtpInput.js
'use client';
import { useState } from 'react';

import { useRouter } from 'next/router';
import { login } from '@/utils/api';

export default function OtpInput({ mobile, serverOtp }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerify = async () => {
    if (otp !== serverOtp) {
      setError('OTP does not match');
      return;
    }

    try {
      const res = await login(mobile);
      const response = res.data.result.response;

      if (response === null) {
        router.push('/register?mobile=' + mobile);
      } else {
        const token = response.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data));
        router.push('/home');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="p-4 space-y-2">
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border px-4 py-2 w-full rounded"
      />
      <button
        onClick={handleVerify}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Verify OTP
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
