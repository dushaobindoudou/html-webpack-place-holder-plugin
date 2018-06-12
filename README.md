# html-webpack-place-holder-plugin
html-webpack-place-holder-plugin

Basic Usage
-----------

Require the plugin in your webpack config:

```javascript
var HtmlWebpackPlaceHolderPlugin = require('html-webpack-place-holder-plugin');
```

Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackPlaceHolderPlugin()
]  
```
The above configuration will actually do nothing due to the configuration defaults.

As soon as you now set `alwaysWriteToDisk` to `true` the generated output of the HtmlWebpackPlugin will
always be written to disk. This is very useful if you want to pick up the output with another middleware.
```javascript
plugins: [
  new HtmlWebpackPlugin({
	usePlaceHolder: true
  }),
  new HtmlWebpackPlaceHolderPlugin()
]  
```

Even if you generate multiple files make sure that you add the HtmlWebpackHarddiskPlugin **only once**:

```javascript
plugins: [
  new HtmlWebpackPlugin({
		usePlaceHolder: true
	}),
  new HtmlWebpackPlaceHolderPlugin()
]  
```
