'use strict';
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var reg = /<\!--\W*{\W*place-holder\W*}\W*-->/ig;
function noon(){}

function HtmlWebpackPreprocessPlugin (options) {
    options = options || {};
    this.beforeProcess = options.beforeProcess || noon;
    this.afterProcess = options.afterProcess || noon;
    // this.filePath = options.filePath;
    this.content = options.content;
    this.preppend = options.preappend;
}

HtmlWebpackPreprocessPlugin.prototype.apply = function (compiler) {
    var self = this;
    if (compiler.hooks) {
        // webpack 4 support
        compiler.hooks.compilation.tap('HtmlWebpackPreprocess', function (compilation) {

            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('HtmlWebpackPreprocess', function (htmlPluginData, callback) {

                // console.log('htmlWebpackPluginAfterHtmlProcessing data:\n', Object.keys(compilation.assets), htmlPluginData.assets);
                self.append(compilation, htmlPluginData, callback);
                // self.writeAssetToDisk(compilation, htmlPluginData.plugin.options, htmlPluginData.outputName, callback);
            });
        });
    }
};

HtmlWebpackPreprocessPlugin.prototype.append = function(compilation, htmlPluginData, callback){
    var options = htmlPluginData.plugin.options;
    if (options.notUsePlaceHolder) {
        return callback(null);
    }
    if(this.beforeProcess() === false){
        return callback(null);
    }
    if(this.content){
        var newHtml = ejs.render(this.content, {sourceAssets:compilation.assets, assets: htmlPluginData.assets, publicPath: htmlPluginData.assets.publicPath});
        // console.log(newHtml);
        // console.log('\n\n\n HtmlWebpackPreprocessPlugin: \n\n\n',reg.test(htmlPluginData.html), htmlPluginData);
        if(reg.test(htmlPluginData.html)){
            htmlPluginData.html = htmlPluginData.html.replace(reg, newHtml);
        }else{
            if(this.preppend){
                htmlPluginData.html = newHtml + htmlPluginData.html;
            }else{
                htmlPluginData.html += newHtml;
            }
        }
        
    }
    if(this.afterProcess() === false){
        return callback(null);
    }
    callback(null);
    // callback(null);
};

module.exports = HtmlWebpackPreprocessPlugin;