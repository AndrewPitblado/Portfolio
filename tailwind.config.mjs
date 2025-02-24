/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        scaleAnim: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        typing: {
          "0%": {
            width: "0",
            visibility: "hidden",
          },
          "100%": {
            width: "105%",
            visibility: "visible",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
      animation: {
        scale: "scaleAnim 300ms ease-in-out",
        typing: "typing 2s steps(30) infinite alternate, blink .7s infinite",
      },
    },
  },
  plugins: [],
};
