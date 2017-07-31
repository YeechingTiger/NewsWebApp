var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require("fs");
var buildCfg = require("./utils/conf/buildCfg");


const extractLess = new ExtractTextPlugin({
    filename: "[name]_page.css",
    disable: process.env.NODE_ENV !== "production"
});


var IS_PRODUCTION = process.env.NODE_ENV == "production";
var resolve_alias = {};

var STATIC_PATH = "/build";
var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            PRODUCTION: JSON.stringify(process.env.PRODUCTION)
        },
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: false, output: {
        comments: false,  // remove all comments
    }, compress: {warnings: false}}),
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./build/lib/lib-manifest.json')  //在这里引入 manifest 文件
    }),
    extractLess
];

if (IS_PRODUCTION) {
    // plugins.push(extractLess);
    STATIC_PATH = "./";

    //产品使用react-lite 代替 react ,react-dom
    // resolve_alias = {
    //     alias: {
    //         'react': 'react-lite',
    //         'react-dom': 'react-lite'
    //     }
    // }
}


/*获取所有page*/
var pages = fs.readdirSync(buildCfg.PAGESPWD);
// 组装入口对象
var entryObj = {};
for (var v of pages) {
    if(v.toUpperCase()=="CVS"){continue};
    entryObj[v] = buildCfg.PAGESPWD + "/" + v + buildCfg.CLIENT_LAUNCHER_RELATIVE_PATH;
    //注入html插件
    plugins.push(new HtmlWebpackPlugin({
        title: v,
        libPath: "./lib/lib.js",
        bundlePath: "./" + v + "_page.js",
        inject: false,
        filename: v + '.html',
        template: 'src/htmlTpl/default_index.ejs'
    }))
}


module.exports = {
    entry: entryObj,
    output: {
        filename: '[name]_page.js',
        path: path.join(__dirname, buildCfg.BUILDPWDNAME),  //将多个参数组合成一个 path
        publicPath: STATIC_PATH,
    },

    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {presets: ["es2015", "react",'latest']},
                    }
                ]
            },
            {
                test: /\.scss$/, // Only .css files
                exclude: /node_modules/,
                use: extractLess.extract({
                    use: [
                        {
                            loader: "css-loader"
                            // query: {presets: ["es2015", "react"]},
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })

            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: '[name].[ext]'   //.[hash:8]
                        }
                    }
                ]
            }],
    },
    resolve: resolve_alias,
    devServer: {
        disableHostCheck: true
    }
};