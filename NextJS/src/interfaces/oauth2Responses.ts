export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope?: string;
}

export interface AuthTokenJWTResponse extends AuthTokenResponse {
  token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
}

export interface RefreshTokenJWTResponse extends RefreshTokenResponse {
  token: string;
}
