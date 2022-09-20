module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			height: {
				108: "28rem",
				128: "32rem",
			},
			colors: {
				"neutral-1000": "#171717",
				primary: "#FF7979",
				secondary: "#6010C6",
				"secondary-transparent": "rgba(96, 16, 198, 0)",
				"electric-blue": "#0094FF",
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			"dark",
			"black",
			"dracula",
			{
				mytheme: {
					primary: "#FF7979",
					secondary: "#6010C6",
					accent: "#37cdbe",
					neutral: "#3d4451",
					"base-100": "#ffffff",
				},
			},
			{
				blues: {
					primary: "#0094FF",
					secondary: "#f6d860",
					accent: "#37cdbe",
					neutral: "#3d4451",
					"base-100": "#ffffff",
				},
			},
		],
	},
};
