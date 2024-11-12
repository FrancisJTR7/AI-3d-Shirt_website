const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.jsx', // Change this to your main entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Clears the dist folder before each build
  },
  mode: 'production', // Or 'development' for local testing
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader', // This will transpile your JavaScript code
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Add this if you are using CSS files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // Use your actual HTML file path
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'), // Path to your static files
    compress: true,
    port: 3000, // Port for local development
  },
};
