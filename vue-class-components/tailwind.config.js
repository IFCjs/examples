const vh = {
  10: '10vh',
  20: '20vh',
  30: '30vh',
  40: '40vh',
  50: '50vh',
  60: '60vh',
  70: '70vh',
  75: '75vh',
  80: '80vh',
  85: '85vh',
  90: '90vh'
}

const vw = {
  4: '4vw',
  10: '10vw',
  20: '20vw',
  100: '100vw'
}

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  plugins: [
    require('@tailwindcss/forms')
    // ...
  ],
  purge: ['./src/index.html', './**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
        '7': '7px',
        '8': '8px',
        '9': '9px'
      },
      boxShadow: {
        '6xl': '0 50px 100px -25px rgba(0, 0, 0, 0.25)',
        'inset-2xl': 'inset 0 5px 10px 0 rgba(0, 0, 0, 0.15)'
      },
      color: {
        gray: {
          '50': '#DBDBDB'
        }
      },
      fontFamily: {
        sans: ['Inter']
      },
      height: {
        '80': '20rem',
        '10vh': vh['10'],
        '20vh': vh['20'],
        '30vh': vh['30'],
        '40vh': vh['40'],
        '50vh': vh['50'],
        '60vh': vh['60'],
        '70vh': vh['70'],
        '80vh': vh['80']
      },
      inset: {
        '5%': '5%',
        '-16': '-4rem',
        '-10': '-2.5rem',
        '-2': '-0.5rem',
        '-4': '-1rem',
        '-8': '-2rem',
        '2': '0.5rem',
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '24': '6rem',
        '50%': '50%',
        '92': '23rem',
        '100': '25rem'
      },
      maxHeight: {
        '10vh': vh['10'],
        '20vh': vh['20'],
        '30vh': vh['30'],
        '40vh': vh['40'],
        '50vh': vh['50'],
        '60vh': vh['60'],
        '70vh': vh['70'],
        '75vh': vh['75'],
        '80vh': vh['80'],
        '85vh': vh['85'],
        '90vh': vh['90']
      },
      maxWidth: {
        '4vw': vw['4'],
        '10vw': vw['10'],
        '20vw': vw['20'],
        '80': '20rem',
        '100vw': vw['100']
      },
      minHeight: {
        '1': '0.25rem',
        '8': '2rem',
        '32': '8rem',
        '40': '10rem',
        '64': '16rem',
        '10vh': vh['10'],
        '20vh': vh['20'],
        '30vh': vh['30'],
        '50vh': vh['50']
      },
      minWidth: {
        '20': '5rem',
        '40': '10rem',
        '64': '16rem',
        '80': '20rem'
      },
      rotate: {
        '-3': '-3deg',
        '-30': '-30deg',
        '30': '30deg',
        '1080': '1080deg'
      },
      scale: {
        20: '0.2',
        30: '0.3',
        40: '0.4',
        200: '2'
      },
      spacing: {
        '-15vw': '-15vw',
        '25%': '25%'
      },
      transitionDuration: {
        '3000': '3s'
      },
      width: {
        '5%': '5%',
        '30vw': '30vw',
        '50vw': '50vw',
        '76': '19rem',
        '80': '20rem',
        '100': '25rem',
        '128': '32rem',
        '105%': '105%'
      },
      zIndex: {
        '-1': '-1',
        '200': '200',
        '300': '300',
        '1000': '1000',
        '2000': '2000',
        '3000': '3000',
        '4000': '4000',
        '5000': '5000'
      }
    }
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  }
}
