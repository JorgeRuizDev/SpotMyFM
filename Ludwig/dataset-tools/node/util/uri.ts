/**
 * Transforms an spotify url into a uri
 * @param url with format https://open.spotify.com/{playlist|album|track|...}/{spotify id}
 * @returns a string with the uri
 */
export function urlToUri(url: string) {
  //https://open.spotify.com/playlist/71WCSu111RId5Xg9IEuxuU?si=ecb80b86b0dc45f6
  const regex = /\/[A-Za-z0-9]+/g;

  const matches = url.match(regex).map((s) => s.replace("/", ""));

  return `spotify:${matches[1]}:${matches[2]}`;
}
