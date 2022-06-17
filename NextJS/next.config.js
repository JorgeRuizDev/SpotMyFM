const nextTranslate = require("next-translate");
module.exports = nextTranslate({
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
  images: {
    domains: [
      "twemoji.maxcdn.com",
      "i.scdn.co",
      "lineup-images.scdn.co",
      "daily-mix.scdn.co",
      "mosaic.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "thisis-images.scdn.co",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:3001/api:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Authorization, Content-Type",
          },
          {
            key: "Vary",
            value: "origin"
          }
        ],
      },
    ];
  },
});

/**
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
});

 */
