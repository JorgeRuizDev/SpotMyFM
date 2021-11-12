import { Router } from "next/dist/client/router";
import { ReactNode, useState } from "react";
import { useLoginStore } from "store/useLogin";
import router from "next/router";
import Styled from "./ProtectedRoute.styles";
import { toast } from "react-toastify";
interface IProtectedRouteProps {
  children?: ReactNode | ReactNode[];
  onlyLogged?: boolean;
  onlyAdmin?: boolean;
  onlyCached?: boolean;
}

function ProtectedRoute({
  onlyAdmin = false,
  onlyCached = false,
  onlyLogged = false,
  children,
}: IProtectedRouteProps) {
  const { isLogged } = useLoginStore();
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  if (onlyLogged && !isLogged) {
    toast.info("You must be logged to do this action");
    router.push("/");
    return <></>;
  }

  if (onlyAdmin) {
    if (isAdmin == false) {
      toast.info("You don't have enough privileges to do this action");
      router.push("/");
      return <></>;
    }
  }

  return <>{children}</>;
}

export default ProtectedRoute;
