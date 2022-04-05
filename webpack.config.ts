/** @format */
import AssetsPlugin from 'assets-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import {LegacyOptions} from 'sass/types/legacy/options'
import {
	Configuration,
	ProvidePlugin,
} from 'webpack'
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'
import {WebpackManifestPlugin} from 'webpack-manifest-plugin'

const htmlWebpackPluginOptions: HtmlWebpackPlugin.Options =
	{
		template: 'index.html',
		filename: 'index.html',
	}
const legacyOptions: LegacyOptions<'async'> = {
	indentWidth: 4,
	data: '',
	sourceMap: true,
}
const miniCssExtractPluginOptions: MiniCssExtractPlugin.PluginOptions =
	{
		filename: 'main.css',
		chunkFilename: 'chunk.css',
	}
const definitions: Record<
	string,
	string | string[]
> = {
	$: 'jquery',
	jQuery: 'jquery',
	'window.jQuery': 'jquery',
}
const webPackManifestPlugin =
	new WebpackManifestPlugin({
		writeToFileEmit: true,
		chunk: true,
		isInitial: true,
		isAsset: true,
		isModuleAsset: true,
	})
const htmlWebPackPlugin: HtmlWebpackPlugin =
	new HtmlWebpackPlugin({
		...htmlWebpackPluginOptions,
	})
const miniCssExtractPlugin =
	new MiniCssExtractPlugin({
		...miniCssExtractPluginOptions,
	})
const webpackProvidePlugin = new ProvidePlugin({
	...definitions,
})
const assetsPluginInstance = new AssetsPlugin({
	filename: 'assets.json',
	prettyPrint: true,
})
const plugins: Array<
	| MiniCssExtractPlugin
	| HtmlWebpackPlugin
	| ProvidePlugin
	| WebpackManifestPlugin
	| AssetsPlugin
> = [
	htmlWebPackPlugin,
	miniCssExtractPlugin,
	webpackProvidePlugin,
	assetsPluginInstance,
	webPackManifestPlugin,
	// new ESLintPlugin()
]
type SassOptions =
	| import('sass').LegacyOptions<'async'>
	| ((
			content: string | Buffer,
			loaderContext: any,
			meta: any,
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  ) => import('sass').LegacyOptions<'async'>)
const sassOptions: SassOptions = (
	content: string | Buffer,
	loaderContext: any,
	meta: any,
) => {
	console.log(loaderContext)
	console.log(meta)
	return legacyOptions
}
const config: Configuration &
	DevServerConfiguration = {
	mode: 'development',
	entry: {
		main: ['./src/app.ts', './src/scss/main.scss'],
	},
	experiments: {
		topLevelAwait: true,
	},
	output: {
		// path: __dirname,
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: '/',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(sass|scss|css)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
						},
					},
					// {
					// 	loader: 'style-loader',
					// 	options: {injectType: 'linkTag'},
					// },
					{
						loader: 'css-loader',
						options: {
							url: true,
							import: true,
							sourceMap: true,
							importLoaders: 1,
							// modules: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							// Prefer `dart-sass`
							implementation: require('sass'),
							sassOptions: sassOptions,
						},
					},
					// 'postcss-loader',
					// 'file-loader'
				],
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
	plugins: plugins,
	devtool: 'inline-source-map',
	devServer: {
		// contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		open: true,
		bonjour: true,
		compress: true,
		magicHtml: true,
		client: {
			logging: 'info',
			overlay: true,
			progress: true,
		},
	},

	context: __dirname,
	target: 'web',
}

export default config
