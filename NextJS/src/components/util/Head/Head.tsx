import NextHead from "next/head";

interface IHeadProps {
  title?: string;
  subtitle?: string;
}

export default function Head({ title = "MySpotifyFM", subtitle }: IHeadProps) {
  return (
    <>
      <NextHead>
        <title>
          {title} {subtitle == null ? "" : ` - ${subtitle}`}
        </title>
        <meta name="description" content="A Spotify Library Manager" />

        <meta
          property="og:title"
          content="MySpotifyFM - A Spotify Library Manager"
        />
        <meta
          property="og:description"
          content="Explore and Filter your Spotify Library with beautiful cards. Search and Modify and Tag your favorite albums. MySpotifyFM combines LastFM Community and Spotify APIs, resulting in a richer library management experience!"
        />
        <meta name="author" content="Jorge Ruiz Gómez" />

        <meta property="og:image" content="https://i.imgur.com/G4Rgk86.png" />
        <meta property="og:image:width" content="1008" />
        <meta property="og:image:height" content="632" />
        <meta
          name="google-site-verification"
          content="-RJWFeQ1me1m_Il5D7IREO1To0OrutTPVKz50ZnUo8Y"
        />
        <link rel="icon" href="/favicon.ico" />
      </NextHead>
    </>
  );
}
