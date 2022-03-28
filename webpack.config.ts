/** @format */

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
const config = {
	mode: 'development',
	entry: {
		main: ['./src/app.ts', './src/scss/main.scss'],
	},
	experiments: {
		topLevelAwait: true,
	},
	output: {
		path: __dirname,
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					// 'postcss-loader',
					// 'file-loader'
					// 'css-loader'
				],
				// use: [
				//   {
				//     loader: MiniCssExtractPlugin.loader,

				//     options: {
				//       esModule: false,
				//   },
				//   },
				//   {
				//   loader: 'file-loader',
				//   options: {
				//     name: 'main.css',
				//   }
				// },
				// {
				//   loader: 'extract-loader'
				// },
				// {
				//   // Interprets CSS
				//   loader: "css-loader",
				//   options: {
				//     importLoaders: 2
				//   }
				// },
				// {
				//   loader: 'postcss-loader'
				// },
				// {
				//   loader: 'sass-loader'
				// }]
			},

			{
				test: /\.(ts|js)x?$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'main.css',
			chunkFilename: 'chunk.css',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
		// new ESLintPlugin()
	],
	devtool: 'inline-source-map',
	devServer: {
		// contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		open: true,
	},
	target: 'web',
}

export default config
