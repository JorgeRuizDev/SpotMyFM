const { emerald, white, coolGray } = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/templates/**/*.{js,ts,jsx,tsx}",
    "./src/providers/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        "'Roboto'",
        "sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
      ],
    },
    extend: {
      animation: {
        marquee: "marquee 5s linear infinite",
        marquee2: "marquee2 5s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },

      colors: {
        lightCard: {
          base: white,
          hover: coolGray[100],
        },
        darkCard: {
          base: "#424242",
          hover: "#4d4d4d",
        },

        lightGreen: {
          base: emerald[500],
          hover: emerald[600],
        },

        darkGreen: {
          base: emerald[700],
          hover: emerald[600],
        },

        darkMaterialBG: {
          base: "#212121",
        },
        lightMaterialBG: {
          base: "#e5e7eb",
        },
      },
    },
  },
  variants: {
    extend: { backgroundColor: [] },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".filter-none": {
          filter: "none",
        },
        ".filter-grayscale": {
          filter: "grayscale(100%)",
        },
        /* Chrome, Safari and Opera */
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".scrollbar::-webkit-scrollbar": {
          display: "block",
        },

        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".scrollbar": {
          "-ms-overflow-style": "block" /* IE and Edge */,
          "scrollbar-width": "block" /* Firefox */,
        },

        // Scroll Snap
        ".scroll-snap-none": {
          "scroll-snap-type": "none",
        },
        ".scroll-snap-x": {
          "scroll-snap-type": "x proximity",
        },
        ".scroll-snap-y": {
          "scroll-snap-type": "y proximity",
        },
        ".scroll-snap-x-mandatory": {
          "scroll-snap-type": "x mandatory",
        },
        ".scroll-snap-y-mandatory": {
          "scroll-snap-type": "y mandatory",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
