import { NavLink } from 'react-router-dom';
import 'tw-elements';

export default function Sidenav() {
  return (
    <div className="w-60 min-h-screen shadow-lg bg-slate-700 px-1 fixed">
      <ul className="relative">
        <li className="relative">
          <NavLink
            className={(isActive) => {
              if (isActive) return 'mt-10 side-nav-link';
              else return 'side-nav-link';
            }}
            to="/"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <span className="text-base mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </span>

            <span>Home</span>
          </NavLink>
        </li>

        <li className="relative">
          <NavLink
            className={(isActive) => {
              if (isActive) return ' side-nav-link';
              else return 'side-nav-link';
            }}
            to="/boards"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <span className="text-base mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </span>

            <span>Boards</span>
          </NavLink>
        </li>

        <li className="relative">
          <NavLink
            className={(isActive) => {
              if (isActive) return ' side-nav-link';
              else return 'side-nav-link';
            }}
            to="/to-do"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <span className="text-base mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </span>

            <span>To-do</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
