module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  variants: {
    extend: {
      height: ['group-hover'],
    },
  },
  plugins: [],
}