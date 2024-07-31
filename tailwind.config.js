import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"source-sans-pro": ["Source Sans Pro"],
				"kaushan-script": ["Kaushan Script", "cursive"],
			},
			colors: {
				"primary-100": "#1C1C1C",
				"primary-200": "#181818",
				"secondary-100": "#312EB5",
				"tertiary-100": "#FFFFFF",
			},
			width: {
				"radix-select-width": "var(--radix-select-trigger-width)",
			},
		},
	},
	plugins: [tailwindAnimate],
};
