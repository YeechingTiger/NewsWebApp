const path = require('path');
const webpack = require('webpack');
const prod = process.argv.indexOf('-p') !== -1;
var buildCfg = require("./utils/conf/buildCfg");

var IS_PRODUCTION = process.env.NODE_ENV == "production" ? true : false;

var entryLib, resolve = {};


if (IS_PRODUCTION) {
    entryLib = [

        'react',
        'react-dom',
        //"react-lite",
        'react-router',
        'react-router-dom',
        // "react-bootstrap",
        //"react-redux",
        // "react-router",
        //"redux",
        "isomorphic-fetch",
        "es6-promise",
        "history",
        "babel-polyfill",
        "redux-thunk",
        "react-router-redux"
    ];
    // resolve = {
    //     alias: {
    //         'react': 'react-lite',
    //         'react-dom': 'react-lite'
    //     }
    // }
} else {
    entryLib = [
        'react',
        'react-dom',
        //"react-lite",
        'react-router',
        'react-router-dom',
        // "react-bootstrap",
        //"react-redux",
        // "react-router",
        //"redux",
        "isomorphic-fetch",
        "es6-promise",
        "babel-polyfill",
        "redux-thunk",
        "react-router-redux"
    ]
}


console.log(entryLib);
module.exports = {
    entry: {
        lib: entryLib
    },
    output: {
        path: path.join(__dirname, buildCfg.BUILDPWDNAME),
        filename: './lib/[name].js',
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: '[name]'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false,  // remove all comments
            },
            compress: {warnings: false},
            //mangle: {
            //    except: ['$super', '$', 'exports', 'require']
            //}
        }),
        new webpack.DllPlugin({
            /**
             * path
             * 定义 manifest 文件生成的位置
             * [name]的部分由entry的名字替换
             */
            path: path.join(__dirname, buildCfg.BUILDPWDNAME, './lib/[name]-manifest.json'),
            /**
             * name
             * dll bundle 输出到那个全局变量上
             * 和 output.library 一样即可。
             */
            name: '[name]',
            context: __dirname
        })
    ],
    // resolve

};