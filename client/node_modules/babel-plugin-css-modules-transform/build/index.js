'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// options resolvers


// utils.


exports.default = transformCssModules;

var _path = require('path');

var _options_resolvers = require('./options_resolvers');

var requireHooksOptions = _interopRequireWildcard(_options_resolvers);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaultOptions = {
    generateScopedName: '[name]__[local]___[hash:base64:5]'
};

function transformCssModules(_ref) {
    var t = _ref.types;

    function resolveModulePath(filename) {
        var dir = (0, _path.dirname)(filename);
        if ((0, _path.isAbsolute)(dir)) return dir;
        if (process.env.PWD) return (0, _path.resolve)(process.env.PWD, dir);
        return (0, _path.resolve)(dir);
    }

    /**
     *
     * @param {String} filepath     javascript file path
     * @param {String} cssFile      requireed css file path
     * @returns {Array} array of class names
     */
    function requireCssFile(filepath, cssFile) {
        var filePathOrModuleName = cssFile;

        // only resolve path to file when we have a file path
        if (!/^\w/i.test(filePathOrModuleName)) {
            var from = resolveModulePath(filepath);
            filePathOrModuleName = (0, _path.resolve)(from, filePathOrModuleName);
        }

        // css-modules-require-hooks throws if file is ignored
        try {
            return require(filePathOrModuleName);
        } catch (e) {
            return {}; // return empty object, this simulates result of ignored stylesheet file
        }
    }

    // is css modules require hook initialized?
    var initialized = false;
    // are we requiring a module for preprocessCss, processCss, etc?
    // we don't want them to be transformed using this plugin
    // because it will cause circular dependency in babel-node and babel-register process
    var inProcessingFunction = false;

    var matchExtensions = /\.css$/i;

    function matcher() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['.css'];

        var extensionsPattern = extensions.join('|').replace(/\./g, '\\\.');
        return new RegExp('(' + extensionsPattern + ')$', 'i');
    }

    function buildClassNameToScopeNameMap(tokens) {
        /* eslint-disable new-cap */
        return t.ObjectExpression(Object.keys(tokens).map(function (token) {
            return t.ObjectProperty(t.StringLiteral(token), t.StringLiteral(tokens[token]));
        }));
    }

    var cssMap = new Map();
    var thisPluginOptions = null;

    var pluginApi = {
        manipulateOptions: function manipulateOptions(options) {
            if (initialized || inProcessingFunction) {
                return options;
            }

            // find options for this plugin
            // we have to use this hack because plugin.key does not have to be 'css-modules-transform'
            // so we will identify it by comparing manipulateOptions
            thisPluginOptions = options.plugins.filter(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 1),
                    plugin = _ref3[0];

                return plugin.manipulateOptions === pluginApi.manipulateOptions;
            })[0][1];

            var currentConfig = _extends({}, defaultOptions, thisPluginOptions);
            // this is not a css-require-ook config
            delete currentConfig.extractCss;

            // match file extensions, speeds up transform by creating one
            // RegExp ahead of execution time
            matchExtensions = matcher(currentConfig.extensions);

            var pushStylesCreator = function pushStylesCreator(toWrap) {
                return function (css, filepath) {
                    var processed = void 0;

                    if (typeof toWrap === 'function') {
                        processed = toWrap(css, filepath);
                    }

                    if (typeof processed !== 'string') processed = css;

                    // set css content only if is new
                    if (!cssMap.has(filepath) || cssMap.get(filepath) !== processed) {
                        cssMap.set(filepath, processed);
                    }

                    return processed;
                };
            };

            // resolve options
            Object.keys(requireHooksOptions).forEach(function (key) {
                // skip undefined options
                if (currentConfig[key] === undefined) {
                    return;
                }

                inProcessingFunction = true;
                currentConfig[key] = requireHooksOptions[key](currentConfig[key], currentConfig);
                inProcessingFunction = false;
            });

            // wrap or define processCss function that collect generated css
            currentConfig.processCss = pushStylesCreator(currentConfig.processCss);

            require('css-modules-require-hook')(currentConfig);

            initialized = true;

            return options;
        },
        post: function post() {
            // extract css only if is this option set
            if (thisPluginOptions && thisPluginOptions.extractCss) {
                // always rewrite file :-/
                (0, _utils.extractCssFile)(process.cwd(), cssMap, thisPluginOptions.extractCss);
            }
        },

        visitor: {
            // import styles from './style.css';
            ImportDefaultSpecifier: function ImportDefaultSpecifier(path, _ref4) {
                var file = _ref4.file;
                var value = path.parentPath.node.source.value;


                if (matchExtensions.test(value)) {
                    var requiringFile = file.opts.filename;
                    var tokens = requireCssFile(requiringFile, value);

                    path.parentPath.replaceWith(t.variableDeclaration('var', [t.variableDeclarator(t.identifier(path.node.local.name), buildClassNameToScopeNameMap(tokens))]));
                }
            },


            // const styles = require('./styles.css');
            CallExpression: function CallExpression(path, _ref5) {
                var file = _ref5.file;
                var _path$node = path.node,
                    calleeName = _path$node.callee.name,
                    args = _path$node.arguments;


                if (calleeName !== 'require' || !args.length || !t.isStringLiteral(args[0])) {
                    return;
                }

                var _args = _slicedToArray(args, 1),
                    stylesheetPath = _args[0].value;

                if (matchExtensions.test(stylesheetPath)) {
                    var requiringFile = file.opts.filename;
                    var tokens = requireCssFile(requiringFile, stylesheetPath);

                    // if parent expression is not a Program, replace expression with tokens
                    // Otherwise remove require from file, we just want to get generated css for our output
                    if (!t.isExpressionStatement(path.parent)) {
                        path.replaceWith(buildClassNameToScopeNameMap(tokens));
                    } else {
                        path.remove();
                    }
                }
            }
        }
    };

    return pluginApi;
}