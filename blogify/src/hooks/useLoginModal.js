import { useEffect, useState } from "react";
import useAuth from "./useAuth";
const useLoginModal = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { auth } = useAuth();
  const checkAuth = () => {
    if (!auth?.user) {
      setShowLoginModal(true);
    }
  };
  useEffect(() => {
    if (auth?.user) {
      setShowLoginModal(false);
    }
  }, [auth]);
  return { checkAuth, showLoginModal, setShowLoginModal };
};

export default useLoginModal;
