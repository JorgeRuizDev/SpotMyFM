import { AuthTokenResponse } from "./oauth2Responses";

export interface jwtBody extends AuthTokenResponse {
  is_admin: boolean;
  is_premium: boolean;
  spotify_id: string;
  user_id: string;
}
