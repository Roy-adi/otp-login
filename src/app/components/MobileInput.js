// components/MobileInput.js
'use client';
import { sendOtp } from '@/utils/api';
import Link from 'next/link';
import { useState } from 'react';

export default function MobileInput({ onOtpSent }) {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendOtp = async () => {
    setError('');
    setSuccess('');
    try {
      if (!mobile.trim()) {
        setError('Mobile number is required');
        return;
      }
      const res = await sendOtp(mobile);
      const encodedOtp = res.data.result.response.otp;
      const decodedOtp = atob(encodedOtp);
      onOtpSent(mobile, decodedOtp);
      setSuccess('OTP sent successfully!');
    } catch (err) {
      console.log(err, 'error res')
      setError('Failed to send OTP due to : ' + err.response.data.message)
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Static Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-700">Verify Your Mobile Number</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Enter your mobile number to receive a one-time password (OTP).
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          type="tel"
          maxLength="10"
          pattern="[0-9]*"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400  text-black"
        />

        <button
          onClick={handleSendOtp}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium px-6 py-2 rounded-md w-full shadow"
        >
          Send OTP
        </button>
 
        <button
         
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium px-6 py-2 rounded-md w-full shadow "
        >
          <Link href="/register" className="">
          Register
        </Link>
        </button>

        

        {/* Error or Success Feedback */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        {/* Static Help Text */}
        <div className="mt-4 text-xs text-gray-500">
          <p>🔒 Your number is safe with us.</p>
          <p>📩 You’ll receive a 6-digit OTP via SMS.</p>
          <p>✅ Ensure your mobile number is active and has network coverage.</p>
        </div>
      </div>
    </div>
  );
}
