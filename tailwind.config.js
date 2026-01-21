/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#000000",
                foreground: "#ffffff",
                // Precise colors from your original CSS
                "midnight-box": "#080a0f",
                "glass-card": "rgba(30, 41, 59, 0.4)",
                "zone-a": "#f43f5e", // Rose
                "zone-b": "#f59e0b", // Amber
                "zone-c": "#2dd4bf", // Teal
            },
            fontFamily: {
                sans: ["Manrope", "Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
