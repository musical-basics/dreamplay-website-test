/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#fafaf9",
                foreground: "#1c1917",
                primary: "#1c1917",
                secondary: "#f5f5f4",
                muted: "#f5f5f4",
                "muted-foreground": "#78716c",
                "dark-section": "#0c0a09",
                "dark-text": "#f5f5f4",
                accent: {
                    DEFAULT: "#2563eb",
                    dim: "#2563eb33",
                    foreground: "#ffffff",
                },
                brand: {
                    DEFAULT: "var(--brand)",
                    foreground: "var(--brand-foreground)",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                serif: ["Lora", "serif"],
            },
        },
    },
    plugins: [],
};
