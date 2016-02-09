module.exports = {
	output: {
		path:  './build',
		publicPath: '/',
		filename: '[name].js'
	},
	entry: {
		main:  './main.js'
	},
    resolve: {
        modules: ['lib', 'node_modules'], 
		alias: {
			lib1: 'lib1.js',
			lib2: 'lib2.js',
		}
    },
	module: {
		loaders: [
			{
				// export PubSub object
				test: /lib1\.js$/,
				loader: "exports?internal1"
			},
			{
				// export PubSub object
				test: /lib2\.js$/,
				loader: "exports?internal2"
			},
			{
				test: /\.js?$/,
				loader: 'babel',
				// exclude: /node_modules/,
				query: {
					presets: [
						"es2015-webpack"
					]
		      	}
	    	}
		]
	}
};
