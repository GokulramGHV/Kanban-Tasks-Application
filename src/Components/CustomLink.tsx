import { Link } from 'react-router-dom';
import { LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

export default function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: to !== '/boards' });

  return (
    <Link
      className={match ? 'bg-indigo-500 side-nav-link' : 'side-nav-link'}
      to={to}
      data-mdb-ripple="true"
      data-mdb-ripple-color="dark"
      {...props}
    >
      {children}
    </Link>
  );
}
