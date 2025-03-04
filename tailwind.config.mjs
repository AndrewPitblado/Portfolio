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
            width: "100%",
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        scale: "scaleAnim 300ms ease-in-out",
        typing: "typing 2s steps(30) alternate, blink 1s step-end infinite",
        float: "float 3s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
