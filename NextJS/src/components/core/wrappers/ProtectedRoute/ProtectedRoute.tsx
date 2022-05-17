import { ReactNode, useEffect, useState } from "react";
import { useLoginStore } from "store/useLogin";

import Styled from "./ProtectedRoute.styles";
import { toast } from "react-toastify";
import { cacheStatusType, useLibraryCache } from "hooks/cache/useLibraryCache";
import Buttons from "styles/Buttons";
import router from "next/router";
import useTranslation from "next-translate/useTranslation";
interface IProtectedRouteProps {
  children?: ReactNode | ReactNode[];
  onlyLogged?: boolean;
  onlyAdmin?: boolean;
  onlyCached?: boolean;
}

/**
 * This component wrapper restricts the protects to a page if the only* prop is active
 * @param param0
 * @returns
 */
function ProtectedRoute({
  onlyAdmin = false,
  onlyCached = false,
  onlyLogged = false,
  children,
}: IProtectedRouteProps) {
  const { isLogged } = useLoginStore();
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
  const { cacheStatus, cacheTrackLibrary } = useLibraryCache();
  const {t} = useTranslation();
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
  }, [isAdmin, onlyAdmin]);

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
            <h3>{t('cards:the_library_is_being_cached')}</h3>
            <p>{t('cards:please_wait')}</p>
          </Styled.Card>
        </Styled.FullPageCenter>
      );
    } else if (
      cacheStatus !== cacheStatusType.CACHED &&
      cacheStatus !== cacheStatusType.OUTDATED
    ) {
      return (
        <>
          <Styled.FullPageCenter>
            <Styled.Card>
              <h3>{t('cards:forbidden_action')}</h3>
              <h5>{t('cards:this_page_requires_your_library_to_be_cached')}</h5>
              <Buttons.PrimaryGreenButton onClick={cacheTrackLibrary}>
                {t('cards:cache_my_library')}
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
