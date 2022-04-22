import React from 'react';
import Navbar from './Navbar';
import Sidenav from './Sidenav';

export default function NavContainer(props: {
  children: React.ReactNode;
  // currentUser: any;
}) {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />
      <Sidenav />
      <div className="min-w-fit min-h-screen mt-14 ml-60">{props.children}</div>
    </div>
  );
}
