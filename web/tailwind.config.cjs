const green = {
	50: '#c3e9c8',
	100: '#b0ffb0',
	200: '#7fff7f',
	300: '#4dff4d',
	400: '#20ff1d',
	500: '#0be606',
	600: '#00b300',
	700: '#008000',
	800: '#004d00',
	900: '#001b00'
};

const blue = {
	50: '#dcf6ff',
	100: '#aedfff',
	200: '#7ec8ff',
	300: '#4db2ff',
	400: '#219cfe',
	500: '#0d82e5',
	600: '#0065b3',
	700: '#004881',
	800: '#002b50',
	900: '#000f20'
};

module.exports = {
	purge: ['./src/**/*.svelte'],
	mode: 'jit',
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				blue,
				green,
				primary: green,
				secondary: blue
			}
		},
		fontFamily: {
			sans: [
				'"Roboto"',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"'
			],
			mono: [
				'Consolas',
				'"Andale Mono WT"',
				'"Andale Mono"',
				'"Lucida Console"',
				'"Lucida Sans Typewriter"',
				'"DejaVu Sans Mono"',
				'"Bitstream Vera Sans Mono"',
				'"Liberation Mono"',
				'"Nimbus Mono L"',
				'Monaco',
				'"Courier New"',
				'Courier',
				'monospace'
			]
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
