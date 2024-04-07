/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0c2c54', 
        text:'#9fa0a1',
      },
      screens:{
          'tablet':'640px',
           'laptop':'1080px',
           'desktop':'1280px',
           'phone':'250px'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

