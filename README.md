# html-webpack-proprocess
html-webpack-proprocess-plugin

Basic Usage
-----------

Require the plugin in your webpack config:

```javascript
var HtmlWebpackProprocessPlugin = require('html-webpack-preprocess-plugin');
```

Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackProprocessPlugin()
]  
```
The above configuration will actually do nothing due to the configuration defaults.

As soon as you now set `alwaysWriteToDisk` to `true` the generated output of the HtmlWebpackPlugin will
always be written to disk. This is very useful if you want to pick up the output with another middleware.
```javascript
plugins: [
  new HtmlWebpackPlugin({
	alwaysWriteToDisk: true
  }),
  new HtmlWebpackProprocessPlugin()
]  
```

Even if you generate multiple files make sure that you add the HtmlWebpackHarddiskPlugin **only once**:

```javascript
plugins: [
  new HtmlWebpackPlugin({
		alwaysWriteToDisk: true
	}),
  new HtmlWebpackPlugin({
		alwaysWriteToDisk: true,
		filename: 'demo.html'
	}),
  new HtmlWebpackPlugin({
		alwaysWriteToDisk: false,
		filename: 'test.html'
	}),
  new HtmlWebpackProprocessPlugin()
]  
```

If you need to set the output path explicitly (for example when using with webpack-dev-server middleware) then pass in the `outputPath` option:

```
new HtmlWebpackProprocessPlugin({
  outputPath: path.resolve(__dirname, 'views')
})
```