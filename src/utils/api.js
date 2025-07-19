// utils/api.js
import axios from 'axios';

const BASE_URL = 'https://d32neyt9p9wyaf.cloudfront.net/api/v3';

export const sendOtp = (mobile) =>
  axios.post(`${BASE_URL}/otp-send`, { mobile });

export const login = (mobile) =>
  axios.post(`${BASE_URL}/login`, { mobile });

export const register = (data) =>
  axios.post(`${BASE_URL}/register`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });


  export const getSellerProfile = (token) =>
  axios.get('https://d32neyt9p9wyaf.cloudfront.net/api/v3/post-details?user_id=1', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

