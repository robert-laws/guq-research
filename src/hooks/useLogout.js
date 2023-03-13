import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [logoutError, setLogoutError] = useState(null);
  const [isLogoutPending, setIsLogoutPending] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setLogoutError(null);

    try {
      setIsLogoutPending(true);
      await signOut(auth);

      if (!isCancelled) {
        setLogoutError(null);
        setIsLogoutPending(false);
      }

      navigate('/');
    } catch (err) {
      if (!isCancelled) {
        setLogoutError(err.message);
        setIsLogoutPending(false);
      }
    }

    setIsLogoutPending(false);
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { logout, logoutError, isLogoutPending };
};
