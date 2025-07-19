'use client';

import { useState } from 'react';
import MobileInput from '../components/MobileInput';
import OtpInput from '../components/OtpInput';


export default function LoginPage() {
  const [step, setStep] = useState('mobile');
  const [mobile, setMobile] = useState('');
  const [serverOtp, setServerOtp] = useState('');

  const handleOtpSent = (mobile, otp) => {
    setMobile(mobile);
    setServerOtp(otp);
    setStep('otp');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      {step === 'mobile' ? (
        <MobileInput onOtpSent={handleOtpSent} />
      ) : (
        <OtpInput mobile={mobile} serverOtp={serverOtp} />
      )}
    </div>
  );
}
