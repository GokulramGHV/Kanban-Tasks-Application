module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "'Montserrat', 'sans-serif'",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin'),
],
}
