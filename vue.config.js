const path = require('path');

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      alias: {
        '@web': path.join(__dirname, 'src'),
      },
      extensions: ['.js', '.vue', '.json', '.ts'],
    },
  },
};
