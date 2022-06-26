import { IncomingHttpHeaders } from "http";
import { jwtBody } from "interfaces/JWT";
import JWT from "util/JWT/JWT";

const expectedFormat = '"Bearer __SAMPLE_T0K3N_HERE__"';

export default function jwtFromHeader(
  h: IncomingHttpHeaders
): [jwtBody | null, any] {
  const auth = h.authorization;

  if (!auth || auth.length < 6) {
    return [null, "No Auth Header Provided"];
  }

  const split = auth.split(" ");

  if (split.length !== 2) {
    return [null, "The Header format does not match " + expectedFormat];
  }

  if (split[0] !== "Bearer") {
    return [null, "No Bearer in Header, expected " + expectedFormat];
  }

  // Verify the JWT Token
  const jwt = JWT.verify(split[1]);

  if (!jwt) {
    return [null, "The JWT seems to be invalid"];
  }
  return [jwt, null];
}
