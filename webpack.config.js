const path = require('path');
const distPath = path.join(__dirname, "dist");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		index: `${distPath}/src/index.ts`
	},
	devServer: {
		contentBase: [path.join(__dirname)],
		compress: true,
		open: true,
		port: 9000
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					}, {
						loader: "css-loader",
						options: { sourceMap: true }
					},{
						loader: "postcss-loader",
						options: {
							sourceMap: true
						}
					},{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
	},
	output: {
		path: path.join(__dirname, "build"),
		publicPath: "/",
		filename: 'src/[name].js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `css/style.css`
		}),
		new HtmlWebpackPlugin({
			inject: true,
			filename: 'index.html',
			template: `${distPath}/index.html`,
			chunks: ['index'],
			minify: false

		})
	]
};