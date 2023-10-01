import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: {
        50: "#FAFAFA",
        100: "#F4F5F5",
        200: "#E4E7E7",
        300: "#D4D8D7",
        400: "#A1AAA9",
        500: "#717A79",
        600: "#525B5A",
        700: "#3F4645",
        800: "#272A2A",
        900: "#181B1B",
        950: "#090B0B",
      },
      teal: {
        50: "#EEFAF8",
        100: "#DCF5F1",
        200: "#C0EEE8",
        300: "#9BE7DD",
        400: "#71E3D3",
        500: "#35DFC7",
        600: "#17BEA8",
        700: "#0D917F",
        800: "#066356",
        900: "#02342D",
        950: "#011815",
      },
    },
    extend: {},
  },
  plugins: [],
};
export default config;
