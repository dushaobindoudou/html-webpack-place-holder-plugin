# html-webpack-place-holder-plugin
html-webpack-place-holder-plugin 把html中的占位符替换成css、js引用块

Basic Usage
-----------

引用配置文件
Require the plugin in your webpack config:

```javascript
var HtmlWebpackPlaceHolderPlugin = require('html-webpack-place-holder-plugin');
```

Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackPlaceHolderPlugin({
    content:'{% block block_head_css %}
    <% for (var css in assets.css) { %>
    <link href="<%= assets.css[css] %>" rel="stylesheet">
    <% } %>
{% endblock %}
        
{% block block_body_js %}
    <% for (var file in assets.js) { %>
    <script src="<%= assets.js[file] %>"></script>
    <% } %>
{% endblock %}'
  })
]  
```

content表示要替换的内容，替换内容之前会先使用ejs模板进行编译,默认传入的参数是`assets：{js:'', css: '', chunks:'', publicPath:'', manifest: ''}`

默认是使用插件的，如果html-webpack-plugin配置 `notUsePlaceHolder:true`，则该插件不会生效


```javascript
plugins: [
  new HtmlWebpackPlugin({
	  notUsePlaceHolder: true
  }),
  new HtmlWebpackPlaceHolderPlugin()
]  
```

在html中的placeholder格式为

```
<!-- {place-holder} -->
```

使用html注释的形式如果替换不成功，不会影响html的正常展示, 改格式默认不值配置

