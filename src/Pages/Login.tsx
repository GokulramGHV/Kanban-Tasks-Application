import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/apiUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('loggedin', '1');
      navigate('/');
      window.location.reload();

      console.log(data);
    } catch (error: any) {
      setLoading(false);
      notifyError(
        'Error while trying to login... Make sure your credentials are right!'
      );
      console.log(error);
    }
  };

  const notifyError = (message: string) =>
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifySuccess = (message: string) =>
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    if (localStorage.getItem('registered')) {
      notifySuccess('User Registed Successfully!');
      localStorage.removeItem('registered');
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form action="" className="lg:w-1/3 " onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold">Log in</h1>
        <p className="text-sm text-gray-400 mt-1">
          Enter your credentials to access your account
        </p>
        {/* <div className="mt-8">
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <input
            type="text"
            className="input-elem mt-1 w-full"
            name="username"
            placeholder="Your Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div> */}

        {/* <div className="mt-4">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            className="input-elem mt-1 w-full"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div> */}

        <div className="form-floating mt-8 mb-4">
          <input
            type="text"
            name="username"
            className="form-control input-elem mt-1 w-full"
            id="floatingUsername"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
          />
          <label htmlFor="floatingUsername" className="text-gray-700">
            Username
          </label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="password"
            name="password"
            className="form-control input-elem mt-1 w-full"
            id="floatingPassword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <label htmlFor="floatingPassword" className="text-gray-700">
            Password
          </label>
        </div>

        <div className="mt-4">
          <div className="flex">
            <input
              type="checkbox"
              className="border-2 border-gray-300 rounded-md p-2  mr-2 smooth-effect hover:border-indigo-500 hover:ring-indigo-500 focus:ring-indigo-500 focus:border-indigo-500"
              name="password"
              placeholder="Your Password"
            />
            <label htmlFor="Remember me" className="text-sm text-gray-500">
              Remember me
            </label>
          </div>
        </div>

        <button type="submit" className="btn w-full mt-4">
          {loading ? (
            <div
              className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full text-white"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            'Login'
          )}
        </button>

        <div className="flex text-sm gap-2 mt-3">
          <h4 className="text-gray-600">Not a member?</h4>
          <Link
            to="/signup"
            className="text-indigo-500 font-semibold hover:underline hover:underline-offset-1"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
