/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './public/**/*.js',
    './src/**/*.css',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        DarkBlue: 'hsl(209, 23%, 22%)',
        BgDarkBlue: 'hsl(207, 26%, 17%)',
        TextDarkBlue: 'hsl(200, 15%, 8%)',
        LightModeInput: 'hsl(0, 0%, 52%)',
        BgLightMode: 'hsl(0, 0%, 98%)',
      },
      flex: {
        2: '1 1 50%',
      },
    },
  },
  plugins: [],
}

