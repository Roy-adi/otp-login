'use client';

import { useState } from 'react';
import { register } from 'next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup';

export default function RegisterPage() {
  const [form, setForm] = useState({
    user_type_id: 1,
    name: '',
    mobile: '',
    email: '',
    company_name: '',
    firebase_token: 'test_token',
    installation_id: 'test_id',
    login_via: 'ANDROID',
    gst_no: '',
    pan_no: '',
    location_id: 132050,
    profile_image: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = 'Mobile must be 10 digits';

    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';

    if (!form.company_name.trim()) newErrors.company_name = 'Company name is required';

    if (!form.gst_no.trim()) newErrors.gst_no = 'GST number is required';
    else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(form.gst_no))
      newErrors.gst_no = 'Invalid GST number format';

    if (!form.pan_no.trim()) newErrors.pan_no = 'PAN number is required';
    else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(form.pan_no)) newErrors.pan_no = 'Invalid PAN format';

    if (!form.profile_image)
      newErrors.profile_image = 'Profile image is required';
    else if (!['image/jpeg', 'image/png'].includes(form.profile_image.type))
      newErrors.profile_image = 'Only JPEG or PNG files allowed';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      const res = await register(formData);
      const token = res.data.result.response.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(res.data.result.response.data));
      alert('Registration successful');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <header className="bg-indigo-600 text-white py-6 shadow-md">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Seller Registration</h1>
          <p className="text-sm">Join our trusted seller network today</p>
        </div>
      </header>

      <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-indigo-700">Create Your Seller Account</h2>

        <form className="space-y-4">
          {Object.keys(form).map((key) => (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replaceAll('_', ' ')}
              </label>

              {key === 'profile_image' ? (
                <>
                  <input
                    type="file"
                    name={key}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    placeholder={`Enter ${key.replaceAll('_', ' ')}`}
                    className={`w-full border rounded p-2 text-black focus:outline-none focus:ring-2 ${
                      errors[key]
                        ? 'border-red-400 focus:ring-red-300'
                        : 'border-gray-300 focus:ring-indigo-400'
                    }`}
                  />
                  {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                </>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded w-full font-medium shadow"
          >
            Register
          </button>
        </form>

        <div className="border-t pt-4 text-sm text-gray-600">
          <h3 className="font-semibold text-indigo-700 mb-2">Why Register?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Get access to our exclusive seller dashboard</li>
            <li>Reach thousands of customers across India</li>
            <li>Manage your products and inventory easily</li>
            <li>Get paid faster with secure transactions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
