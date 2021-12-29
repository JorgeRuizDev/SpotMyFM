import { ReactNode, useEffect, useState } from "react";
import { useLoginStore } from "store/useLogin";

import Styled from "./ProtectedRoute.styles";
import { toast } from "react-toastify";
import { cacheStatusType, useLibraryCache } from "hooks/cache/useLibraryCache";
import Buttons from "styles/Buttons";
import router from "next/router";
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
  const { cacheStatus, cacheTrackLibrary } = useLibraryCache();

  // REDIRECTS:
  useEffect(() => {
    if (onlyLogged && isLogged === false) {
      toast.info("You must be logged to do this action");
      router.push("/");
    }
  }, [isLogged, onlyLogged]);

  useEffect(() => {
    if (onlyAdmin && isAdmin === false) {
      toast.info("You don't have enough privileges to do this action");
      router.push("/");
    }
  },[isAdmin, onlyAdmin]);


  // Messages
  if (onlyLogged) {
    if (isLogged === undefined) {
      return <></>;
    } else if (!isLogged) {
      return <></>;
    }
  }

  if (onlyCached) {
    if (cacheStatus === cacheStatusType.CACHING) {
      return (
        <Styled.FullPageCenter>
          <Styled.Card>
            <h3>The Library Is Being Cached</h3>
            <p>Please Wait</p>
          </Styled.Card>
        </Styled.FullPageCenter>
      );
    } else if (cacheStatus !== cacheStatusType.CACHED) {
      return (
        <>
          <Styled.FullPageCenter>
            <Styled.Card>
              <h3>Forbidden Action</h3>
              <h5>This page requires your library to be cached</h5>
              <Buttons.PrimaryGreenButton onClick={cacheTrackLibrary}>
                Cache My Library!
              </Buttons.PrimaryGreenButton>
            </Styled.Card>
          </Styled.FullPageCenter>
        </>
      );
    }
  }



  if (onlyAdmin) {
    if (isAdmin == false) {
      router.push("/");
      return <></>;
    }
  }

  return <>{children}</>;
}

export default ProtectedRoute;
