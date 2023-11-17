import { Link, useLocation } from "react-router-dom";

export const ModalLink = ({ children, to }) => {
  const location = useLocation();
  return (
    <Link to={to} state={{ background: location }}>
      {children}
    </Link>
  );
};
