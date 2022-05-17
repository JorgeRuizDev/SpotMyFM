import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useRef } from "react";
import { useLoginStore } from "store/useLogin";
import { getOauth } from "util/spotify/oauthFrontend";
import cfg from "config";
import { toast } from "react-toastify";
import cookieManager from "util/cookies/loginCookieManager";
import Head from "components/util/Head";
import useTranslation from "next-translate/useTranslation";

export default function Callback() {
  const router = useRef(useRouter());
  const {t} = useTranslation();

  const { isLogged, logIn } = useLoginStore();
  const handleLogin = useCallback(async () => {
    const [res, err] = await getOauth().getAuthToken(
      `${window.location.origin}/${cfg.api_spotify_auth}`
    );
    if (err || res == null) {
      toast.error("An error occurred while getting the auth token : " + err);
      router.current.push("/");
      return;
    }

    const canLog = await logIn(res.access_token);

    if (canLog) {
      cookieManager.saveAuthToken(res.access_token, res.expires_in);
      cookieManager.saveRefreshToken(res.refresh_token);
      cookieManager.saveJWT(res.token);
      router.current.push("/");
    } else {
      toast.error("Couldn't Log In");
      router.current.push("/");
    }
  }, [logIn, router]);

  useEffect(() => {
    if (!isLogged) {
      handleLogin();
    } else {
      router.current.push("/");
    }
  }, [isLogged, handleLogin]);

  return (
    <>
      <Head title={t('cards:redirecting')}></Head>
    </>
  );
}
