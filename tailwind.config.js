/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        screens: {
            sm: { max: "640px" },              // phones
            md: { min: "641px", max: "1024px" }, // tablets
            lg: { min: "1025px" },             // laptops/desktops
        },
    },
    plugins: [],
};
