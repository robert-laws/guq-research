import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import AuthContext from '../context/auth/authContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [isSignupPending, setIsSignupPending] = useState(false);

  const { authenticatedUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const auth = getAuth();

  const signupUser = async (signupObject) => {
    const { email, password } = signupObject;

    try {
      setSignupError(null);
      setIsSignupPending(true);

      await createUserWithEmailAndPassword(auth, email, password);

      // if (credential.user) {
      //   await updateProfile(credential.user, {
      //     displayName: `${firstName} ${lastName}`,
      //   });
      // }
    } catch (err) {
      console.log(err);
      setSignupError(err.message);
      setIsSignupPending(false);
    }

    setIsSignupPending(false);
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  useEffect(() => {
    if (authenticatedUser) {
      navigate('/');
    }
  }, [authenticatedUser, navigate]);

  return { signupUser, signupError, isSignupPending };
};
