'use client'; // Required only in `app/` folder

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { getSellerProfile } from '@/utils/api';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    // setUser(JSON.parse(userData));

    getSellerProfile(token)
      .then((res) => {
        setSeller(res.data.result.response);
      })
      .catch((err) => {
        console.error('Error fetching seller profile:', err);
      });
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      {/* Static Header */}
      <header className="bg-indigo-600 text-white py-6 shadow-md">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-sm">Empowering Trusted Sellers</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 space-y-6">
        {seller && (
          <>
            <div className="flex items-center space-x-6">
              <img
                src={seller.user?.profile_img}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome, {seller.user?.name}</h2>
                <p className="text-sm text-gray-500">Dedicated Seller Partner</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">Seller Information</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Company:</strong> {seller.user?.company_name}</p>
                <p><strong>GST Number:</strong> {seller.user?.gst_no}</p>
                <p><strong>Email:</strong> {seller.user?.email}</p>
                <p><strong>Mobile:</strong> {seller.user?.mobile}</p>
              </div>
            </div>
          </>
        )}

        {/* Static Additional Info */}
        <div className="border-t pt-6 text-sm text-gray-600">
          <h4 className="text-md font-semibold text-indigo-700 mb-2">Helpful Resources</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Track your order performance in the <span className="text-indigo-600 font-medium">Reports</span> section</li>
            <li>Update your business profile for better visibility</li>
            <li>Ensure your GST and KYC details are up-to-date</li>
            <li>Access 24/7 support from the Seller Help Center</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
