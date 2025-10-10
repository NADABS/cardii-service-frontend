/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        screens: {
            xs: {max: "375px"},
            sm: { min: "376px", max: "425px" },
            md: { min: "641px", max: "768px" },
            lg: { min: "769px", max: "1024px" },
            xl: { min: "1025px"}
        },
    },
    plugins: [],
};
