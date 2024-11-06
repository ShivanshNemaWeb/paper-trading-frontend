'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import Swal from "sweetalert2";
// import Cookies from 'js-cookie'; 
import Cookies from 'js-cookie'
import {baseUrl} from '../../constants.json'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const Login = () => {
  const router = useRouter();
  const [state, setState] = useState({
    loading: false,
    user: {
      email: "",
      password: "",
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

  // User Login
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = state.user;

    setState({ ...state, loading: true, errorMessage: "" });

    try {
      const response = await axios.post(`${baseUrl}/user/login`, {
        email,
        password
      });

      const { error, msg, token } = response.data;

      if (error) {
        setState({ ...state, loading: false, errorMessage: msg });
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: msg,
        });
      } else {
        Cookies.set('token', token, { expires: 7 }); // Save token in cookies for 7 days
        router.push('/dashboard');
      }
    } catch (err) {
      setState({ ...state, loading: false, errorMessage: 'An error occurred during login' });
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'An error occurred during login',
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
                Sign in to your account
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
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Password
                  </label>
                  <input
                     type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={user.password}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                 
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Change Password{" "}
                  <a
                    href="/reset-password"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    change
                  </a>
                </p>
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

export default Login;
