'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { baseUrl } from '../../constants.json';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const router = useRouter();
  const [state, setState] = useState({
    loading: false,
    user: {
      email: "",
      previousPassword: "",
      newPassword: "",
    },
    errorMessage: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Data Binding
  const updateInput = (event: { target: { name: any; value: any; }; }) => {
    setState({
      ...state,
      user: {
        ...state.user,
        [event.target.name]: event.target.value,
      },
    });
  };

  // Reset Password
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, previousPassword, newPassword } = state.user;

    setState({ ...state, loading: true, errorMessage: "" });

    try {
      const response = await axios.post(`http://localhost:4000/user/reset-password`, {
        email,
        previousPassword,
        newPassword
      });

      const { error, msg } = response.data;

      if (error) {
        setState({ ...state, loading: false, errorMessage: msg });
        Swal.fire({
          icon: 'error',
          title: 'Password Reset Failed',
          text: msg,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successful',
          text: msg,
        });
        router.push('/login');
      }
    } catch (err) {
      setState({ ...state, loading: false, errorMessage: 'An error occurred during password reset' });
      Swal.fire({
        icon: 'error',
        title: 'Password Reset Failed',
        text: 'An error occurred during password reset',
      });
    }
  };

  const { user, errorMessage, loading } = state;

  return (
    <div className='bg-image relative' id="home-section">
      <div className='arrowOne'></div>
      <div className='radial-banner hidden lg:block'></div>
      <section className="bg-gray dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                Reset Password
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-black"
                    placeholder="name@gmail.com"
                    onChange={updateInput}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="previousPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Previous Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="previousPassword"
                    id="previousPassword"
                    placeholder="Previous Password"
                    value={user.previousPassword}
                    onChange={updateInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-black"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute top-10 right-2 flex items-center cursor-pointer text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="relative">
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    New Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                    value={user.newPassword}
                    onChange={updateInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-black"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute top-10 right-2 flex items-center cursor-pointer text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errorMessage && (
                  <div className="text-red-500 text-sm mt-2">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? 'processing...' : 'Reset'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className='arrowSix'></div>
      <div className='arrowSeven'></div>
      <div className='arrowEight'></div>
    </div>
  );
};

export default ResetPassword;
