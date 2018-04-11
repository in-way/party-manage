/**
 * Created by liaoyf on 2017/3/6 0006.
 */
let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

//====================配置开始============================
//网站图标路径
let favicon = 'src/favico.ico';
//页面配置：只有在需要多页面时才会有多个，一般是单页应用
let pages = [
    {
        filename: 'index.html',
        title: '首页',
        template: 'src/index/index.html',
        chunks: [
            'index'
        ]
    }//新增在线表单查询页
    ,{
        filename: 'query.html',
        title: '在线表单',
        template: './node_modules/@share/scurd/index.html',
        chunks: [
            'query'
        ]
    }//新增在线表单管理页
    ,{
        filename: 'admin/index.html',
        title: '在线表单',
        template: './node_modules/@share/scurd/admin/index.html',
        chunks: [
            'adminIndex'
        ]
    }
];
//====================配置结束============================

let pagesConfig = [];
pages.map(page => {
    pagesConfig.push(new HtmlWebpackPlugin({
        filename: page.filename,
        template: page.template,
        title: page.title,
        chunksSortMode: 'dependency',
        favicon: favicon,
        chunks: [
            'manifest',
            'polyfills',
            'vendor'
        ].concat(page.chunks)
    }))
});
module.exports = function(){
    return {
        entry: {
            'polyfills': 'babel-polyfill',
            'vendor': [
                'react',
                'react-dom',
                'react-router-dom',
                'bootstrap',
                'react-bootstrap'
            ],
            'index': './src/index/main',
            //trunck增加
            'adminIndex':'./node_modules/@share/scurd/admin/index',
            //新增query的truck
            'query':'./node_modules/@share/scurd/main',
            'mQuery': './node_modules/@share/scurd/mMain'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                "presets": [
                                    [
                                        "env",
                                        {
                                            "targets": {
                                                "browsers": [
                                                    "> 1%",
                                                    "ie >= 9"
                                                ]
                                            },
                                            "modules": false,
                                            "useBuiltIns": true,
                                            "debug": true,
                                            "loose": true
                                        }
                                    ],
                                    "react"
                                ],
                                plugins: [
                                    'transform-object-rest-spread',
                                    'transform-export-extensions',
                                    "transform-class-properties"
                                ]
                            }
                        }
                    ],
                    include: [
                        path.resolve(__dirname, '../src'),
                        path.resolve(__dirname, '../node_modules/@share/scurd')
                    ]
                },
                {
                    test: /\.(png|gif|jpg|jpeg)$/,
                    use: [
                        {
                            loader: 'file-loader?name=image/[hash:8].[ext]'
                        }
                    ]
                },
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: 'font/[name].[ext]',
                                limit: 10000,
                                minetype: 'application/font-woff'
                            }
                        }
                    ]
                },
                {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: 'font/[name].[ext]',
                                limit: 10,
                                minetype: 'application/font-woff'
                            }
                        }
                    ]
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: 'font/[name].[ext]',
                                limit: 10,
                                minetype: 'application/octet-stream'
                            }
                        }
                    ]
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'font/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'font/[name].[ext]',
                                limit: 10,
                                minetype: 'image/svg+xml'
                            }
                        }
                    ]
                },
                {
                    test: /eos3(\.min)?\.js$/,
                    use: [
                        {
                            loader: 'imports-loader?defined=>false,this=>window'
                        },
                        {
                            loader: 'exports-loader?eos'
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /Service\.js$/,
                    use: 'imports-loader?define=>false,this=>window',
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    use: 'imports-loader?define=>false,this=>window,template=art-template',
                    include: /ulynlist-ext/
                },
                {
                    test: /(ulynlist\.js$)|(ulynlist.table\.js$)|(ulynlist.pagebar\.js$)/,
                    use: 'imports-loader?define=>false,this=>window,template=art-template'
                },
                {
                    test: /template\.js$/,
                    use: [
                        {
                            loader: 'imports-loader?this=>window,define=>false'
                        },
                        {
                            loader: 'exports-loader?template=window.template'
                        }
                    ]
                },
                {
                    test: /ext\.js$/,
                    use: 'imports-loader?define=>false,this=>window,template=art-template',
                    include: /shareTab/
                },
                {
                    test: /zeus\.auth/,
                    use: [
                        {
                            loader: 'imports-loader?define=>false,this=>window'
                        }
                    ]
                }
            ]
        },
        plugins: [
            ...pagesConfig,
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                jQuery: 'jquery'
            })
        ],
        node: {
            fs: "empty"
        },
        resolve: {
            extensions: ['.ts', '.js', '.json', '.jsx']
        }
    }
};