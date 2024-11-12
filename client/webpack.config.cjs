import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url'; // Ensure this line is present

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/main.jsx', // Adjust the entry point if needed
  output: {
    path: path.resolve(__dirname, 'dist'), // Ensure only one `path.resolve` here
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
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i, // Add this rule for images
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
