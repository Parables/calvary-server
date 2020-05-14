const spacing = require("./extend-tailwindcss/spacing");

module.exports = {
  theme: {
    truncate: {
      lines: {
        2: '2',
        3: '3',
        5: '5',
        8: '8',
      }
    },
    extend: {
      screens: {
        'x-mini': { 'max': '630px' },
        'mini': { 'max': '1050px' },
        'normal': { 'min': '1051px' },
        'medium': { 'max': '1023px' },
        'large': { 'min': '1024px' },
        'extra-large': { 'min': '1280px' },
      },
      colors: {
        'primary': '#5a67d8',

      },
      zIndex: {
        '1500': 1500,
        '2000': 2000,
        '2500': 2500
      },
      maxHeight: {
        '20': '5rem',
        '24': '6rem',
        '64': '16rem',
        ...spacing
      },
      ...spacing
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-truncate-multiline')(),
  ],
}
