import axios from 'axios';
import b64 from "base-64";
import env from 'env';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'query-string';
import Oauth2Backend from 'util/Oauth2/Oauth2Backend';

const auth = async(req: NextApiRequest, res: NextApiResponse<any>) => {
  const { redirectUri, responseCode} = req.body;

  const tokenURL = "https://accounts.spotify.com/api/token";

  const oauth = new Oauth2Backend(env.SPOTIFY_SECRET, env.SPOTIFY_PUBLIC)

  const [token, err] = await oauth.authUser(responseCode, tokenURL, redirectUri)

  if (err || !token){
    res.status(400).json(err)
  }else{
    res.status(200).json(token)
  }
};

export default auth
