import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form action="" className="lg:w-1/3 ">
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
            placeholder="Your name"
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
          />
        </div>

        {/* <div className="mt-4">
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
        </div> */}
        
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
