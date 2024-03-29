
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      blur: {
        xs: '2px',
      } ,
      colors : {
        gray:{
          900 : "#3b82f6"
        }
      }
      
    },
  },
  plugins: [],
});

