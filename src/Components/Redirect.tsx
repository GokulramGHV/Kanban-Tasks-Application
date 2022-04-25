import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Redirect(props: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(props.to);
  }, [props.to, navigate]);

  return <div></div>;
}
