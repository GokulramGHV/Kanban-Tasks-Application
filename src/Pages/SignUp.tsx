import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/apiUtils';

export default function SignUp() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleChange = (name: string, value: string) => {
    // const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await registerUser(state);
      // localStorage.setItem('token', data.token);
      // window.location.reload();
      // navigate('/');
      alert('User Registered Succesfully!');
      console.log(data);
      navigate('/login');
    } catch (error: any) {
      // setErrors(error.non_field_errors);
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form action="" className="lg:w-1/3 " onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-sm text-gray-400 mt-1">
          Enter your details to create an account
        </p>

        <div className="mt-8">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            className="input-elem mt-1 w-full"
            name="name"
            placeholder="Your username"
            required
            value={state.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="font-semibold">
            Email Address
          </label>
          <input
            type="email"
            className="input-elem mt-1 w-full"
            name="email"
            placeholder="name@company.com"
            required
            value={state.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            className="input-elem mt-1 w-full"
            name="password"
            placeholder="Your Password"
            required
            value={state.password1}
            onChange={(e) => handleChange('password1', e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            className="input-elem mt-1 w-full"
            name="password"
            placeholder="Your Confirm Password"
            required
            value={state.password2}
            onChange={(e) => handleChange('password2', e.target.value)}
          />
        </div>

        <button type="submit" className="btn w-full mt-5">
          Sign Up
        </button>

        <div className="flex text-sm gap-2 mt-3">
          <h4 className="text-gray-600">Already a member?</h4>
          <Link
            to="/login"
            className="text-indigo-500 font-semibold hover:underline hover:underline-offset-1"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
