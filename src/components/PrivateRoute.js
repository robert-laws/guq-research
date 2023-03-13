import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ user, children }) => {
  if (user) {
    return children;
  } else {
    return <Navigate to='/' />;
  }
};
