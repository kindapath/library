"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { login, logout } from "@/store/authSlice";
import { Button } from "@/components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";

interface AuthButtonProps {
  className?: string;
}

const AuthButton = ({ className }: AuthButtonProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => dispatch(isAuthenticated ? logout() : login())}
      className={className}
    >
      <FontAwesomeIcon icon={isAuthenticated ? faSignOut : faSignIn} />
    </Button>
  );
};

export default AuthButton;
