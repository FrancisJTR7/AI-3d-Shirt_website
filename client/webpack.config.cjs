const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.jsx', // Adjust the entry point if needed
  output: {
    path: path.resolve(__dirname, 'dist'), // Uses __dirname directly
    filename: 'bundle.js',
    clean: true,
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i, // Rule for images
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Adjusted to point to the root `index.html`
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: './public', // Path to your static files
    compress: true,
    port: 3000,
  },
};
