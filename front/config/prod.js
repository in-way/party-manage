/**
 * Created by liaoyf on 2017/3/6 0006.
 */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const webpackMerge = require('webpack-merge');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require("webpack-chunk-hash");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const commonConfig = require('./base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CreateComponentPlugin = require("@share/scurd/config/create_componet");
const cmd = require('node-cmd');

//====================配置开始============================
//编译到哪个目录
// const distPath = path.join(__dirname, '../dist');
const distPath = path.join(__dirname, '../../src/main/webapp');
//上下文路径（结尾要无斜杠，如：'/blend'），注意：如果编译路径不在webapp目录下，需要新建一个EOS_CONTEXT_PATH
const context = '/party-manage';
//清除client端文件时不删除的文件或文件夹
const excludePaths = [
    'errors',
    'WEB-INF',
    'scurd',
    'index.jsp',
    'proxy.jsp',
    'login.jsp'
];

//====================配置结束============================

//删除client端webapp下的文件
let delFolder = (url, excludePaths = []) => {
    let files = [];

    if(fs.existsSync(url)){
        //返回文件和子目录的数组
        files = fs.readdirSync(url);
        files.forEach(function(file,index){
            let curPath = path.join(url,file);
            let cannotDel = false;
            excludePaths.forEach(item => {
                if(file === item){
                    cannotDel = true;
                    return false;
                }
            });

            if(!cannotDel){
                if(fs.statSync(curPath).isDirectory()) {
                    delFolder(curPath, []);
                    fs.rmdirSync(curPath);
                } else {
                    console.log('删除文件：', curPath);
                    fs.unlinkSync(curPath);
                }
            }
        });
    }
};

delFolder(distPath, excludePaths);

module.exports = function(env){
    return webpackMerge(commonConfig(), {
        output: {
            path: distPath,
            filename: 'js/[name].[chunkhash].js',
            chunkFilename: "[name].[chunkhash].js",
            sourceMapFilename: "./sourceMap/[name].map",
            publicPath: context ? context + '/' : './'
        },
        devtool: 'cheap-module-source-map',
        plugins: [
            new CleanWebpackPlugin([distPath], {
                root: process.cwd(),
                exclude: [
                    'WEB-INF',
                    'errors'
                ],
                verbose: true,
                dry: false
            }),
            new CreateComponentPlugin({
                                          "distPath":distPath
                                      }),
            new CopyWebpackPlugin([
                {
                    from: 'node_modules/@share/ulynlist-ext',
                    to: 'node_modules/@share/ulynlist-ext'
                },
                  {
                      from: 'src/static/lib/ueditor',
                      to: 'node_modules/ueditor'
                  }
            ]),
            /*new UglifyJsPlugin({
                uglifyOptions: {
                    ie8: false,
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    mangle: {
                        keep_fnames: true
                    },
                    compress: {
                        warnings: false,
                        drop_console: true
                    },
                }
            }),*/
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ["vendor", "polyfill", "manifest"], // vendor libs + extracted manifest
            //     minChunks: Infinity
            // }),
            // new webpack.HashedModuleIdsPlugin(),
            // new WebpackChunkHash(),
            // new ChunkManifestPlugin({
            //     filename: "chunk-manifest.json",
            //     manifestVariable: "webpackManifest",
            //     inlineManifest: true
            // }),
            // new es3ifyPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: ["vendor", "manifest"], // vendor libs + extracted manifest
                minChunks: Infinity
            }),
            new ExtractTextPlugin({
                filename: 'css/[name].[contenthash].css',
                allChunks: true
            }),
            new webpack.DefinePlugin({
                CONTEXT_PATH: JSON.stringify(context)
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader?sourceMap'
                            },
                            {
                                loader: 'resolve-url-loader'
                            },
                            {
                                loader: 'sass-loader?sourceMap'
                            }
                        ]
                    })
                }
            ]
        }
    })
};