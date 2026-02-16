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

                // -- Brand Colors (Used in Home/Holiday Sale) --
                brand: {
                    DEFAULT: "#2563eb",
                    foreground: "#ffffff",
                },

                // -- Our Story Specific Colors (Restored) --
                accent: {
                    DEFAULT: "#2563eb", // Blue accent
                    dim: "#2563eb33",
                    foreground: "#ffffff",
                },
                "dark-section": "#0c0a09", // The dark background for "The Struggle"
                "dark-text": "#f5f5f4",
                muted: {
                    DEFAULT: "#f5f5f4",
                    foreground: "#78716c",
                },
                secondary: "#f5f5f4",

                // -- How It Works Specific Colors --
                "midnight-box": "#080a0f",
                "glass-card": "rgba(30, 41, 59, 0.4)",
                "zone-a": "#f43f5e", // Rose
                "zone-b": "#f59e0b", // Amber
                "zone-c": "#2dd4bf", // Teal
            },
            fontFamily: {
                sans: ["Manrope", "Inter", "sans-serif"],
                serif: ["var(--font-playfair)", "Lora", "Georgia", "serif"],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
