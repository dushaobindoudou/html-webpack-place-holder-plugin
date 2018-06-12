'use strict';
var fs = require('fs');
var path = require('path');
var ejs = requuire('ejs');

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

            compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('HtmlWebpackPreprocess', function (htmlPluginData, callback) {
                self.append(compilation, htmlPluginData, callback);
                // self.writeAssetToDisk(compilation, htmlPluginData.plugin.options, htmlPluginData.outputName, callback);
            });
        });
    }
};

HtmlWebpackPreprocessPlugin.prototype.append = function(compilation, htmlPluginData, callback){
    const options = htmlPluginData.plugin.options;
    if (options.notPreprocess) {
        return callback(null);
    }
    if(this.beforeProcess() === false){
        return callback(null);
    }
    if(this.content){

        var newHtml = ejs.render(this.content, {assets: htmlPluginData.assets});

        if(this.preppend){
            htmlPluginData.html = newHtml + htmlPluginData.html;
        }else{
            htmlPluginData.html += newHtml;
        }
    }
    console.log('HtmlWebpackPreprocessPlugin 附加数据成功:', htmlPluginData, newHtml);
    if(this.afterProcess() === false){
        return callback(null);
    }
    callback(null);
    // callback(null);
};

/**
 * Writes an asset to disk
 */
HtmlWebpackPreprocessPlugin.prototype.writeAssetToDisk = function (compilation, htmlWebpackPluginOptions, htmlPluginData, callback) {
    // Skip if the plugin configuration didn't set `preprocess` to true
    

    console.log('HtmlWebpackHarddiskPlugin data:', htmlPluginData);

    if(htmlPluginData.appendFile){

    }

    // Prepare the folder
    // var fullPath = path.resolve(this.outputPath || compilation.compiler.outputPath, webpackHtmlFilename);
    // var directory = path.dirname(fullPath);
    // mkdirp(directory, function (err) {
    //   if (err) {
    //     return callback(err);
    //   }
    //   // Write to disk
    //   fs.writeFile(fullPath, compilation.assets[webpackHtmlFilename].source(), function (err) {
    //     if (err) {
    //       return callback(err);
    //     }
    //     callback(null);
    //   });
    // });
  };

module.exports = HtmlWebpackPreprocessPlugin;