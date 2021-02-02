const autoprefixer = require('autoprefixer');
 
module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        "last 5 versions",
        "not ie <= 7"
      ],      
    }),
  ]
};