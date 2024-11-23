import { useState } from 'react';
import useShowToast from './useShowToast';

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
    try {
      const response = await fetch(`/api/users/profile/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
