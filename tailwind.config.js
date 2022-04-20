module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin'),
],
}
